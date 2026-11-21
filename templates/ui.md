# UI

> **Optional file:** Omit `ui.md` (and its entries in `README.md` and `zensical.toml`) if this component provides no user interface (for example, headless microservices or internal libraries).

Briefly describe the user interface(s) provided by this component (web routes, views, CLI screens, etc.).

> **Example:** `web-ui` provides a responsive, bilingual (`EN` / `DE`) SvelteKit web app.

## Views & Routes

| Route / Screen | Purpose | Key Interactions |
| :--- | :--- | :--- |

> **Example:**
>
> | Route / Screen | Purpose | Key Interactions |
> | :--- | :--- | :--- |
> | `/` | Quick status overview & scheduling | Inspect live tiles; add, edit, or delete target times. |

## Components & Controls

Describe reusable UI components, controls, states, and visual conventions.

> **Example:**
>
> - **Status Tiles:** 4-tile grid showing live solar, battery, EV, and wallbox readings with disconnected indicators.

## User Flows & Feedback

Document key user workflows, loading/empty/error states, validation feedback, and internationalization or accessibility expectations.

> **Example:**
>
> - **Partial-Failure Banners:** Dismissible `role="alert"` banners isolate unreachable backend services while healthy cards remain interactive.
