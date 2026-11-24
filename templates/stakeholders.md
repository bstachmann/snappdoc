# Stakeholders

> **Optional file:** Include `stakeholders.md` (typically at the system root) when readers need more about stakeholders and integration partners than the System Context in [Purpose](purpose.md#system-context) shows, for example contacts, outage impact, or how to coordinate changes. Omit it otherwise. Keep the System Context diagram in `purpose.md` as the single source for interactions.

Summarize who depends on this system and whom it depends on (max 2–3 sentences).

> **Example:** Household residents and the utility's billing system consume data from the Home Energy System, which depends on the smart meter vendor and the wallbox manufacturer.

## Stakeholder Overview

List stakeholders, how they relate to this system, and the impact of an outage on them.

| Stakeholder / System | Relationship | Uses / Provides | Impact if Unavailable |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Stakeholder / System | Relationship | Uses / Provides | Impact if Unavailable |
> | :--- | :--- | :--- | :--- |
> | Utility billing | Consumer | Daily consumption export | Bills are estimated until the export catches up. |
> | Smart meter vendor | Provider | Meter firmware and support | No new firmware; no impact on operation. |

## Contacts & Channels

List how to reach each stakeholder. Prefer team channels and functional mailboxes over personal data.

| Stakeholder | Contact (Role / Team) | Channel | Notes |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Stakeholder | Contact (Role / Team) | Channel | Notes |
> | :--- | :--- | :--- | :--- |
> | Utility billing | Billing Integration Team | `#billing-integration` | Announce schema changes 4 weeks ahead. |

## Change Coordination

Describe how to request changes in systems or configuration owned by stakeholders (repositories, approval channels, access needed), and how changes on this side are announced to them.

> **Example:**
>
> - **Billing export mapping:** Owned by the Billing Integration Team; open a pull request in their configuration repository and post it in `#billing-integration`.
> - **Breaking changes on our side:** Announce in `#energy-platform` and notify all consumers listed above.
