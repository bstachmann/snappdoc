# <Procedure Name> — Runbook

> **Optional directory/files:** Create runbooks under `runbooks/` (one procedure per file, e.g., `runbooks/rotate-db-password.md`) only for multi-step procedures that must be followed exactly: recurring maintenance, recovery, initial setup, or emergency procedures. Keep short symptom → fix hints in [Operate](../operate.md#troubleshooting) instead, and omit `runbooks/` if no such procedures exist.

State what this procedure achieves and the expected outcome when finished (max 2–3 sentences).

> **Example:** Rotates the PostgreSQL password of `meter-svc` without downtime. Afterwards the service connects with the new password and the old password is revoked.

| Trigger | Frequency | Duration | Owner | Last Tested |
| :--- | :--- | :--- | :--- | :--- |

> **Example:**
>
> | Trigger | Frequency | Duration | Owner | Last Tested |
> | :--- | :--- | :--- | :--- | :--- |
> | Rotation reminder or suspected leak | Every 90 days | ~20 min | Platform duty role ([Team](../team.md#duty-roles)) | 2026-10-02 |

## When to Use

Describe the situations that require this procedure and when *not* to use it (link the better alternative).

> **Example:**
>
> - Use for scheduled rotations and suspected credential leaks.
> - Do **not** use when PostgreSQL itself is unavailable; follow [Restore Database](restore-database.md) instead.

## Roles & Access

List the roles involved and the permissions, accounts, or approvals required before starting. Reference credential stores and access request processes instead of including secrets.

> **Example:**
>
> - **Driver** (performs the steps) and **Reviewer** (checks each verification); never work alone on production.
> - Requires admin access to the password manager entry `meter-db` and write access to `secrets/` on the production host ([Operate](../operate.md#access-permissions)).

## Prerequisites

List tools, system state, and checks that must be in place before the first step.

> **Example:**
>
> - `psql` client available on the production host.
> - `GET /api/v1/diagnostics` of `meter-svc` reports `ok`.

## Steps

Number every step. Keep one action per step with copy-pasteable commands, followed by an explicit *Verify:* line describing the expected result. Mark optional or branching steps explicitly.

> **Example:**
>
> 1. **Generate a new password** in the password manager entry `meter-db` (do not save it yet).
>     - *Verify:* The new password contains no `\` characters.
> 2. **Set the password in PostgreSQL:**
>
>     ```bash
>     psql -U postgres -c "ALTER ROLE meter_app PASSWORD '<new-password>';"
>     ```
>
>     - *Verify:* `ALTER ROLE` is printed.
> 3. **Update the secret file and restart the service:**
>
>     ```bash
>     printf '%s' '<new-password>' > secrets/meter_db_password.txt
>     podman-compose up -d meter-svc
>     ```
>
>     - *Verify:* `GET /api/v1/diagnostics` reports `ok` within 1 minute.
> 4. **Save the new password** in the password manager entry `meter-db`.

## Rollback / Abort

Describe how to undo or safely stop at each stage, and name any point of no return.

> **Example:**
>
> - **Before step 2:** Discard the generated password; nothing has changed.
> - **After step 2:** Re-run step 2 with the old password from the password manager history.

## Escalation

Name who to contact when a step fails or the outcome cannot be verified. Link [Emergency](../emergency.md) for critical incidents.

> **Example:** If `meter-svc` stays `degraded` after rollback, follow [Emergency](../emergency.md) and page the on-call engineer.
