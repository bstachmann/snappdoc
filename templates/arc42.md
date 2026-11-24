# <Name> — Architecture (arc42)

> **Optional file:** Include `arc42.md` only when a single-page arc42 architecture view is needed (typically top-level system documentation). Omit it—and its entry in `README.md` and `zensical.toml`—otherwise.
>
> **How to use:** Remove the surrounding backticks from each `--8<--` directive below and replace `services/<component>/` with your component path (or omit the prefix for root docs, e.g. `--8<-- "purpose.md:overview"`). Remove the *Target Architecture & Roadmap* subheading and its include if `architecture.md` omits that optional section, since missing snippet sections fail strict builds.

This single-page architecture view follows the [arc42](https://arc42.org/) template—an open-source, pragmatic structure for documenting and communicating software and system architectures across 12 standardized sections. It assembles the modular documentation pages (`purpose.md`, `functionality.md`, `architecture.md`, and `glossary.md`) into one continuous reference without duplicating content.

> *Structure adapted from the [arc42](https://arc42.org/) template by Dr. Gernot Starke and Dr. Peter Hruschka, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (the 12 section headings are reused to organize modular Markdown includes rather than the original guidance text; the architecture content itself is separate from the template license).*

## 1. Introduction and Goals

`--8<-- "services/<component>/purpose.md:overview"`

`--8<-- "services/<component>/functionality.md:use-cases"`

`--8<-- "services/<component>/purpose.md:goals"`

## 2. Architecture Constraints

`--8<-- "services/<component>/purpose.md:constraints"`

## 3. Context and Scope

`--8<-- "services/<component>/purpose.md:context-and-scope"`

## 4. Solution Strategy

`--8<-- "services/<component>/architecture.md:solution-strategy"`

## 5. Building Block View

`--8<-- "services/<component>/architecture.md:components"`

## 6. Runtime View

`--8<-- "services/<component>/architecture.md:runtime"`

## 7. Deployment View

`--8<-- "services/<component>/architecture.md:deployment"`

## 8. Cross-cutting Concepts

`--8<-- "services/<component>/architecture.md:concepts"`

## 9. Architecture Decisions

`--8<-- "services/<component>/architecture.md:architecture-decisions"`

## 10. Quality Requirements

`--8<-- "services/<component>/functionality.md:non-functional-requirements"`

## 11. Risks and Technical Debt

`--8<-- "services/<component>/architecture.md:risks"`

### Target Architecture & Roadmap

`--8<-- "services/<component>/architecture.md:target-architecture"`

## 12. Glossary

`--8<-- "services/<component>/glossary.md:glossary"`
