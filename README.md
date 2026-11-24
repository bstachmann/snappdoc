# snAPPdoc (Documentation Template Collection)

**snAPPdoc** (*Simple Nested Application Documentation*) is a lightweight, reusable Markdown documentation template collection for software applications, microservices, web frontends, and libraries. It applies the same small, consistent set of documentation files at the application root and recursively inside every nested component—and applies those exact templates to itself—while building cleanly into a searchable static site with [Zensical](https://zensical.org/).

## System Context

--8<-- "purpose.md:system-context"

## Quick Start

### Setup

1. Copy the applicable files from `templates/` into your repository root and/or each component directory (for example, `services/<component>/` or `libs/<library>/`), omitting optional files that do not apply.
2. Replace the blockquote (`> **Example:**`) examples with your project's content and remove links to omitted optional files.
3. Optionally copy `stylesheets/extra.css` and `javascripts/mermaid-config.js` into your project and reference them in `zensical.toml` (`extra_css`, `extra_javascript`).
4. Enable `pymdownx.snippets` in `zensical.toml` if you embed shared diagrams (`purpose.md:system-context`) or assemble a single-page `arc42.md` view.

### Usage

Preview or build this repository's documentation site locally with Zensical:

```bash
pip install "zensical>=0.1,<0.2"

# Live-reloading local preview at http://localhost:8000
zensical serve

# Strict static site build into ./site
zensical build --clean --strict
```

## Documentation

snAPPdoc applies its own modular documentation structure to itself (omitting non-applicable optional files `api.md`, `events.md`, `ui.md`, `db.md`, `emergency.md`, `compliance.md`, `stakeholders.md`, `team.md`, `legacy.md`, and the `specs/`, `runbooks/`, `concepts/`, and `adr/` directories):

- [Purpose](purpose.md) — Overview, goals, system context, and external constraints.
- [Functionality](functionality.md) — Use cases, domain objects, and non-functional requirements.
- [Operate](operate.md) — Zensical publishing configuration, GitHub Pages lifecycle, monitoring, and troubleshooting.
- [Develop](develop.md) — Local development setup, live preview, strict build checks, and contributor conventions.
- [Architecture](architecture.md) — Solution strategy, components, runtime, deployment, concepts, risks, and decisions *(single-page arc42 view: [arc42](arc42.md))*.
- [Glossary](glossary.md) — snAPPdoc domain and technical terms.

### Authoring Guide & Templates

Start with the [Authoring Guide](guide.md) for the full required-vs-optional matrix, writing style, diagram conventions, and arc42 rules, then copy from [`templates/`](templates/README.md):

- **Required**
  - [Component Overview (`README.md`)](templates/README.md) — Summary, embedded System Context diagram, quick start (setup & usage), and links.
  - [Purpose (`purpose.md`)](templates/purpose.md) — Implementation summary, goals, System Context diagram (single source of truth), and constraints.
  - [Functionality (`functionality.md`)](templates/functionality.md) — Use cases, domain objects, and non-functional requirements.
  - [Develop (`develop.md`)](templates/develop.md) — Local development setup, tests, linters, and contributor workflows.
  - [Architecture (`architecture.md`)](templates/architecture.md) — Solution strategy, components, runtime, deployment, concepts, risks, and ADRs.
- **Optional**
  - [API (`api.md`)](templates/api.md) — Exposed REST, HTTP, CLI, or library interfaces.
  - [Events (`events.md`)](templates/events.md) — Produced and consumed asynchronous events.
  - [UI (`ui.md`)](templates/ui.md) — User interfaces, routes, components, and interaction flows.
  - [Database (`db.md`)](templates/db.md) — Owned persistence stores, schemas, migrations, and retention.
  - [Operate (`operate.md`)](templates/operate.md) — Runtime configuration, access, deployment lifecycle, monitoring, maintenance, troubleshooting, and runbook index.
  - [Runbook (`runbooks/runbook.md`)](templates/runbooks/runbook.md) — Single multi-step procedure with roles, verified steps, rollback, and escalation.
  - [Emergency (`emergency.md`)](templates/emergency.md) — System-level emergency procedures, contacts, vendor support, and emergency access.
  - [Topic Specification (`specs/topic-spec.md`)](templates/specs/topic-spec.md) — Modular single-topic requirements with `*Why:*` and `*Validated by:*` traces.
  - [Concept (`concepts/concept.md`)](templates/concepts/concept.md) — Detailed cross-cutting concept summarized in `architecture.md`.
  - [Decision Record (`adr/NNNN-decision.md`)](templates/adr/NNNN-decision.md) — Significant architecture decision with context, alternatives, and consequences.
  - [Single-Page arc42 (`arc42.md`)](templates/arc42.md) — Assembles modular pages into the 12 standardized [arc42](https://arc42.org/) sections without duplicating prose.
  - [Glossary (`glossary.md`)](templates/glossary.md) — Domain and technical term definitions.
  - [Compliance (`compliance.md`)](templates/compliance.md) — Applicable policies, requirement traceability, exceptions, and audit evidence.
  - [Stakeholders (`stakeholders.md`)](templates/stakeholders.md) — Stakeholders and integration partners, contacts, outage impact, and change coordination.
  - [Team (`team.md`)](templates/team.md) — Roles, RACI, component ownership, duty roles, and way of working.
  - [Legacy Systems (`legacy.md`)](templates/legacy.md) — Decommissioned predecessor systems and their archived data.

## License & Attribution

Licensed under the **MIT License** — see `LICENSE` for details.

The [`arc42.md`](arc42.md) view and optional [`templates/arc42.md`](templates/arc42.md) template adapt the 12 section headings of the [arc42](https://arc42.org/) template by Dr. Gernot Starke and Dr. Peter Hruschka ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)) and retain their attribution notice.
