# Emergency

> **Optional file:** Include `emergency.md` at the system root (or at the root of each independently operated system) when the system runs in production with on-call, escalation, or vendor support arrangements. Link it prominently from the root `README.md`. Omit it for libraries and components without production operations; nested components link to the root page instead of duplicating it.

State the first action readers must take in an emergency (max 2 sentences). Keep this page short and scannable; link to runbooks for details.

> **Example:** If `meter-svc` or `controller-svc` is down in production, announce the incident in the `#energy-incidents` channel first, then follow the matching procedure below.

## Emergency Procedures

Link the runbooks for emergency situations, with one line on when to use each.

> **Example:**
>
> - [Disaster Recovery](runbooks/disaster-recovery.md) — Restore the complete system on the standby host after loss of the production host.
> - [Hotfix Deployment](runbooks/hotfix-deployment.md) — Deploy an urgent fix while the regular release pipeline is blocked.

## Contacts & Escalation

List who to contact, in which order, and how. Prefer roles, shared on-call numbers, and team channels over personal data. Never commit credentials; if personal contact details are required, keep them in an access-controlled location (e.g., a password manager or internal wiki) and link to it.

| Situation / Level | Contact (Role) | Channel | Availability |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Situation / Level | Contact (Role) | Channel | Availability |
> | :--- | :--- | :--- | :--- |
> | First response | On-call engineer | On-call phone `+00 000 0000` | 24/7 |
> | Escalation | Engineering manager on duty | Contact list in password manager (`emergency/contacts`) | 24/7 |

## Vendor Support

List external vendors whose support may be needed, including support hours and contractual response times.

| Vendor / System | Support Channel | Support Hours | Response Times | Contract / SLA |
| :--- | :--- | :--- | :--- | :--- |

> **Example:**
>
> | Vendor / System | Support Channel | Support Hours | Response Times | Contract / SLA |
> | :--- | :--- | :--- | :--- | :--- |
> | Smart meter vendor | Support portal | Mon–Fri 9:00–17:00 CET | P1: 2 h, P2: 4 h, P3: 8 h | [Support Agreement](https://example.com/sla) |

## Emergency Access

Describe how to obtain elevated or break-glass access when regular access fails. Link the access procedure; never include credentials.

> **Example:** Request break-glass access to the production host via the [Emergency Access Procedure](https://example.com/break-glass); access is revoked automatically after 4 hours.

## Incident Communication

Name where incidents are announced, who informs affected stakeholders (see [Stakeholders](stakeholders.md)), and where post-incident reviews are recorded.

> **Example:**
>
> - Announce start, progress, and resolution in `#energy-incidents`.
> - Record post-incident reviews in the team wiki within 5 working days.
