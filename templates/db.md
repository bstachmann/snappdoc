# Database

> **Optional file:** Omit `db.md` (and its entries in `README.md` and `zensical.toml`) if this component is stateless or owns no database / persistence tables.

Briefly describe the persistence store(s) owned by this component (RDBMS, document store, key-value store, etc.), isolation boundaries, and access role.

> **Example:** `meter-svc` owns an isolated PostgreSQL database (`meter_db`) accessed via the least-privilege role `meter_app`.

## Tables / Collections

| Table / Collection | Purpose | Key Columns / Fields | Indexes & Constraints |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Table / Collection | Purpose | Key Columns / Fields | Indexes & Constraints |
> | :--- | :--- | :--- | :--- |
> | `meter_snapshots` | Cached readings & history | `id`, `grid_watts`, `updated_at` | `PK (id)`, `INDEX (updated_at)` |

## Schema & Data Model

Document table definitions, relationships, defaults, and sign/unit conventions (optionally with a Mermaid `erDiagram`).

> **Example:**
>
> ```mermaid
> erDiagram
>     meter_snapshots {
>         int id PK
>         float grid_watts "W (+import / -export)"
>         timestamptz updated_at "UTC, indexed"
>     }
> ```

## Provisioning, Migrations & Retention

Document database provisioning, schema migrations/reconciliation, backup/retention policies, and connection pooling notes.

> **Example:**
>
> - **Provisioning & Migrations:** `infra/postgres/init-meter.sh` creates `meter_app`/`meter_db`; `init_db()` runs idempotent `create_all()` on startup.
> - **Retention:** All snapshots are kept; API queries return at most the 50 newest rows.
