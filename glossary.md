# Glossary

<!-- --8<-- [start:glossary] -->
- **snAPPdoc (Simple Nested Application Documentation):** Modular Markdown documentation template collection applied consistently at an application's root and recursively inside every nested component.
- **arc42:** Open-source 12-section software architecture documentation template by Dr. Gernot Starke and Dr. Peter Hruschka, assembled in snAPPdoc as an optional single-page `arc42.md` view via snippet includes.
- **C4-Styled ELK Flowchart:** A Mermaid `flowchart TB` diagram configured with `layout: elk`, `c4Boundary` subgraphs, and standard C4 node classes (`c4System`, `c4Container`, `c4Component`, `c4Db`, `c4External`) to combine C4 visual semantics with clean automatic edge routing.
- **Closed Shadow DOM Interception:** The technique used by `javascripts/mermaid-config.js` to hook `window.mermaid` before Zensical initializes it, enabling custom CSS, font loading, and SVG marker scaling inside Zensical's encapsulated Shadow DOM.
- **Component Documentation Set:** The concrete collection of required and applicable optional Markdown files documenting a single application or nested component (service, frontend, or library).
- **Decision Record (ADR):** A single-decision file under `adr/` documenting context, decision, alternatives, and consequences; summarized in `architecture.md` and superseded rather than rewritten.
- **Required vs. Optional Matrix:** The rule set in [Authoring Guide](guide.md) specifying which 5 files every component must include and which optional files should be omitted whenever they do not apply.
- **Runbook:** A single-procedure file under `runbooks/` with numbered, verifiable steps, rollback, and escalation; indexed in `operate.md`.
- **Snippet Marker (`--8<--`):** A `pymdownx.snippets` HTML comment boundary (`<!-- --8<-- [start:<name>] -->` / `<!-- --8<-- [end:<name>] -->`) that marks a reusable section for single-source inclusion across pages.
- **System-Level File:** An optional file (`emergency.md`, `team.md`, `stakeholders.md`, `compliance.md`, `legacy.md`) that usually exists once at the system root and is linked rather than duplicated by nested components.
- **Topic Specification (`specs/*.md`):** A small, single-topic Markdown file defining testable requirements, edge cases, `*Why:*` rationales, and `*Validated by:*` relative links to automated tests.
- **Zensical:** Static site generator used by snAPPdoc to compile Markdown, snippet includes, and Mermaid diagrams into a searchable Material-themed documentation website.
<!-- --8<-- [end:glossary] -->
