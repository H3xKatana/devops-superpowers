# Command: /cost

Maps to the **Inspector** agent (readonly).

## Syntax

```
/cost [flags]
```

## Description

Cloud cost analysis and optimization. Break down cloud spend by service, team, and optimization opportunity.

## Flags

| Flag | Description | Required |
|---|---|---|
| `--env` | Target environment (prod, staging, dev) | No |
| `--service` | Target service name | No |
| `--since` | Time range start (e.g., 30d, 90d) | No |
| `--until` | Time range end | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |
| `--dry-run` | Show plan without executing | No |

## Examples

```bash
/cost --env prod --since 30d --output table
/cost --service payments --since 90d
/cost --env prod --since 30d --verbose
/cost --since 30d --output json
```

## Agent: Inspector

**Privilege:** `readonly`

**Capabilities:**
- Cost breakdown by service, team, environment
- Identify idle resources (unattached volumes, unused IPs, idle instances)
- Recommend reserved instance/savings plan opportunities
- Show cost trends over time
- Identify cost anomalies
- Calculate cost of proposed architecture changes

## Output Report Includes

- Total spend by period
- Top 10 cost drivers
- Optimization opportunities with estimated savings
- Cost trend charts
- Comparison by environment
- Resource-level breakdown
