# Component Documentation Templates

Each template includes short illustrative examples formatted as Markdown blockquotes (`>`); replace them with your component's actual content.

## Required vs. Optional Files

Only copy the template files that apply to a component. **Do not create empty or *"Not applicable"* placeholder files** for optional sections a component does not have, and omit non-applicable entries from the component's `README.md` and `zensical.toml`.

| Template File | Status | When to Include / Omit |
| :--- | :--- | :--- |
| `README.md` | **Required** | Overview, embedded System Context diagram, quick start, and links to the component's included docs. |
| `purpose.md` | **Required** | Purpose, goals, System Context diagram (single source of truth), and external constraints. |
| `functionality.md` | **Required** | Consumer-facing capabilities, use cases, domain objects, and non-functional requirements. |
| `usage.md` | **Required** | Usage, setup, operation, and local development instructions. |
| `architecture.md` | **Required** | Solution strategy, components, runtime, deployment, cross-cutting concepts, risks, and architecture decisions. |
| `api.md` | **Optional** | Include if the component exposes an interface (REST, HTTP routes, CLI, or library API); omit if none. |
| `events.md` | **Optional** | Include if the component produces or consumes asynchronous events (message broker topics, webhooks, SSE); omit for synchronous-only components. |
| `ui.md` | **Optional** | Include if the component provides a user interface (web views, CLI screens); omit for headless microservices and internal libraries. |
| `db.md` | **Optional** | Include if the component owns a persistence store / database; omit for stateless components or libraries without owned tables. |
| `specs/*.md` | **Optional** | Include modular single-topic specifications (from `specs/topic-spec.md`) when the component has detailed testable requirements and validation traces beyond shared specs. |
| `arc42.md` | **Optional** | Include only when a single-page arc42 architecture view is needed (typically top-level system documentation). |
| `glossary.md` | **Optional** | Include when the component introduces domain or technical terms worth defining; omit if none. |

## Authoring Guidelines

### Writing Style

- Use clear, human-readable names in narrative sections (`purpose.md`, `functionality.md`, `architecture.md`) instead of literal code identifiers.
  > **Example:** `Queries GET /api/v1/status` → `Queries the system status`
- Reserve concrete endpoints, payloads, event schemas, UI routes, database schemas, commands, and configuration keys for the applicable reference files (`api.md`, `events.md`, `ui.md`, `db.md`, `usage.md`, and `specs/*.md`).

### Interface & Persistence Sections (`api.md`, `events.md`, `ui.md`, `db.md`)

- `api.md`, `events.md`, `ui.md`, and `db.md` are **optional**: include only the files that correspond to interfaces or persistence stores the component actually provides or owns.
- Omit non-applicable files entirely (for example, omit `ui.md` and `events.md` for headless synchronous microservices, and omit `db.md` for stateless services or libraries) rather than creating empty or *"Not applicable"* stub pages, and exclude them from `README.md`, cross-links, and `zensical.toml`.

### Modular Specifications (`specs/`)

- Split detailed requirements, validation traces (`*Validated by:*`), and technical constraints into small, single-topic files under `specs/` (see `specs/topic-spec.md`) rather than one monolithic `spec.md`.
- Link every `*Validated by:*` test reference (and any code reference) directly to the actual test function, `describe` block, source file, or line number using a **relative repository path** (e.g., `../tests/test_<component>.py#L<line>`). Relative paths are clickable directly in the VS Code Markdown editor and on GitHub, and `scripts/zensical_repo_links.py` validates them locally and rewrites them to GitHub URLs when Zensical builds the static site.
- Structure individual requirements and constraints inside each spec file as `###` subsections (under `##` topic headings) rather than top-level bullet lists so each requirement has a readable heading, table-of-contents entry, and deep-link anchor, followed by concise prose/sub-bullets and `*Why:*` / `*Validated by:*` metadata.
- Link directly from narrative and reference sections (`functionality.md`, `architecture.md`, `api.md`, `events.md`, `ui.md`, `db.md`, `usage.md`) to the relevant `specs/<topic>.md` files wherever a use case, component, concept, contract, or operational rule is described.
- In `zensical.toml`, nest each specification file beneath the documentation section it specifies so readers discover specs in context:
  - Under **Functionality** for use-case behavior, domain rules, and calculations.
  - Under **API**, **Events**, **UI**, or **Database** for concrete interface contracts, UI rules, or schema/migration constraints.
  - Under **Architecture** for cross-cutting or technical behavior such as protocol integration, logging/diagnostics, and configuration validation.

### Diagrams

- Use **C4-styled Mermaid `flowchart TB` diagrams with ELK layout** (`config: { layout: elk }`) for System Context, Component, and Deployment diagrams, and `sequenceDiagram` for runtime flows.
  - ELK routes edges around boxes instead of drawing straight lines across them (avoiding the layout limitations of Mermaid's native `C4*` diagrams).
- Always enclose this component's internal parts (and deployment nodes) in `subgraph` boundary boxes assigned the `c4Boundary` class.
- Style nodes with standard C4 classes (`c4System`, `c4Container`, `c4Component`, `c4Db`, `c4External`) and short `<small>[Role]</small>` subtitles so diagrams stay readable and consistent across Zensical, GitHub, and VS Code.
- **Share the System Context diagram from a single source:** Define it once in `purpose.md` wrapped in `<!-- --8<-- [start:system-context] -->` / `<!-- --8<-- [end:system-context] -->` snippet markers, and embed it in `README.md` (Overview) via `--8<-- "services/<service>/purpose.md:system-context"`.
- **Keep labels compact with line breaks:** Keep labels short, omit box descriptions, and for any label needing multiple words (nodes, edges, and sequence messages) insert `<br/>` line breaks to avoid wide labels and overlapping text.

### Single-Page arc42 View (`arc42.md`)

- When a single-document architecture view following the 12 numbered **arc42** headings is required, copy `templates/arc42.md` (adjusting `services/<component>/` to root-relative filenames such as `purpose.md:overview` for top-level project documentation).
- Beyond the short arc42 introduction and CC BY-SA 4.0 attribution notice at the top, `arc42.md` must contain **only the numbered arc42 headings and `pymdownx.snippets` (`--8<--`) include directives**—no standalone architecture prose of its own—so all content remains maintained in a single source of truth across `purpose.md`, `functionality.md`, `architecture.md`, and `glossary.md`.
- Preserve the named `<!-- --8<-- [start:...] -->` / `<!-- --8<-- [end:...] -->` markers defined in the templates (`overview`, `goals`, `context-and-scope`, `constraints`, `use-cases`, `non-functional-requirements`, `solution-strategy`, `components`, `runtime`, `deployment`, `concepts`, `risks`, `architecture-decisions`, `glossary`), and use explicit file paths on cross-section links (e.g., `architecture.md#architecture-decisions` instead of `#architecture-decisions`) so links remain valid in both the modular pages and `arc42.md`.
