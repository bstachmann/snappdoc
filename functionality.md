# Functionality

snAPPdoc provides copy-ready Markdown templates, authoring conventions, and Zensical rendering enhancements for documenting software applications and their nested components. See the [Authoring Guide](guide.md) for the complete required-vs-optional matrix, [Operate](operate.md) for publishing configuration, and [Develop](develop.md) for local preview and validation.

## Use Cases

<!-- --8<-- [start:use-cases] -->
- **Bootstrap System & Component Documentation:** An author copies the required templates (and only the optional templates that apply) into a repository root and each nested component folder, replacing blockquote examples with real content.
- **Maintain Single-Source Diagrams & Architecture Views:** An author defines the System Context diagram once in `purpose.md` and narrative sections across `purpose.md`, `functionality.md`, `architecture.md`, and `glossary.md`, reusing them automatically in `README.md` and an optional single-page [arc42](arc42.md) view via snippet markers.
- **Author Modular Specifications:** An author splits testable requirements, rationales, and test validation traces into small single-topic files under `specs/` and links them from narrative and reference pages.
- **Document Operations, Governance & Team Organization:** An author records step-by-step runbooks, emergency contacts, compliance traceability, stakeholders, team responsibilities, detailed concepts, and decision records in optional files linked from the core pages.
- **Render Legible C4-Styled Mermaid Diagrams:** A reader views system context, component, deployment, and runtime diagrams rendered with ELK layout, full-width viewports, scaled arrowheads, and consistent light/dark-mode contrast on the published Zensical site.
- **Publish & Validate Documentation Continuously:** A maintainer previews documentation locally with live reload and runs strict static builds in CI to catch broken configuration before deploying to GitHub Pages.
<!-- --8<-- [end:use-cases] -->

## Domain Objects

- **Documentation Template:** A copy-ready Markdown blueprint under `templates/` containing section structure, named snippet markers, and blockquote (`> **Example:**`) illustrations.
- **Component Documentation Set:** The concrete set of required (`README.md`, `purpose.md`, `functionality.md`, `develop.md`, `architecture.md`) and applicable optional files documenting one system or nested component.
- **Topic Specification:** A focused Markdown file under `specs/` capturing testable requirements, constraints, `*Why:*` rationales, and `*Validated by:*` relative test links.
- **Runbook:** A Markdown file under `runbooks/` describing one multi-step operational procedure with verified steps, rollback, and escalation.
- **Decision Record:** A Markdown file under `adr/` capturing the context, decision, alternatives, and consequences of one significant architecture decision.
- **Snippet Marker:** A paired HTML comment directive (`<!-- --8<-- [start:<name>] -->` / `<!-- --8<-- [end:<name>] -->`) that marks a reusable section for single-source inclusion.
- **Single-Page arc42 View:** An assembled `arc42.md` document combining modular sections under the 12 standardized arc42 headings using only include directives.
- **Zensical Theme & Mermaid Layer:** Companion stylesheet (`stylesheets/extra.css`) and client script (`javascripts/mermaid-config.js`) that improve viewport width and Mermaid SVG rendering in Zensical.

## Non-Functional Requirements

<!-- --8<-- [start:non-functional-requirements] -->
- **Dual Readability:** Every documentation page must stay comprehensible both as raw Markdown (GitHub, VS Code) and as rendered HTML on the Zensical static site.
- **Build Reliability:** The documentation site must pass strict static site compilation (`zensical build --clean --strict`) with zero errors in clean Python 3.12 environments.
- **Theme Accessibility:** C4 nodes, boundaries, arrows, and labels must remain high-contrast and free of clipped text across both light (`default`) and dark (`slate`) palettes at standard and non-100% browser zoom levels.
- **Low Adoption Friction:** Adopting snAPPdoc in a new or existing repository requires only copying plain files—no CLI installation, proprietary runtime, or custom plugin pipeline.
<!-- --8<-- [end:non-functional-requirements] -->
