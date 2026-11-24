# Team

> **Optional file:** Include `team.md` at the system root when several people or roles share responsibility and readers need to know who decides, owns, or operates what. Omit it for single-maintainer projects; nested components link to the root page instead of duplicating it.

Name the team, its mission, and its main communication channel (max 2–3 sentences).

> **Example:** The Energy Platform Team builds and operates the Home Energy System. Reach us in `#energy-platform`.

## Roles

List the roles used in this document and on the team.

| Role | Abbreviation | Description |
| :--- | :--- | :--- |

> **Example:**
>
> | Role | Abbreviation | Description |
> | :--- | :--- | :--- |
> | Product Owner | PO | Prioritizes features and accepts stories. |
> | Tech Lead | TL | Accountable for architecture and technical quality. |

## Responsibilities

Assign responsibilities using a RACI matrix (**R**esponsible, **A**ccountable, **C**onsulted, **I**nformed).

| Task / Topic | Responsible | Accountable | Consulted | Informed |
| :--- | :--- | :--- | :--- | :--- |

> **Example:**
>
> | Task / Topic | Responsible | Accountable | Consulted | Informed |
> | :--- | :--- | :--- | :--- | :--- |
> | Architecture decisions | Senior Developers | TL | Security Officer | Team |
> | Keeping documentation current | Everyone | TL | — | — |

## Component Ownership

Single source of truth for who owns each component. Other pages link here instead of listing owners.

| Component | Owners | Deputy |
| :--- | :--- | :--- |

> **Example:**
>
> | Component | Owners | Deputy |
> | :--- | :--- | :--- |
> | [`meter-svc`](services/meter-svc/README.md) | Alex Example | Sam Example |

## Duty Roles

Describe rotating duty roles (e.g., on-call, support duty), their mission, rotation, and checklists per cadence (daily, sprint start/end, quarterly). Link maintenance tasks in [Operate](operate.md#maintenance) and runbooks rather than repeating procedures.

> **Example:**
>
> ### Platform Duty
>
> Rotates weekly. Keeps production healthy and answers stakeholder requests; does not work on feature stories.
>
> - **Daily:** Check open alerts and dependency security findings.
> - **Weekly:** Perform due tasks from [Maintenance](operate.md#maintenance).

## Way of Working

Describe the team-wide workflow: from issue to branch, pull request, review, and deployment; definitions of ready/done; and how documentation is maintained. Keep component-specific development conventions in each component's `develop.md`.

> **Example:**
>
> 1. Every change starts with an issue; branches are named `feat/<ISSUE>-<summary>`.
> 2. Pull requests require one review by a component owner ([Component Ownership](#component-ownership)).
> 3. Merged changes deploy to staging automatically; production deploys run daily.
