# Legacy Systems

> **Optional file:** Include `legacy.md` when this system replaced decommissioned systems whose archived data, backups, or knowledge must remain accessible (e.g., for retention obligations, audits, or data recovery). Omit it otherwise.

Summarize which systems were replaced and why their legacy information is retained (max 2–3 sentences).

> **Example:** The Home Energy System replaced the standalone *Meter Logger* in 2025. Its archived readings are retained for 10 years for billing disputes.

## Overview

| Legacy System | Replaced by | Decommissioned | Archived Data Retained Until |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Legacy System | Replaced by | Decommissioned | Archived Data Retained Until |
> | :--- | :--- | :--- | :--- |
> | Meter Logger | `meter-svc` | 2025-03-31 | 2035-03-31 |

## <Legacy System Name>

For each legacy system, describe what it was, what was archived (data, backups, logs, source code), where the archives are stored, and how they are protected. Link a runbook for restoring or decrypting data and the archived sources. Name the location of encryption keys, never the keys themselves.

> **Example:**
>
> ### Meter Logger
>
> - **Purpose:** Logged raw meter readings to CSV files on a Raspberry Pi.
> - **Archived data:** All CSV files (2019–2025), compressed and encrypted in the `archive` storage bucket; the key is stored in the password manager entry `meter-logger-archive`.
> - **Restore:** [Restore Meter Logger Archive](runbooks/restore-meter-logger-archive.md).
> - **Sources:** Archived repository [`meter-logger`](https://example.com/archive/meter-logger).
