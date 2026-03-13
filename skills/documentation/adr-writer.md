# Skill: adr-writer

## Purpose
Creates Architecture Decision Records (ADRs) from discussions or PR context. Produces structured ADRs in MADR (Markdown ADR) format for documenting architectural choices.

## Inputs
- `title`: Architecture decision title
- `context`: Problem statement and background
- `options`: List of options considered (at least 2)
- `decision`: The chosen option
- `consequences`: Consequences of the decision (positive and negative)
- `status`: proposed | accepted | deprecated | superseded
- `superseded_by`: Optional reference to replacing ADR

## Outputs
- MADR-formatted ADR document with:
  - ADR ID (auto-incremented)
  - Title
  - Date
  - Status
  - Context and Problem Statement
  - Decision
  - Consequences
  - Related ADRs section

## Tools Used
- `gh`: Create GitHub issues or PRs for ADR tracking
- `git`: Check existing ADRs for ID sequencing

## Read-Only
Yes. This skill creates new ADR documents. It reads existing ADRs to determine ID sequence but doesn't modify existing files.

## Example Invocations
```
adr-writer title:"Use PostgreSQL for user data" context:"Need durable relational storage" options:"DynamoDB, PostgreSQL, MongoDB" decision:"PostgreSQL with read replicas" consequences:"Requires migration, improved query flexibility"
adr-writer title:"Migrate to Kubernetes" status:accepted
```
