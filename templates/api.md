# API

> **Optional file:** Omit `api.md` (and its entries in `README.md` and `zensical.toml`) if this component does not expose an interface (REST, HTTP routes, CLI, or library API).

Briefly describe the interface(s) exposed by this component (REST, CLI, library, etc.).

> **Example:** `meter-svc` exposes a RESTful JSON API (host port `8006`) for querying TTL-cached grid power readings and diagnostics.

## Endpoints / Operations

| Method | Path / Operation | Request / Response | Description |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Method | Path / Operation | Request / Response | Description |
> | :--- | :--- | :--- | :--- |
> | `GET` | `/api/v1/status` | `MeterStatusResponse` | Returns cached grid power (1-minute TTL) and up to 50 history entries. |

## Payloads & Schemas

Document request and response models with concise examples.

> **Example:**
>
> ```json
> { "grid_watts": -1250.0, "updated_at": "2026-11-21T12:00:00Z" }
> ```

## Error Handling

List error status codes and failure semantics.

> **Example:**
>
> - **`502 Bad Gateway`:** Smart meter unreachable or returned non-2xx; marks diagnostics `degraded`.
