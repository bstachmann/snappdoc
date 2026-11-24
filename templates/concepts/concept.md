# <Concept Name> — Concept

> **Optional directory/files:** Create a concept page under `concepts/` (e.g., `concepts/authentication.md`) only when a cross-cutting concept needs more than a short subsection in [Architecture](../architecture.md#concepts). Keep a 1–2 sentence summary linking here in `architecture.md`, and omit `concepts/` if all concepts fit there. Put testable requirements into `specs/` rather than here.

Summarize the concept and which components it applies to (max 2–3 sentences).

> **Example:** All services authenticate requests with short-lived tokens issued by the identity provider. `meter-svc`, `controller-svc`, and `web-ui` share the same validation rules.

## Problem & Scope

Describe the concern this concept addresses, the components it covers, and the requirements or policies it satisfies (link [Compliance](../compliance.md) or `specs/` where applicable).

> **Example:** Every API call must be attributable to a user or service account, and the household network must not be trusted implicitly ([Compliance](../compliance.md#requirement-traceability)).

## Solution

Explain how the concept works. Add C4-styled Mermaid diagrams or `sequenceDiagram` flows following the [Authoring Guide](../guide.md#diagrams) conventions where they help.

> **Example:**
>
> ```mermaid
> sequenceDiagram
>     participant UI as Web UI
>     participant IdP as Identity<br/>Provider
>     participant Meter as Meter<br/>Service
>
>     UI->>IdP: Log in
>     IdP-->>UI: Access<br/>token
>     UI->>Meter: Request with<br/>token
>     Meter->>Meter: Validate<br/>signature & scope
> ```

## Implementation

Describe where and how each component implements the concept. Link source files, configuration, component documentation, and runbooks for related operational procedures instead of repeating them.

> **Example:**
>
> - **`meter-svc`:** Validates tokens in [`auth.py`](../services/meter-svc/src/meter_svc/auth.py).
> - **Key rotation:** See [Rotate Signing Keys](../runbooks/rotate-signing-keys.md).

## Related Decisions & Specifications

Link architecture decisions and specifications that shaped or constrain this concept.

> **Example:** [ADR-0003: Token-Based Service Authentication](../adr/0003-token-auth.md), [Token Validation](../specs/token-validation.md).
