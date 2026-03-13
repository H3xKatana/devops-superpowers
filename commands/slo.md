# Command: /slo

Maps to the **SRE Advisor** agent (readonly).

## Syntax

```
/slo <target> [flags]
```

## Description

Query SLO status and error budgets. Provides recommendations, never takes autonomous action.

## Flags

| Flag | Description | Required |
|---|---|---|
| `--service` | Target service name | Yes |
| `--env` | Target environment | No |
| `--since` | Time range start (e.g., 7d, 30d) | No |
| `--until` | Time range end | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |

## Examples

```bash
/slo service:payments --since 7d
/slo service:api --env prod --output table
/slo service:payments --since 30d --verbose
```

## Agent: SRE Advisor

**Privilege:** `readonly`

**Capabilities:**
- SLO tracking and error budget burn rate analysis
- Toil identification and automation recommendations
- Capacity planning (based on historical trends + growth projections)
- Reliability risk assessment for upcoming changes
- Post-incident trend analysis
- Quarterly reliability review report generation
- Architecture reliability score (DORA metrics)

## Weekly Outputs

- Error budget report per service
- Top-3 toil reduction opportunities
- Deployment frequency & change failure rate
- MTTR trend
- Recommendations backlog (prioritized)

## Error Budget Policy

| Budget Remaining | Policy |
|---|---|
| > 50% | Normal operations. All deployments permitted. |
| 25–50% | Elevated caution. Require /inspect before every deploy. |
| 10–25% | Deploy freeze for non-critical changes. SRE Advisor produces remediation plan. |
| < 10% | Full deploy freeze. Only reliability work permitted. Incident Commander on standby. |
| 0% | Emergency mode. No new features. All hands on reliability. |
