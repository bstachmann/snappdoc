# <Name> (<Micro Service|Web UI|Library|...>)

<!-- --8<-- [start:overview] -->
Briefly describe how this component is implemented (max 2–3 sentences).
<!-- --8<-- [end:overview] -->

> **Example:** The Meter Service is a stateless Python FastAPI microservice. It polls a smart meter over local HTTP and stores 1-minute cached power snapshots in a dedicated PostgreSQL database.

## Goals

<!-- --8<-- [start:goals] -->
List a few key goals—preferably validatable or measurable.
<!-- --8<-- [end:goals] -->

> **Example:**
>
> - **Reliable grid telemetry:** Report net grid power with a 50-entry recent history.
> - **Protect meter hardware:** Serve cached readings for **1 minute** to keep LAN polling minimal.

## System Context

<!-- --8<-- [start:context-and-scope] -->
Add a C4-styled Mermaid `flowchart TB` diagram with ELK layout (`layout: elk`) and a `subgraph` boundary (`c4Boundary`) separating this component from external systems. Wrap the diagram in `<!-- --8<-- [start:system-context] -->` / `<!-- --8<-- [end:system-context] -->` snippet markers so `README.md` (Overview) can include it from this single source. Use short names with `<small>[Role]</small>` subtitles (`c4System`, `c4Db`, `c4External`), omit box descriptions, keep relationship labels short, and use `<br/>` line breaks for multi-word labels to prevent overlapping text.

List one bullet point per interaction below the diagram.
<!-- --8<-- [end:context-and-scope] -->

> **Example:**
>
> <!-- --8<-- [start:system-context] -->
> ```mermaid
> ---
> config:
>   layout: elk
> ---
> flowchart TB
>     controller["Surplus<br/>Controller<br/><small>[System]</small>"]:::c4System
>     subgraph meter_boundary["Meter Service [Boundary]"]
>         meter_svc["Meter<br/>Service<br/><small>[System]</small>"]:::c4System
>         meter_db[("Meter<br/>Database<br/><small>[Database]</small>")]:::c4Db
>     end
>     smart_meter["Smart<br/>Meter<br/><small>[External System]</small>"]:::c4External
>
>     controller -->|"Queries<br/>grid power"| meter_svc
>     meter_svc -->|"Stores<br/>snapshots"| meter_db
>     meter_svc -->|"Polls<br/>readings"| smart_meter
>
>     classDef c4System fill:#1168bd,stroke:#0b4884,color:#ffffff
>     classDef c4Db fill:#438dd5,stroke:#2e6295,color:#ffffff
>     classDef c4External fill:#6e7681,stroke:#4e555e,color:#ffffff
>     classDef c4Boundary fill:none,stroke:#6e7681,stroke-width:1.5px,stroke-dasharray:6 4
>     class meter_boundary c4Boundary
> ```
> <!-- --8<-- [end:system-context] -->
>
> - **Surplus Controller → Meter Service:** Queries net grid power to decide EV charging speed.
> - **Meter Service → Smart Meter:** Polls raw power readings when the 1-minute cache expires.

## Constraints

<!-- --8<-- [start:constraints] -->
List external constraints imposed on this component (e.g., hardware, platform, language, security, deployment). Include only constraints that cannot easily be changed for reasons outside this component, and name or link the reason for each.
<!-- --8<-- [end:constraints] -->

> **Example:**
>
> - **Local LAN polling only:** The smart meter exposes an unencrypted local HTTP API with no cloud access ([System Purpose](../../purpose.md#constraints)).
> - **File-based secrets only:** Platform security forbids plaintext secret environment variables ([ADR-04](../../architecture.md#architecture-decisions)).
