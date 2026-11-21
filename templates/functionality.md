# Functionality

Describe this component's capabilities from a consumer perspective. Link to whichever optional reference files apply to this component ([API](api.md), [Events](events.md), [UI](ui.md), [Database](db.md), and `specs/`) for concrete contracts, schemas, and validation traces rather than repeating them here.

> **Example:** The Meter Service exposes cached smart-meter power readings for downstream consumers. See [API](api.md) and [Status Caching](specs/status-caching.md) for concrete contracts.

## Use Cases

<!-- --8<-- [start:use-cases] -->
List the primary use cases and expected behavior.
<!-- --8<-- [end:use-cases] -->

> **Example:**
>
> - **Query Grid Power:** Returns the latest cached reading (≤ 1 min old) with up to 50 history entries, or polls the smart meter on cache miss and persists a new snapshot.
> - **Report Device Unreachability:** Records an external error, marks diagnostics degraded, and fails the request when the meter cannot be reached.

## Domain Objects

Summarize the key domain concepts and their roles.

> **Example:**
>
> - **Meter Snapshot:** Point-in-time grid power reading in Watts (positive = import, negative = export) with a UTC timestamp.

## Non-Functional Requirements

<!-- --8<-- [start:non-functional-requirements] -->
List key performance, security, and reliability expectations.
<!-- --8<-- [end:non-functional-requirements] -->

> **Example:**
>
> - **Latency:** Cached status queries complete in under 50 ms; upstream meter polls time out after 5 s.
> - **Reliability:** Verified offline via recorded HTTP cassettes without live meter hardware.
