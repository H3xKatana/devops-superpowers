# Command: /document

Maps to the **Doc Writer** agent (readonly).

## Syntax

```
/document <type> [flags]
```

## Description

Generate or update documentation from live infrastructure state.

## Types

| Type | Description |
|---|---|
| `runbook` | Operational runbook |
| `postmortem` | Incident postmortem |
| `onboarding` | New engineer guide |
| `changelog` | Deployment changelog |
| `adr` | Architecture decision record |

## Flags

| Flag | Description | Required |
|---|---|---|
| `--service` | Target service name | Yes (for runbook, changelog) |
| `--env` | Target environment | No |
| `--version` | Version for changelog | No (for changelog) |
| `--incident` | Incident ID for postmortem | Yes (for postmortem) |
| `--engineer` | Engineer name for onboarding | Yes (for onboarding) |
| `--team` | Team name for onboarding | Yes (for onboarding) |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |
| `--since` | Time range start | No |
| `--until` | Time range end | No |

## Examples

```bash
/document runbook service:payments
/document postmortem --incident INC-2024-042
/document onboarding --engineer john --team platform
/document changelog service:payments --version v2.1.0
/document adr "implement caching layer"
```

## Agent: Doc Writer

**Privilege:** `readonly`

**Capabilities:**
- Generate runbooks from existing kubectl/AWS/Terraform state
- Write postmortem documents from incident timelines
- Produce onboarding guides for new engineers
- Keep API documentation in sync with OpenAPI specs
- Generate CHANGELOG entries from Git history
- Write architecture diagrams and explanations
- Maintain an always-current service catalog
