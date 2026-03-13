# Command: /plan

Maps to the **Architect** agent (readonly).

## Syntax

```
/plan <description> [flags]
```

## Description

Architecture planning and ADR generation. Produces designs, evaluates trade-offs, and generates documentation.

## Flags

| Flag | Description | Required |
|---|---|---|
| `--env` | Target environment | No |
| `--service` | Target service | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |
| `--dry-run` | Show plan without executing | No |
| `--since` | Time range start | No |
| `--until` | Time range end | No |

## Examples

```bash
/plan "migrate postgres to aurora serverless" --output md
/plan "add multi-region failover" --env prod --verbose
/plan "reduce latency for api gateway" --service api
```

## Agent: Architect

**Privilege:** `readonly` (produces plans, never deploys)

**Capabilities:**
- Design cloud-native architectures (multi-region, HA)
- Evaluate trade-offs (cost vs reliability vs performance)
- Generate Architecture Decision Records (ADRs)
- Produce infrastructure diagrams (Terraform modules, Mermaid)
- Review PRs for architectural impact
- Model failure scenarios and calculate blast radius
- Produce migration plans (lift-and-shift, re-architecture)
- Capacity and cost modeling
- DR planning with RPO/RTO targets

## Output Formats

- Markdown (default): Full ADR or design document
- Mermaid: Infrastructure diagrams
- Terraform: Infrastructure as code templates
- ASCII: Quick visual diagrams
