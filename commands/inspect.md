# Command: /inspect

Maps to the **Inspector** agent (readonly).

## Syntax

```
/inspect <resource> [flags]
```

## Description

Read-only exploration of any infrastructure resource. The default command to invoke first. Never mutates anything.

## Resource Types

| Resource | Example |
|---|---|
| cluster | `/inspect cluster prod-eks` |
| slo | `/inspect slo service:payments last:7d` |
| topology | `/inspect topology aws:us-east-1` |
| drift | `/inspect drift terraform:production` |
| iam | `/inspect iam user:deploy-bot` |
| service | `/inspect service payments --env prod` |

## Flags

| Flag | Description | Required |
|---|---|---|
| `--env` | Target environment (prod, staging, dev) | No |
| `--service` | Target service name | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--since` | Time range start | No |
| `--until` | Time range end | No |
| `--verbose` | Include full context in output | No |
| `--dry-run` | Show plan without executing | N/A (always readonly) |

## Examples

```bash
/inspect cluster prod-eks --output table
/inspect slo service:payments --since 7d
/inspect topology aws:us-east-1 --verbose
/inspect drift --env prod --service payments
/inspect iam user:deploy-bot --output json
```

## Agent: Inspector

**Privilege:** `readonly`

**Capabilities:**
- Map cluster topology (nodes, namespaces, workloads, services)
- Query Prometheus/Datadog metrics without modifying alerts
- Inspect Terraform state (read-only)
- Read GitHub PRs, workflow runs, and repository state
- List secrets (names only, never values)
- Summarize recent incidents and SLO status
- Generate topology diagrams (Mermaid/ASCII)
- Audit IAM permissions (read API calls only)

## Context Collected

- Cloud account topology
- Kubernetes cluster state
- Recent deployment history
- Active incidents
- Current SLO compliance
- Open PRs / pending changes
