# Compliance

> **Optional file:** Include `compliance.md` (typically at the system root) when the system must demonstrably satisfy external policies, standards, regulations, or organization-wide decisions, and auditors or reviewers need traceable evidence. Omit it otherwise.

Summarize which external rules apply and how compliance is tracked (max 2–3 sentences).

> **Example:** The Home Energy System follows the organization's Secure Development Policy and Cloud Security Concept. Each requirement links to its implementation and is reviewed quarterly.

## Policies & Standards

List the policies, standards, regulations, and organization-wide decisions that apply.

| Policy / Standard | Issuer / Owner | Scope | Link |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Policy / Standard | Issuer / Owner | Scope | Link |
> | :--- | :--- | :--- | :--- |
> | Secure Development Policy (SDP) | Information Security Officer | All services | [SDP](https://example.com/sdp) |

## Requirement Traceability

Map each applicable requirement to its implementation. Link the documentation that describes the implementation (`concepts/`, `specs/`, `runbooks/`, [Architecture](architecture.md)) instead of describing it here.

Status: ✅ Implemented · 🟡 Accepted exception · 🚧 Planned (link issue) · 🔴 Open

| Requirement (Policy § / ID) | Implementation | Status | Notes |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Requirement (Policy § / ID) | Implementation | Status | Notes |
> | :--- | :--- | :--- | :--- |
> | SDP 4.2 — Authenticate all API access | [Authentication](concepts/authentication.md) | ✅ | — |
> | SDP 5.1 — Rotate credentials every 90 days | [Rotate DB Password](runbooks/rotate-db-password.md) | ✅ | — |
> | SDP 6.3 — Signed container images | — | 🚧 | [ISSUE-123](https://example.com/issues/123) |

## Exceptions

List approved deviations with reason, approver, and expiry.

| Requirement | Exception & Reason | Approved by | Expires |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Requirement | Exception & Reason | Approved by | Expires |
> | :--- | :--- | :--- | :--- |
> | SDP 7.2 — TLS for all traffic | Smart meter supports plain HTTP only; traffic stays on the isolated LAN | Information Security Officer | 2027-06-30 |

## Reviews & Audit Evidence

Describe periodic compliance reviews and where their evidence is stored. Keep one entry per review.

> **Example:**
>
> | Date | Reviewer | Result | Record |
> | :--- | :--- | :--- | :--- |
> | 2026-10-15 | Tech Lead | ✅ No open findings | [Q4 Checkup](https://example.com/reviews/2026-q4) |

## Approved Dependencies

*(Optional)* Include only if third-party dependencies require approval. List approved dependencies and those pending approval.

> **Example:**
>
> | Dependency | Purpose | Status | Approved by / Date |
> | :--- | :--- | :--- | :--- |
> | `fastapi` | HTTP API framework | ✅ Approved | Tech Lead, 2026-03-01 |
> | `httpx` | Smart meter HTTP client | 🚧 Pending | — |
