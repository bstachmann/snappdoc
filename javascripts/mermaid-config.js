/* Enhance Mermaid diagrams across the Zensical site:
 * - Thicker, higher-contrast lines across flowcharts, sequence, and C4 diagrams
 * - Larger, clearly visible SVG arrowheads (markers)
 * - Consistent C4-style boundary and node styling compatible with light & dark mode
 * - Accurate node/label box sizing:
 *   - Raises `wrappingWidth` above Mermaid 12's narrow 120px default (which also
 *     triggers a strict `C.width === maxWidth` nowrap clipping bug at non-100% zoom/DPR)
 *   - Aligns Mermaid's layout font (flowchart, state, usecase, sequence) with
 *     Zensical's active font and preloads needed web font weights before measuring
 *   - Matches Shadow DOM `box-sizing` / `letter-spacing` to the `document.body`
 *     measurement context, adds comfortable node padding, and avoids post-measurement
 *     bold weight shifts
 *
 * Zensical renders Mermaid SVGs inside a closed Shadow DOM, so we intercept
 * `window.mermaid` before Zensical calls `initialize` / `render` and inject
 * extra `themeCSS`, font/wrapping/padding configuration, and scaled `<marker>`
 * arrowheads into the generated SVG.
 */
(function () {
  "use strict";

  var ARROW_SCALE = 1.5;
  var FLOWCHART_NODE_PADDING = 20;
  var FLOWCHART_WRAPPING_WIDTH = 400;
  var FONT_WAIT_TIMEOUT_MS = 1500;
  var PRELOAD_FONT_WEIGHTS = ["400", "500", "700"];
  var FALLBACK_FONT_FAMILY =
    '"Inter", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif';

  var EXTRA_THEME_CSS = [
    /* Match Shadow DOM layout metrics to document.body measurement context */
    "*, *::before, *::after {",
    "  box-sizing: border-box;",
    "}",
    ".label, .nodeLabel, .edgeLabel, .cluster-label {",
    "  letter-spacing: normal;",
    "}",
    "foreignObject {",
    "  overflow: visible !important;",
    "}",
    /* Thicker, clearer relationship & flowchart lines */
    ".edgePath .path, .flowchart-link, .transition, .relation, .relationshipLine {",
    "  stroke-width: 2.5px !important;",
    "}",
    ".messageLine0, .messageLine1 {",
    "  stroke-width: 2px !important;",
    "}",
    ".actor-line {",
    "  stroke-width: 1.5px !important;",
    "}",
    /* C4-styled boundary subgraphs */
    ".cluster.c4Boundary > rect {",
    "  fill: none !important;",
    "  stroke: var(--md-default-fg-color--light) !important;",
    "  stroke-width: 1.75px !important;",
    "  stroke-dasharray: 6 4 !important;",
    "}",
    ".cluster.c4Boundary > .cluster-label span,",
    ".cluster.c4Boundary > .cluster-label .nodeLabel {",
    "  font-weight: 500 !important;",
    "  color: var(--md-default-fg-color) !important;",
    "}",
    /* C4-styled node typography (ensures readable white text in both light & dark schemes;
     * keep normal font-weight so rendered glyphs match Mermaid's measured label width) */
    ".node.c4System .nodeLabel,",
    ".node.c4Container .nodeLabel,",
    ".node.c4Component .nodeLabel,",
    ".node.c4Db .nodeLabel,",
    ".node.c4External .nodeLabel {",
    "  color: #ffffff !important;",
    "}",
    ".node.c4System .nodeLabel small,",
    ".node.c4Container .nodeLabel small,",
    ".node.c4Component .nodeLabel small,",
    ".node.c4Db .nodeLabel small,",
    ".node.c4External .nodeLabel small {",
    "  opacity: 0.9;",
    "}",
    ".node.c4System rect, .node.c4System path,",
    ".node.c4Container rect, .node.c4Container path,",
    ".node.c4Component rect, .node.c4Component path,",
    ".node.c4Db rect, .node.c4Db path,",
    ".node.c4External rect, .node.c4External path {",
    "  stroke-width: 1.75px !important;",
    "}",
  ].join("\n");

  function patchMermaid(m) {
    if (!m || typeof m !== "object" || m.__snappdocPatched) {
      return m;
    }
    m.__snappdocPatched = true;

    if (typeof m.initialize === "function") {
      var origInitialize = m.initialize.bind(m);
      m.initialize = function (config) {
        var next = Object.assign({}, config || {});
        var fontFamily = resolveMermaidFontFamily();
        next.fontFamily = fontFamily;
        next.themeVariables = Object.assign({}, next.themeVariables || {}, {
          fontFamily: fontFamily,
        });
        next.flowchart = Object.assign({}, next.flowchart || {}, {
          padding: FLOWCHART_NODE_PADDING,
          wrappingWidth: FLOWCHART_WRAPPING_WIDTH,
        });
        next.state = Object.assign({}, next.state || {}, {
          wrappingWidth: FLOWCHART_WRAPPING_WIDTH,
        });
        next.usecase = Object.assign({}, next.usecase || {}, {
          wrappingWidth: FLOWCHART_WRAPPING_WIDTH,
        });
        next.sequence = Object.assign({}, next.sequence || {}, {
          actorFontFamily: fontFamily,
          noteFontFamily: fontFamily,
          messageFontFamily: fontFamily,
        });
        next.themeCSS = (next.themeCSS ? next.themeCSS + "\n" : "") + EXTRA_THEME_CSS;
        return origInitialize(next);
      };
    }

    if (typeof m.render === "function") {
      var origRender = m.render.bind(m);
      m.render = function () {
        var args = arguments;
        return waitForFonts().then(function () {
          var result = origRender.apply(m, args);
          if (result && typeof result.then === "function") {
            return result.then(function (rendered) {
              if (rendered && typeof rendered.svg === "string") {
                return Object.assign({}, rendered, {
                  svg: scaleArrowMarkers(rendered.svg),
                });
              }
              return rendered;
            });
          }
          return result;
        });
      };
    }

    return m;
  }

  function resolveMermaidFontFamily() {
    try {
      if (document.body) {
        var bodyFont = (window.getComputedStyle(document.body).fontFamily || "").trim();
        if (bodyFont) {
          return bodyFont;
        }
      }
    } catch (_err) {
      /* Fallback below */
    }
    return FALLBACK_FONT_FAMILY;
  }

  function waitForFonts() {
    if (!document.fonts) {
      return Promise.resolve();
    }
    var tasks = [];
    if (typeof document.fonts.load === "function") {
      var primaryFont = extractPrimaryFontFamily(resolveMermaidFontFamily());
      if (primaryFont) {
        PRELOAD_FONT_WEIGHTS.forEach(function (weight) {
          tasks.push(
            document.fonts.load(weight + " 16px " + primaryFont).catch(function () {})
          );
        });
      }
    }
    if (document.fonts.ready) {
      tasks.push(document.fonts.ready.catch(function () {}));
    }
    if (tasks.length === 0) {
      return Promise.resolve();
    }
    return Promise.race([
      Promise.all(tasks),
      new Promise(function (resolve) {
        setTimeout(resolve, FONT_WAIT_TIMEOUT_MS);
      }),
    ]);
  }

  function extractPrimaryFontFamily(fontFamilyList) {
    if (!fontFamilyList) {
      return "";
    }
    var first = fontFamilyList.split(",")[0].trim();
    if (!first || /^(sans-serif|serif|monospace|system-ui|-apple-system)$/i.test(first)) {
      return "";
    }
    return first;
  }

  function scaleArrowMarkers(svgString) {
    try {
      var parser = new DOMParser();
      var doc = parser.parseFromString(svgString, "image/svg+xml");
      if (doc.querySelector("parsererror")) {
        return svgString;
      }

      var markers = doc.querySelectorAll("marker");
      markers.forEach(function (marker) {
        var id = (marker.getAttribute("id") || "").toLowerCase();
        /* Do not enlarge sequence diagram autonumber circles */
        if (id.indexOf("sequencenumber") !== -1) {
          return;
        }

        /* Markers with markerUnits="strokeWidth" already scale with thicker strokes */
        var units = marker.getAttribute("markerUnits");
        if (units !== "userSpaceOnUse") {
          return;
        }

        var w = parseFloat(marker.getAttribute("markerWidth"));
        var h = parseFloat(marker.getAttribute("markerHeight"));
        if (!isFinite(w) || !isFinite(h) || w <= 0 || h <= 0) {
          return;
        }

        if (!marker.hasAttribute("viewBox")) {
          marker.setAttribute("viewBox", "0 0 " + w + " " + h);
          marker.setAttribute("overflow", "visible");
        }

        marker.setAttribute("markerWidth", (w * ARROW_SCALE).toFixed(2));
        marker.setAttribute("markerHeight", (h * ARROW_SCALE).toFixed(2));
      });

      return new XMLSerializer().serializeToString(doc.documentElement);
    } catch (_err) {
      return svgString;
    }
  }

  if (typeof window.mermaid !== "undefined" && !(window.mermaid instanceof Element)) {
    patchMermaid(window.mermaid);
    return;
  }

  var currentMermaid = window.mermaid;
  try {
    Object.defineProperty(window, "mermaid", {
      configurable: true,
      enumerable: true,
      get: function () {
        return currentMermaid;
      },
      set: function (val) {
        currentMermaid = val instanceof Element ? val : patchMermaid(val);
      },
    });
  } catch (_err) {
    /* Non-configurable fallback: no-op */
  }
})();
