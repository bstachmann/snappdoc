# Component Documentation Templates

Each template includes short illustrative examples formatted as Markdown blockquotes (`>`); replace them with your component's actual content.

## Required vs. Optional Files

Only copy the template files that apply to a component. **Do not create empty or *"Not applicable"* placeholder files** for optional sections a component does not have, and omit non-applicable entries from the component's `README.md` and `zensical.toml`.

| Template File | Status | When to Include / Omit |
| :--- | :--- | :--- |
| `README.md` | **Required** | Overview, embedded System Context diagram, quick start (setup & usage), optional nested Components table, and links to the component's included docs. |
| `purpose.md` | **Required** | Purpose, goals, System Context diagram (single source of truth), and external constraints. |
| `functionality.md` | **Required** | Consumer-facing capabilities, use cases, domain objects, and non-functional requirements. |
| `develop.md` | **Required** | Local development setup, running locally, tests, linters, and contributor workflows. |
| `architecture.md` | **Required** | Solution strategy, components, runtime, deployment, cross-cutting concepts, risks, and architecture decisions. |
| `api.md` | **Optional** | Include if the component exposes an interface (REST, HTTP routes, CLI, or library API); omit if none. |
| `events.md` | **Optional** | Include if the component produces or consumes asynchronous events (message broker topics, webhooks, SSE); omit for synchronous-only components. |
| `ui.md` | **Optional** | Include if the component provides a user interface (web views, CLI screens); omit for headless microservices and internal libraries. |
| `db.md` | **Optional** | Include if the component owns a persistence store / database; omit for stateless components or libraries without owned tables. |
| `operate.md` | **Optional** | Include if the component is deployed and operated at runtime (configuration, access, lifecycle, monitoring, maintenance, troubleshooting, runbook index); omit for internal libraries without runtime operations. |
| `runbooks/*.md` | **Optional** | Include one file per multi-step procedure (from `runbooks/runbook.md`) for recurring maintenance, recovery, initial setup, or emergencies; index them in `operate.md`. |
| `emergency.md` | **Optional** | Include at the system root when the system runs in production with on-call, escalation, or vendor support; link it prominently from the root `README.md`. |
| `specs/*.md` | **Optional** | Include modular single-topic specifications (from `specs/topic-spec.md`) when the component has detailed testable requirements and validation traces beyond shared specs. |
| `concepts/*.md` | **Optional** | Include one file per cross-cutting concept (from `concepts/concept.md`) that needs more than a short subsection in `architecture.md`. |
| `adr/*.md` | **Optional** | Include one record per significant decision (from `adr/NNNN-decision.md`) that is costly to reverse, needed external approval, or involved evaluating alternatives. |
| `arc42.md` | **Optional** | Include only when a single-page arc42 architecture view is needed (typically top-level system documentation). |
| `glossary.md` | **Optional** | Include when the component introduces domain or technical terms worth defining; omit if none. |
| `compliance.md` | **Optional** | Include (typically at the system root) when the system must demonstrably satisfy external policies, standards, or regulations. |
| `stakeholders.md` | **Optional** | Include (typically at the system root) when readers need stakeholder contacts, outage impact, or change coordination beyond the System Context in `purpose.md`. |
| `team.md` | **Optional** | Include at the system root when several people or roles share responsibility (roles, RACI, component ownership, duty roles, way of working). |
| `legacy.md` | **Optional** | Include when decommissioned predecessor systems left archived data, backups, or knowledge that must remain accessible. |

## Authoring Guidelines

### Writing Style

- Use clear, human-readable names in narrative sections (`purpose.md`, `functionality.md`, `architecture.md`) instead of literal code identifiers.
  > **Example:** `Queries GET /api/v1/status` → `Queries the system status`
- Reserve concrete endpoints, payloads, event schemas, UI routes, database schemas, commands, and configuration keys for the applicable reference files (`api.md`, `events.md`, `ui.md`, `db.md`, `operate.md`, `develop.md`, `runbooks/*.md`, and `specs/*.md`).

### System-Level Files (`emergency.md`, `team.md`, `stakeholders.md`, `compliance.md`, `legacy.md`)

- These files usually exist **once at the system root**; nested components link to them instead of duplicating content.
- Nested components **must not** create `emergency.md` or `team.md` unless they are operated or owned independently of the system root.
- A system root or grouping `README.md` lists its nested components in the optional **Components** section. Component owners are maintained only in `team.md` (**Component Ownership**).
- Never commit credentials, and keep personal data to a minimum: prefer roles, shared on-call numbers, team channels, and functional mailboxes. Link access-controlled stores (password managers, internal wikis) for anything else.

### Runbooks (`runbooks/`)

- Create one file per procedure (from `runbooks/runbook.md`). Use runbooks for multi-step procedures that must be followed exactly; keep short symptom → fix hints in `operate.md` (**Troubleshooting**).
- Number every step, keep one action per step, and follow each with a *Verify:* line. State trigger, frequency, owner, and last-tested date, and describe rollback and escalation.
- Index every runbook in `operate.md` (**Runbooks**); list recurring ones also in `operate.md` (**Maintenance**) with their frequency. Link runbooks from `emergency.md` (emergency procedures) and from the duty-role checklists in `team.md` instead of copying steps.

### Concepts & Decision Records (`concepts/`, `adr/`)

- Keep `architecture.md` (**Concepts** and **Architecture Decisions**) as the complete index so the single-page `arc42.md` view stays complete. Each entry is a short summary; detailed concepts move to `concepts/<topic>.md` and significant decisions to `adr/NNNN-<title>.md`, linked from the summary.
- Concept pages explain *how and why* a cross-cutting solution works; testable requirements belong in `specs/`.
- Decision records are an archive: readers must not need them to understand the current system, so the outcome of each decision must also appear in the section it affects. Do not rewrite accepted records; supersede them with a new record and update the status of both.
- Describe the current state in all architecture sections; planned changes go only into `architecture.md` (**Target Architecture & Roadmap**).

### Interface & Persistence Sections (`api.md`, `events.md`, `ui.md`, `db.md`)

- `api.md`, `events.md`, `ui.md`, and `db.md` are **optional**: include only the files that correspond to interfaces or persistence stores the component actually provides or owns.
- Omit non-applicable files entirely (for example, omit `ui.md` and `events.md` for headless synchronous microservices, and omit `db.md` for stateless services or libraries) rather than creating empty or *"Not applicable"* stub pages, and exclude them from `README.md`, cross-links, and `zensical.toml`.

### Modular Specifications (`specs/`)

- Split detailed requirements, validation traces (`*Validated by:*`), and technical constraints into small, single-topic files under `specs/` (see `specs/topic-spec.md`) rather than one monolithic `spec.md`.
- Link every `*Validated by:*` test reference (and any code reference) directly to the actual test function, `describe` block, source file, or line number using a **relative repository path** (e.g., `../tests/test_<component>.py#L<line>`). Relative paths are clickable directly in the VS Code Markdown editor and on GitHub, and `scripts/zensical_repo_links.py` validates them locally and rewrites them to GitHub URLs when Zensical builds the static site.
- Structure individual requirements and constraints inside each spec file as `###` subsections (under `##` topic headings) rather than top-level bullet lists so each requirement has a readable heading, table-of-contents entry, and deep-link anchor, followed by concise prose/sub-bullets and `*Why:*` / `*Validated by:*` metadata.
- Link directly from narrative and reference sections (`functionality.md`, `architecture.md`, `api.md`, `events.md`, `ui.md`, `db.md`, `operate.md`, `develop.md`) to the relevant `specs/<topic>.md` files wherever a use case, component, concept, contract, or operational rule is described.
- In `zensical.toml`, nest each specification file beneath the documentation section it specifies so readers discover specs in context:
  - Under **Functionality** for use-case behavior, domain rules, and calculations.
  - Under **API**, **Events**, **UI**, or **Database** for concrete interface contracts, UI rules, or schema/migration constraints.
  - Under **Architecture** for cross-cutting or technical behavior such as protocol integration, logging/diagnostics, and configuration validation.

### Diagrams

- Use **C4-styled Mermaid `flowchart TB` diagrams with ELK layout** (`config: { layout: elk }`) for System Context, Component, and Deployment diagrams, and `sequenceDiagram` for runtime flows.
  - ELK routes edges around boxes instead of drawing straight lines across them (avoiding the layout limitations of Mermaid's native `C4*` diagrams).
- Always enclose this component's internal parts (and deployment nodes) in `subgraph` boundary boxes assigned the `c4Boundary` class.
- Style nodes with standard C4 classes (`c4System`, `c4Container`, `c4Component`, `c4Db`, `c4External`) and short `<small>[Role]</small>` subtitles so diagrams stay readable and consistent across Zensical, GitHub, and VS Code.
- **Share the System Context diagram from a single source:** Define it once in `purpose.md` wrapped in `<!-- --8<-- [start:<name>] -->` / `<!-- --8<-- [end:<name>] -->` snippet markers (using `system-context` as the section name), and embed it in `README.md` (Overview) via `--8<-- "services/<service>/purpose.md:system-context"`.
- **Keep labels compact with line breaks:** Keep labels short, omit box descriptions, and for any label needing multiple words (nodes, edges, and sequence messages) insert `<br/>` line breaks to avoid wide labels and overlapping text.

### Single-Page arc42 View (`arc42.md`)

- When a single-document architecture view following the 12 numbered **arc42** headings is required, copy `templates/arc42.md` (adjusting `services/<component>/` to root-relative filenames such as `purpose.md:overview` for top-level project documentation).
- Beyond the short arc42 introduction and CC BY-SA 4.0 attribution notice at the top, `arc42.md` must contain **only the numbered arc42 headings and `pymdownx.snippets` (`--8<--`) include directives** (plus the optional *Target Architecture & Roadmap* subheading under section 11)—no standalone architecture prose of its own—so all content remains maintained in a single source of truth across `purpose.md`, `functionality.md`, `architecture.md`, and `glossary.md`.
- Preserve the named `<!-- --8<-- [start:...] -->` / `<!-- --8<-- [end:...] -->` markers defined in the templates (`overview`, `goals`, `context-and-scope`, `constraints`, `use-cases`, `non-functional-requirements`, `solution-strategy`, `components`, `runtime`, `deployment`, `concepts`, `risks`, `target-architecture` (optional), `architecture-decisions`, `glossary`), and use explicit file paths on cross-section links (e.g., `architecture.md#architecture-decisions` instead of `#architecture-decisions`) so links remain valid in both the modular pages and `arc42.md`.
