# Operate

snAPPdoc publishes its own documentation and template reference as a static [Zensical](https://zensical.org/) website deployed to GitHub Pages via GitHub Actions.

## Configuration & Secrets

Runtime publishing behavior is controlled through `zensical.toml`, `.github/workflows/docs.yml`, and repository GitHub Pages settings—no application secrets are required.

| Setting / Secret | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `docs_dir` (`zensical.toml`) | Yes | `"."` | Publishes documentation directly from the repository root. |
| `site_dir` (`zensical.toml`) | Yes | `"site"` | Output directory for the generated static site (gitignored). |
| `exclude_docs` (`zensical.toml`) | Yes | See file | Excludes build/tooling files while explicitly opting in `!templates/` and `!templates/**`. |
| `project.validation.invalid_links` (`zensical.toml`) | Yes | `false` | Permits illustrative placeholder links inside `templates/*.md` during strict builds. |
| `pymdownx.snippets` (`zensical.toml`) | Yes | `base_path = ["."]`, `check_paths = true` | Expands root single-source includes (`README.md`, `arc42.md`) and fails the build if any included snippet file or marker is missing. |
| GitHub Pages Source | Yes | **GitHub Actions** | Configured in GitHub repository **Settings → Pages → Build and deployment → Source**. |
| `GITHUB_TOKEN` permissions (`docs.yml`) | Yes | `contents: read`, `pages: write`, `id-token: write` | Built-in workflow permissions required to upload and deploy the Pages artifact. |

## Deployment & Lifecycle

- **Pull Request Validation:** Pull requests targeting `main` that modify Markdown docs, `templates/**`, `stylesheets/**`, `javascripts/**`, `zensical.toml`, or `.github/workflows/docs.yml` run `zensical build --clean --strict` without deploying.
- **Automatic Production Deployment:** Pushes to `main` touching the same paths build the static site, upload `site/` via `actions/upload-pages-artifact@v3`, and publish it via `actions/deploy-pages@v4`.
- **Manual Redeploy:** Trigger `.github/workflows/docs.yml` via `workflow_dispatch` in the GitHub Actions UI to rebuild and redeploy without a new commit.
- **Concurrency:** The workflow serializes deployments under the `pages` concurrency group (`cancel-in-progress: false`) so active deployments complete cleanly.

## Monitoring & Diagnostics

- **CI Build Status:** Inspect the **Deploy Documentation to GitHub Pages** workflow runs in GitHub Actions to verify strict builds and deployment URLs.
- **Client-Side Mermaid Patch Verification:** Open browser DevTools on any diagram page and verify `window.mermaid && window.mermaid.__snappdocPatched === true` to confirm `javascripts/mermaid-config.js` intercepted Zensical's Mermaid instance before rendering.

## Troubleshooting

- **`templates/` pages missing from built site:** Zensical ignores a top-level `templates/` directory by default. Ensure both `!templates/` and `!templates/**` remain at the end of `exclude_docs` in `zensical.toml`.
- **Strict build fails on placeholder links in `templates/`:** Keep `invalid_links = false` under `[project.validation]` in `zensical.toml` whenever `templates/` is published alongside live docs.
- **Strict build fails on missing snippet (`SnippetMissingError`):** With `check_paths = true`, verify that every bare `--8<-- "<file>:<name>"` line points to an existing file and section marker, and keep illustrative template directives inside inline backticks rather than bare lines.
- **Mermaid labels clipped or arrows faint:** Confirm `stylesheets/extra.css` and `javascripts/mermaid-config.js` are listed in `extra_css` / `extra_javascript` and loaded cleanly in the browser Network tab.
- **GitHub Pages deploy job fails with permission or environment error:** Verify **Settings → Pages → Source** is set to **GitHub Actions** and the `github-pages` environment permits deployments from `main`.
