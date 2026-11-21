# <Name> (<Micro Service|Web UI|Library|...>)

Summarize what this component does and its role in the system (max 2–3 sentences). Omit low-level details such as ports or database names; reference other modules by their technical name (e.g., `controller-svc`).

> **Example:** The Meter Service (`meter-svc`) polls real-time grid power from a local smart meter and caches 1-minute snapshots in PostgreSQL. It exposes grid consumption to `controller-svc` and `web-ui`, and diagnostics to `troubleshooting-svc`.

## System Context

Include the shared System Context diagram from `purpose.md` using a `pymdownx.snippets` reference so Overview and Purpose stay in sync from a single source:

```markdown
--8<-- "services/<component>/purpose.md:system-context"
```

> **Example:** `--8<-- "services/meter-svc/purpose.md:system-context"`

## Quick Start

Provide the minimal steps and commands to run or use this component locally.

> **Example:**
>
> ```bash
> podman-compose up --build -d postgres meter-svc
> uv run pytest -v && uv run ruff check
> ```

## Documentation

Include only the sections that apply to this component (omit optional files—and their links below—rather than creating empty or "not applicable" placeholders):

- [Purpose](purpose.md) — Purpose, goals, system context, and constraints.
- [Functionality](functionality.md) — Use cases, domain objects, and non-functional requirements.
- [API](api.md) — *(optional)* Exposed interfaces, endpoints, and payloads (omit if none).
- [Events](events.md) — *(optional)* Produced and consumed asynchronous events (omit if none).
- [UI](ui.md) — *(optional)* User interfaces, views, and controls (omit for headless services and internal libraries).
- [Database](db.md) — *(optional)* Owned database schema, migrations, and retention (omit if stateless).
- [How to](usage.md) — Usage, setup, operation, and development.
- [Architecture](architecture.md) — Solution strategy, components, runtime, deployment, concepts, risks, and decisions *(optional single-page arc42 view: [arc42](arc42.md))*.
- [Glossary](glossary.md) — *(optional)* Domain and technical terms (omit if none).

*(Optional)* Detailed specifications live as small topic files in [`specs/`](specs/) and are linked beneath their respective sections above.

> **Example:** Detailed specifications live under [`specs/`](specs/) ([Status Caching](specs/status-caching.md), [API Contracts](specs/api-contracts.md)).
