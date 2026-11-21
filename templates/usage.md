# How to

## Use

Show how to call or use this component (examples, client collections).

> **Example:**
>
> ```bash
> curl -s http://localhost:8006/api/v1/status | jq
> ```

## Setup

List prerequisites, secrets, configuration, and startup steps.

> **Example:**
>
> 1. Create `secrets/meter_db_password.txt` (`chmod 600`) and set `METER_URL` in `.env`.
> 2. Start with `podman-compose up --build -d postgres meter-svc`.

## Operate

Explain how to configure, monitor, troubleshoot, and maintain this component in operation.

> **Example:**
>
> - Inspect `GET /api/v1/diagnostics` (`ok`, `unconfigured`, `degraded`) and `GET /api/v1/logs`.
> - Rebuild after updates via `./scripts/start-app.py --build meter-svc`.

## Develop

Document local development prerequisites, tests, linters, and workflows.

> **Example:**
>
> ```bash
> cd services/meter-svc && uv run pytest -v && uv run ruff check
> ```
