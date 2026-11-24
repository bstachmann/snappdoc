# <Name> (<Micro Service|Web UI|Library|...>)

Summarize what this component does and its role in the system (max 2–3 sentences). Omit low-level details such as ports or database names; reference other modules by their technical name (e.g., `controller-svc`).

> **Example:** The Meter Service (`meter-svc`) polls real-time grid power from a local smart meter and caches 1-minute snapshots in PostgreSQL. It exposes grid consumption to `controller-svc` and `web-ui`, and diagnostics to `troubleshooting-svc`.

*(Optional, system root only)* If the system has an [Emergency](emergency.md) page, link it in a prominent callout directly below the summary.

> **Example:** 🚨 **Emergency?** Follow [Emergency](emergency.md).

## System Context

Include the shared System Context diagram from `purpose.md` using a `pymdownx.snippets` directive (`--8<-- "services/<component>/purpose.md:system-context"`) on its own line so Overview and Purpose stay in sync from a single source.

> **Example:** `--8<-- "services/meter-svc/purpose.md:system-context"`

## Quick Start

### Setup

List the minimal prerequisites, secrets, configuration, and startup steps to get this component installed or running.

> **Example:**
>
> 1. Create `secrets/meter_db_password.txt` (`chmod 600`) and set `METER_URL` in `.env`.
> 2. Start with `podman-compose up --build -d postgres meter-svc`.

### Usage

Show how to call or use this component (minimal examples, CLI commands, or client collections).

> **Example:**
>
> ```bash
> curl -s http://localhost:8006/api/v1/status | jq
> ```

## Components

*(Optional)* For a system root or grouping directory, list each nested component that has its own `README.md`, with a one-line purpose and notes such as deployment order. Omit this section for leaf components. Owners are listed in [Team](team.md#component-ownership), not here.

| Component | Purpose | Notes |
| :--- | :--- | :--- |

> **Example:**
>
> | Component | Purpose | Notes |
> | :--- | :--- | :--- |
> | [`meter-svc`](services/meter-svc/README.md) | Caches smart-meter grid power readings. | Deploy before `controller-svc`. |
> | [`controller-svc`](services/controller-svc/README.md) | Adjusts EV charging to solar surplus. | — |

## Documentation

Include only the sections that apply to this component (omit optional files—and their links below—rather than creating empty or "not applicable" placeholders):

- [Purpose](purpose.md) — Purpose, goals, system context, and constraints.
- [Functionality](functionality.md) — Use cases, domain objects, and non-functional requirements.
- [API](api.md) — *(optional)* Exposed interfaces, endpoints, and payloads (omit if none).
- [Events](events.md) — *(optional)* Produced and consumed asynchronous events (omit if none).
- [UI](ui.md) — *(optional)* User interfaces, views, and controls (omit for headless services and internal libraries).
- [Database](db.md) — *(optional)* Owned database schema, migrations, and retention (omit if stateless).
- [Operate](operate.md) — *(optional)* Runtime configuration, access, lifecycle, monitoring, maintenance, troubleshooting, and runbooks (omit for internal libraries without runtime operations).
- [Emergency](emergency.md) — *(optional, system root)* Emergency procedures, contacts, escalation, and vendor support.
- [Develop](develop.md) — Local development setup, tests, linters, and contributor workflows.
- [Architecture](architecture.md) — Solution strategy, components, runtime, deployment, concepts, risks, and decisions *(optional single-page arc42 view: [arc42](arc42.md))*.
- [Compliance](compliance.md) — *(optional)* Applicable policies, requirement traceability, exceptions, and audit evidence.
- [Stakeholders](stakeholders.md) — *(optional)* Stakeholders and integration partners, contacts, outage impact, and change coordination.
- [Team](team.md) — *(optional, system root)* Roles, responsibilities, component ownership, duty roles, and way of working.
- [Legacy Systems](legacy.md) — *(optional)* Decommissioned predecessor systems and their archived data.
- [Glossary](glossary.md) — *(optional)* Domain and technical terms (omit if none).

*(Optional)* Detailed material lives as small single-topic files in subdirectories and is linked beneath the sections above: specifications in [`specs/`](specs/), runbooks in [`runbooks/`](runbooks/) (from [Operate](operate.md#runbooks)), concepts in [`concepts/`](concepts/) and decision records in [`adr/`](adr/) (both from [Architecture](architecture.md)).

> **Example:** Detailed specifications live under [`specs/`](specs/) ([Status Caching](specs/status-caching.md), [API Contracts](specs/api-contracts.md)).
