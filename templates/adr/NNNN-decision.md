# ADR-NNNN: <Decision Title>

> **Optional directory/files:** Create decision records under `adr/` (named `NNNN-<short-title>.md`) only for decisions that are costly to reverse, required approval outside the team, followed intense discussion, or involved an evaluation of alternatives. Record lightweight decisions as one-line bullets in [Architecture](../architecture.md#architecture-decisions) instead, and omit `adr/` if no such decisions exist.

State the outcome of the decision in one sentence (TL;DR).

> **Example:** `meter-svc` caches smart-meter readings for 1 minute in PostgreSQL instead of passing every request through to the meter.

| Status | Date | Deciders | Supersedes / Superseded by |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Status | Date | Deciders | Supersedes / Superseded by |
> | :--- | :--- | :--- | :--- |
> | Accepted | 2026-11-21 | Energy Platform Team | — |

## Context

Describe the problem, forces, and requirements that led to this decision. Link relevant [specifications](../specs/), [concepts](../concepts/), or [compliance](../compliance.md) requirements.

> **Example:** Dashboards poll grid power every few seconds, but the smart meter's embedded controller becomes unresponsive when polled more than once per 30 seconds.

## Decision

Describe the chosen solution in a few sentences. Document details where they apply (e.g., [Architecture](../architecture.md#concepts), `concepts/`, or `specs/`) and link them here, so readers never need ADRs to understand the current system.

> **Example:** Serve readings from a 1-minute PostgreSQL cache and poll the meter only on cache miss (see [Status Caching](../specs/status-caching.md)).

## Alternatives Considered

List the options evaluated and why they were not chosen.

> **Example:**
>
> - **In-memory cache:** Lost on every container restart, causing polling bursts after deployments.
> - **Direct pass-through with rate limiting:** Rejects dashboard requests instead of serving slightly stale data.

## Consequences

List the resulting benefits, drawbacks, follow-up work, and risks (link [Risks](../architecture.md#risks) where applicable).

> **Example:**
>
> - ✅ Meter load is bounded to one poll per minute.
> - ❌ Readings can be up to 1 minute old.
