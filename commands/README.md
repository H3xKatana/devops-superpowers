# Commands

Slash commands are the primary interface for engineers to invoke agents and skills.

## Core Commands

| Command | Agent | Description |
|---------|-------|-------------|
| `/inspect` | Inspector | Read-only exploration of any resource |
| `/deploy` | Deployer | Deploy a service (with strategy selection) |
| `/rollback` | Deployer | Rollback a service immediately |
| `/incident` | Incident Commander | Declare or manage an incident |
| `/slo` | SRE Advisor | Query SLO status and error budgets |
| `/audit` | Inspector | Security and compliance audit |
| `/plan` | Architect | Architecture planning and ADR generation |
| `/document` | Doc Writer | Generate or update documentation |
| `/cost` | Inspector | Cloud cost analysis and optimization |
| `/drift` | Inspector | Detect infrastructure drift |
| `/canary` | Deployer | Canary deployment management |
| `/runbook` | Doc Writer | Generate or update a runbook |
| `/postmortem` | Incident Commander | Generate postmortem document |
| `/capacity` | SRE Advisor | Capacity planning analysis |
| `/cve` | Inspector | CVE scan of running images |
| `/iam` | Inspector | IAM permission audit |
| `/logs` | Inspector | Log investigation |

## Syntax Convention

```
/[command] [resource] [flags]

Flags:
  --env       Target environment (prod|staging|dev)
  --service   Target service name
  --dry-run   Show plan without executing
  --confirm   Skip confirmation prompt (use with care)
  --output    Output format (json|yaml|md|table)
  --since     Time range start
  --until     Time range end
  --verbose   Include full context in output
```

## Example Invocations

```bash
/inspect cluster prod-eks --output table
/deploy service:payments image:v2.1.0 --env prod --strategy canary --canary-pct 5
/rollback service:payments --env prod
/incident declare sev:2 title:"Payment API 500 spike" 
/slo service:payments --since 7d
/audit --framework cis-k8s --env prod
/plan "migrate postgres to aurora serverless" --output md
/document runbook service:payments
/cost --env prod --since 30d --output table
/drift --env prod --service payments
/postmortem incident:INC-2024-042
/capacity service:payments --growth 20% --horizon 6m
```
