# Events

> **Optional file:** Omit `events.md` (and its entries in `README.md` and `zensical.toml`) if this component neither produces nor consumes asynchronous events.

Briefly describe the asynchronous events, messages, or streams produced and consumed by this component (message broker topics, webhooks, SSE, etc.).

> **Example:** `meter-svc` publishes grid power updates to the local MQTT broker.

## Produced Events

| Event / Topic | Channel / Transport | Payload Schema | Trigger & Semantics |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Event / Topic | Channel / Transport | Payload Schema | Trigger & Semantics |
> | :--- | :--- | :--- | :--- |
> | `meter.reading.updated` | MQTT (`hes/meter/reading`) | `MeterReadingEvent` | Emitted whenever a fresh reading is persisted. |

## Consumed Events

| Event / Topic | Channel / Transport | Payload Schema | Handling & Side Effects |
| :--- | :--- | :--- | :--- |

> **Example:**
>
> | Event / Topic | Channel / Transport | Payload Schema | Handling & Side Effects |
> | :--- | :--- | :--- | :--- |
> | `meter.poll.requested` | MQTT (`hes/meter/poll`) | `PollRequestEvent` | Triggers an immediate cache refresh. |

## Payloads & Schemas

Document event envelopes and payload schemas with concise examples.

> **Example:**
>
> ```json
> { "event": "meter.reading.updated", "grid_watts": -1250.0, "timestamp": "2026-11-21T12:00:00Z" }
> ```

## Delivery & Error Handling

List delivery guarantees (at-least-once, idempotency, ordering), retry policies, and dead-letter handling.

> **Example:**
>
> - **At-least-once delivery:** Consumers deduplicate by `timestamp`; failed publishes retry 3 times before logging an error.
