# Develop

snAPPdoc is a plain Markdown, CSS, and vanilla JavaScript repository built and previewed locally with Python and [Zensical](https://zensical.org/).

## Prerequisites & Local Setup

- Python 3.12+ (matching `.github/workflows/docs.yml`)
- Optional isolated virtual environment (`.venv/` is gitignored)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install "zensical>=0.1,<0.2"
```

## Running Locally

Start the live-reloading local documentation server at `http://localhost:8000`:

```bash
zensical serve
```

Edits to root Markdown files, `templates/`, `stylesheets/extra.css`, `javascripts/mermaid-config.js`, and `zensical.toml` rebuild automatically.

## Testing & Quality Checks

Run the same strict build executed by GitHub Actions:

```bash
zensical build --clean --strict
```

When changing templates, snippet markers, or Mermaid configuration, also verify:

1. **Single-source inclusion:** Confirm the built `site/index.html` embeds the System Context diagram from `purpose.md` and `site/arc42/index.html` expands all 12 arc42 sections without raw unresolved `--8<--` directives for live docs.
2. **Template pages remain readable:** Confirm `site/templates/` pages render cleanly with their illustrative examples intact.
3. **Visual diagram check:** Preview `purpose.md`, `architecture.md`, and `arc42.md` in both light and dark themes (`zensical serve`) to verify ELK routing, C4 node contrast, and unwrapped labels.

## Workflow & Conventions

- **Dogfood every convention:** snAPPdoc applies its own templates and [Authoring Guide](guide.md) to its root documentation (`README.md`, `purpose.md`, `functionality.md`, `operate.md`, `develop.md`, `architecture.md`, `arc42.md`, `glossary.md`). Update root docs whenever template conventions evolve.
- **Keep navigation, guide, and templates aligned:** When adding, renaming, or removing a template file under `templates/`, update:
  - The Required vs. Optional matrix in `guide.md`
  - The `Templates` links in `templates/README.md` and root `README.md`
  - The `nav` array in `zensical.toml`
- **Preserve snippet markers and explicit cross-links:** Keep `<!-- --8<-- [start:...] -->` / `<!-- --8<-- [end:...] -->` markers intact and use explicit file paths on cross-section links (e.g., `architecture.md#architecture-decisions`) so links work in both modular pages and `arc42.md`.
- **Keep Mermaid scripts bundler-free:** Write changes in `javascripts/mermaid-config.js` as self-contained ES5-compatible IIFE JavaScript so adopting repositories can copy a single file without a Node toolchain.
