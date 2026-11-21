# Architecture

Summarize the most important aspects of this component's architecture (max 2–3 sentences).

> **Example:** The Meter Service is a stateless FastAPI adapter that isolates local smart-meter polling behind a PostgreSQL-backed 1-minute status cache.

## Solution Strategy

<!-- --8<-- [start:solution-strategy] -->
One short paragraph plus bullet points explaining the key design ideas behind this solution.
<!-- --8<-- [end:solution-strategy] -->

> **Example:** Keeps LAN traffic to the smart meter minimal while serving consistent readings across container restarts.
>
> - **1-minute DB cache:** Serves fresh snapshots from PostgreSQL via `status-cache`.
> - **Bounded HTTP client:** Polls the meter with a 5-second timeout and normalizes power signs.

## Components

<!-- --8<-- [start:components] -->
Add a C4-styled Mermaid `flowchart TB` diagram with ELK layout (`layout: elk`), a `subgraph` container boundary (`c4Boundary`), and short component names (`c4Component`, `c4Db`, `c4External`, no box descriptions), using `<br/>` line breaks for multi-word labels to prevent overlapping text, followed by concise summaries of:

> **Example:**
>
> ```mermaid
> ---
> config:
>   layout: elk
> ---
> flowchart TB
>     subgraph meter_svc["Meter Service [Container]"]
>         api["HTTP<br/>API<br/><small>[Component]</small>"]:::c4Component
>         client["Meter<br/>Client<br/><small>[Component]</small>"]:::c4Component
>     end
>     meter_db[("Meter<br/>Database<br/><small>[Container]</small>")]:::c4Db
>     smart_meter["Smart<br/>Meter<br/><small>[External System]</small>"]:::c4External
>
>     api -->|"Polls"| client
>     api -->|"Caches"| meter_db
>     client -->|"HTTP"| smart_meter
>
>     classDef c4Component fill:#5b9bd5,stroke:#3c73a8,color:#ffffff
>     classDef c4Db fill:#438dd5,stroke:#2e6295,color:#ffffff
>     classDef c4External fill:#6e7681,stroke:#4e555e,color:#ffffff
>     classDef c4Boundary fill:none,stroke:#6e7681,stroke-width:1.5px,stroke-dasharray:6 4
>     class meter_svc c4Boundary
> ```

### Component implementations

Describe each component briefly. And link to its implementation (e.g. python class or other component description).

> **Example:**
>
> - **HTTP API** ([`main.py`](src/meter_svc/main.py)): Exposes status/diagnostics endpoints and orchestrates cached reads.
> - **Meter Client** ([`MeterClient`](src/meter_svc/client.py#L12)): Polls raw watt readings with a 5-second timeout.

### Domain objects

Describe each domain object briefly. Link to its implementation (e.g., Python class or [Database](db.md) model, if applicable) and relevant `specs/` files for detailed constraints.

> **Example:**
>
> - **Meter Snapshot** ([`MeterSnapshotModel`](src/meter_svc/models.py#L10)): Persisted reading in [Database](db.md) (see [Status Caching](specs/status-caching.md)).
<!-- --8<-- [end:components] -->

## Runtime

<!-- --8<-- [start:runtime] -->
Add a Mermaid `sequenceDiagram` (short labels with `<br/>` line breaks for multi-word messages and participants) and brief notes covering the main runtime flows.
<!-- --8<-- [end:runtime] -->

> **Example:**
>
> ```mermaid
> sequenceDiagram
>     participant Caller as Consumer
>     participant API as Meter<br/>Service
>     participant Meter as Smart<br/>Meter
>
>     Caller->>API: Request<br/>grid power
>     API->>Meter: Poll reading<br/>(on cache miss)
>     Meter-->>API: Raw<br/>watts
>     API-->>Caller: Status &<br/>history
> ```

## Deployment

<!-- --8<-- [start:deployment] -->
Add a C4-styled Mermaid `flowchart TB` diagram with ELK layout (`layout: elk`) showing runtime containers and deployment-node `subgraph` boundaries (`c4Boundary`, `c4Container`, `c4Db`, `c4External`), using `<br/>` line breaks for multi-word labels, plus brief deployment notes.
<!-- --8<-- [end:deployment] -->

> **Example:**
>
> ```mermaid
> ---
> config:
>   layout: elk
> ---
> flowchart TB
>     subgraph host["Home Server [Deployment Node]"]
>         meter_svc["Meter<br/>Service<br/><small>[Container]</small>"]:::c4Container
>         postgres[("PostgreSQL<br/><small>[Container]</small>")]:::c4Db
>     end
>     meter_svc -->|"SQL<br/>(:5432)"| postgres
>
>     classDef c4Container fill:#438dd5,stroke:#2e6295,color:#ffffff
>     classDef c4Db fill:#438dd5,stroke:#2e6295,color:#ffffff
>     classDef c4Boundary fill:none,stroke:#6e7681,stroke-width:1.5px,stroke-dasharray:6 4
>     class host c4Boundary
> ```

## Concepts

<!-- --8<-- [start:concepts] -->
Add a short subsection for each relevant cross-cutting concept (e.g., caching, error handling, logging, security, i18n, data quality, testing).
<!-- --8<-- [end:concepts] -->

> **Example:**
>
> ### Error Handling
>
> Upstream HTTP failures mark `/api/v1/diagnostics` as `degraded` and return HTTP `502`.

## Risks

<!-- --8<-- [start:risks] -->
Numbered list of risks ordered by importance (`harm × likelihood`), including mitigations.
<!-- --8<-- [end:risks] -->

> **Example:**
>
> 1. **Meter Wi-Fi dropouts (Medium × Medium):** *Mitigation:* 5-second HTTP timeout, degraded health state, and static LAN IP recommendation.

## Architecture Decisions

<!-- --8<-- [start:architecture-decisions] -->
List component-specific architecture decisions and their rationale.
<!-- --8<-- [end:architecture-decisions] -->

> **Example:**
>
> - **1-Minute DB Cache over Direct Pass-Through:** Shields the smart meter from bursty dashboard reads while keeping the container stateless.
