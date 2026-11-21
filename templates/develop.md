# Develop

Document how to set up a local development environment, run tests and linters, and contribute changes to this component.

> **Example:** `meter-svc` is a Python FastAPI service managed with `uv`, tested offline with `pytest` and recorded HTTP cassettes, and linted with `ruff`.

## Prerequisites & Local Setup

List required toolchains, runtimes, environment setup, and dependency installation steps for local development.

> **Example:**
>
> ```bash
> cd services/meter-svc
> uv sync --dev
> ```

## Running Locally

Show how to run this component locally for development (live reload, local or mocked dependencies).

> **Example:**
>
> ```bash
> uv run uvicorn meter_svc.main:app --reload --port 8006
> ```

## Testing & Quality Checks

Document how to run unit/integration tests, linters, type checks, and formatting checks.

> **Example:**
>
> ```bash
> cd services/meter-svc && uv run pytest -v && uv run ruff check
> ```

## Workflow & Conventions

Document component-specific development workflows, test fixtures, code generation, or contribution conventions.

> **Example:**
>
> - Refresh offline smart-meter HTTP fixtures under `tests/cassettes/` rather than depending on live hardware in CI.
> - Link new requirement tests from the relevant `specs/<topic>.md` file using `*Validated by:*`.
