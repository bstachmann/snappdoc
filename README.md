# snAPPdoc — Simple Nested Application Documentation

**snAPPdoc** (*Simple Nested Application Documentation*) is a lightweight, reusable Markdown documentation template collection for software applications, microservices, web frontends, and libraries.

It applies the same small, consistent set of documentation files at the root of an application and recursively inside every nested component (`services/<service>/`, `libs/<library>/`, etc.), keeping documentation readable directly in GitHub and VS Code while building cleanly into a searchable static site with [Zensical](https://zensical.org/).

## Key Principles

- **Nested & consistent:** Use the same predictable file structure at both the system level and every nested service, module, or library.
- **Required vs. optional files:** Copy only the files that apply to a component—never create empty or *"Not applicable"* stub pages.
- **Single source of truth:** Reuse content across `README.md`, `purpose.md`, `functionality.md`, `architecture.md`, `glossary.md`, and an optional single-page `arc42.md` view via `pymdownx.snippets` markers (`--8<--`).
- **Modular specifications (`specs/`):** Split detailed, testable requirements and `*Validated by:*` test links into small single-topic files under `specs/` instead of one monolithic spec file.
- **C4-styled Mermaid diagrams:** Use Mermaid `flowchart TB` with ELK layout (`layout: elk`), consistent C4 boundary/node classes, and light/dark-mode styling.

## Repository Contents

| Path | Description |
| :--- | :--- |
| [`guide.md`](guide.md) | Required-vs-optional matrix, writing style, diagram conventions, and arc42 rules. |
| [`templates/`](templates/README.md) | Copy-ready required and optional Markdown templates (plus `specs/topic-spec.md`). |
| `stylesheets/extra.css` | Full-width viewport layout and high-contrast Mermaid styling for Zensical. |
| `javascripts/mermaid-config.js` | Mermaid C4 styling, arrow marker scaling, and font/wrapping fixes for Zensical. |
| `zensical.toml` | Working Zensical configuration used to publish this repository's documentation site. |
| `.github/workflows/docs.yml` | GitHub Actions workflow that builds and deploys the Zensical site to GitHub Pages. |

## Templates

Start with the [Authoring Guide](guide.md) for the full required-vs-optional matrix and conventions:

- **Required**
  - [Component Overview (`README.md`)](templates/README.md) — Summary, embedded System Context diagram, quick start (setup & usage), and links.
  - [Purpose (`purpose.md`)](templates/purpose.md) — Implementation summary, goals, System Context diagram (single source of truth), and constraints.
  - [Functionality (`functionality.md`)](templates/functionality.md) — Use cases, domain objects, and non-functional requirements.
  - [Develop (`develop.md`)](templates/develop.md) — Local development setup, tests, linters, and contributor workflows.
  - [Architecture (`architecture.md`)](templates/architecture.md) — Solution strategy, components, runtime flows, deployment, concepts, risks, and ADRs.
- **Optional**
  - [API (`api.md`)](templates/api.md) — Exposed REST, HTTP, CLI, or library interfaces.
  - [Events (`events.md`)](templates/events.md) — Produced and consumed asynchronous events.
  - [UI (`ui.md`)](templates/ui.md) — User interfaces, routes, components, and interaction flows.
  - [Database (`db.md`)](templates/db.md) — Owned persistence stores, schemas, migrations, and retention.
  - [Operate (`operate.md`)](templates/operate.md) — Runtime configuration, deployment lifecycle, monitoring, and troubleshooting.
  - [Topic Specification (`specs/topic-spec.md`)](templates/specs/topic-spec.md) — Modular single-topic requirements with `*Why:*` and `*Validated by:*` traces.
  - [Single-Page arc42 (`arc42.md`)](templates/arc42.md) — Assembles modular pages into the 12 standardized [arc42](https://arc42.org/) sections without duplicating prose.
  - [Glossary (`glossary.md`)](templates/glossary.md) — Domain and technical term definitions.

## Quick Start

### Using snAPPdoc in Another Project

1. Copy the applicable files from `templates/` into your repository root and/or each component directory (for example, `services/<component>/` or `libs/<library>/`).
2. Replace the blockquote (`> **Example:**`) examples with your project's content and remove any optional files (and links) that do not apply.
3. Optionally copy `stylesheets/extra.css` and `javascripts/mermaid-config.js` into your project and reference them in your `zensical.toml` (`extra_css`, `extra_javascript`).
4. Enable `pymdownx.snippets` in your project's `zensical.toml` if you embed shared diagrams (`purpose.md:system-context`) or assemble a single-page `arc42.md` view.

### Local Preview & Build (Zensical)

```bash
pip install "zensical>=0.1,<0.2"

# Live-reloading local preview at http://localhost:8000
zensical serve

# Strict static site build into ./site
zensical build --clean --strict
```

### GitHub Pages Deployment

The included workflow (`.github/workflows/docs.yml`) validates the Zensical build on pull requests and automatically publishes `site/` to GitHub Pages on pushes to `main` (or via manual `workflow_dispatch`). In your repository settings on GitHub, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## License & Attribution

Licensed under the **MIT License** — see `LICENSE` for details.

The optional [`templates/arc42.md`](templates/arc42.md) template adapts the 12 section headings of the [arc42](https://arc42.org/) template by Dr. Gernot Starke and Dr. Peter Hruschka ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)) and retains its attribution notice.
