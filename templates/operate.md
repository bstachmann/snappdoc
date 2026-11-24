# Operate

> **Optional file:** Omit `operate.md` (and its entries in `README.md` and `zensical.toml`) for internal libraries or packages without standalone runtime operations.

Explain how to configure, run, access, monitor, maintain, and troubleshoot this component in operation.

> **Example:** `meter-svc` runs as a stateless container alongside PostgreSQL and exposes diagnostics and log endpoints for runtime monitoring.

## Configuration & Secrets

Document runtime environment variables, configuration files, secrets, and defaults. Also list settings configured manually outside version control (e.g., repository, cloud console, or third-party portal settings) that must be recreated after a disaster.

| Setting / Secret | Required | Default | Description |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Setting / Secret | Required | Default | Description |
> | :--- | :--- | :--- | :--- |
> | `METER_URL` | Yes | — | Local HTTP base URL of the smart meter (set in `.env`). |
> | `secrets/meter_db_password.txt` | Yes | — | PostgreSQL password file (`chmod 600`) mounted into the container. |
> | `CACHE_TTL_SECONDS` | No | `60` | Freshness window for cached meter snapshots. |

## Access & Permissions

*(Optional)* List the accounts, roles, functional users, and API clients needed to operate this component, and how to obtain them. Reference credential stores instead of including secrets. Omit if operating requires no special access.

| Access | Purpose | How to Obtain |
| :--- | :--- | :--- |

> **Example:**
>
> | Access | Purpose | How to Obtain |
> | :--- | :--- | :--- |
> | SSH to production host | Restart containers, inspect logs | Request group `energy-ops` via the access portal. |
> | Service account `meter-maintenance` | Call maintenance endpoints | Credentials in password manager entry `meter-maintenance`. |

## Deployment & Lifecycle

Document how to start, stop, rebuild, upgrade, or back up this component in operation.

> **Example:**
>
> - Rebuild and restart after updates via `./scripts/start-app.py --build meter-svc` (or `podman-compose up --build -d postgres meter-svc`).
> - Database tables are reconciled idempotently on startup via `init_db()`.

## Monitoring & Diagnostics

Document health checks, metrics, logs, and expected operational states.

> **Example:**
>
> - Inspect `GET /api/v1/diagnostics` (`ok`, `unconfigured`, `degraded`) and `GET /api/v1/logs`.

## Maintenance

*(Optional)* List recurring maintenance tasks (e.g., secret rotation, dependency updates, certificate renewal) with their frequency and runbook. Omit if the component needs no recurring maintenance.

| Task | Frequency | Runbook |
| :--- | :--- | :--- |

> **Example:**
>
> | Task | Frequency | Runbook |
> | :--- | :--- | :--- |
> | Rotate database password | Every 90 days | [Rotate DB Password](runbooks/rotate-db-password.md) |
> | Update Python dependencies | Monthly | [Update Dependencies](runbooks/update-dependencies.md) |

## Troubleshooting

List common operational failure modes, symptoms, and recovery steps.

> **Example:**
>
> - **`degraded` diagnostics / HTTP `502`:** Verify the smart meter is reachable at `METER_URL` on the local LAN and check container logs via `podman logs meter-svc`.

## Runbooks

*(Optional)* Index all procedures under `runbooks/` (see `runbooks/runbook.md` template), with one line on when to use each. Omit if the component has no runbooks.

> **Example:**
>
> - [Rotate DB Password](runbooks/rotate-db-password.md) — Scheduled or emergency rotation of the PostgreSQL password.
> - [Restore Database](runbooks/restore-database.md) — Restore snapshots from the nightly backup after data loss.
