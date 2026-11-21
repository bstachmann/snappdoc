# Operate

> **Optional file:** Omit `operate.md` (and its entries in `README.md` and `zensical.toml`) for internal libraries or packages without standalone runtime operations.

Explain how to configure, run, monitor, troubleshoot, and maintain this component in operation.

> **Example:** `meter-svc` runs as a stateless container alongside PostgreSQL and exposes diagnostics and log endpoints for runtime monitoring.

## Configuration & Secrets

Document runtime environment variables, configuration files, secrets, and defaults.

| Setting / Secret | Required | Default | Description |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Setting / Secret | Required | Default | Description |
> | :--- | :--- | :--- | :--- |
> | `METER_URL` | Yes | — | Local HTTP base URL of the smart meter (set in `.env`). |
> | `secrets/meter_db_password.txt` | Yes | — | PostgreSQL password file (`chmod 600`) mounted into the container. |
> | `CACHE_TTL_SECONDS` | No | `60` | Freshness window for cached meter snapshots. |

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

## Troubleshooting

List common operational failure modes, symptoms, and recovery steps.

> **Example:**
>
> - **`degraded` diagnostics / HTTP `502`:** Verify the smart meter is reachable at `METER_URL` on the local LAN and check container logs via `podman logs meter-svc`.
