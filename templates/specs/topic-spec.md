# <Topic> — Specification

> **Optional directory/files:** Create modular topic specs under `specs/` only when the component has detailed testable requirements and validation traces beyond shared specs; omit `specs/` otherwise.

This specification defines the detailed requirements for **<topic>** in `<component>`. See [<Parent Section>](../<parent>.md) for high-level context *(and [Common Service Specification](../../svc-specs.md) for shared service baselines, if applicable)*.

## Requirements

### <Requirement Title> (`<symbol or endpoint>`)

Precise, testable requirement statement. Use short paragraphs or sub-bullets for multi-step rules.

- *Why:* Rationale explaining why this requirement exists.
- *Validated by:* [`test_example_name`](../tests/test_<component>.py#L1)

> **Example:**
>
> ### Cache Hit Within TTL (`GET /api/v1/status`)
>
> Serves the latest `MeterSnapshotModel` row without calling the smart meter if `updated_at` is at most 60 seconds old.
>
> - *Why:* Protects the meter's embedded controller from bursty polling.
> - *Validated by:* [`test_status_cache_hit`](../tests/test_meter.py#L42)

## Constraints & Edge Cases

### <Constraint or Edge Case>

Concrete boundary condition, error code, or fallback rule.

- *Why:* Rationale.
- *Validated by:* [`test_edge_case_name`](../tests/test_<component>.py#L1)

> **Example:**
>
> ### Upstream Timeout Translation (`502 Bad Gateway`)
>
> If the smart meter poll exceeds 5 seconds or returns non-2xx, marks diagnostics `degraded` and returns HTTP `502` without writing a snapshot.
>
> - *Why:* Prevents failed polls from polluting the snapshot history.
> - *Validated by:* [`test_status_upstream_timeout`](../tests/test_meter.py#L78)
