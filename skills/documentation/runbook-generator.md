# Skill: runbook-generator

## Purpose
Generates operational runbooks from live service state and historical incident data. Creates Markdown runbooks with overview, dependencies, alert responses, and escalation procedures.

## Inputs
- `service_name`: Service to generate runbook for
- `include_slos`: Include SLO definitions (default: true)
- `include_alerts`: Include alert response procedures (default: true)
- `include_escalation`: Include escalation paths (default: true)

## Outputs
- Markdown runbook with:
  - Service overview and description
  - Architecture diagram
  - Dependencies (upstream/downstream services)
  - Key metrics and dashboards
  - Alert response procedures:
    - Alert name and description
    - Severity level
    - Runbook steps
    - Escalation path
  - Common failure scenarios and recovery steps
  - Emergency contacts
  - SLO definitions and error budget status

## Tools Used
- `kubectl`: Get service deployments, ConfigMaps, services
- `promql`: Query service metrics for runbook
- `datadog-api`: Get alert configurations
- `github-api`: Get recent incidents for the service

## Read-Only
Yes. This skill only reads service state and generates documentation. No resources are modified.

## Example Invocations
```
runbook-generator service_name:payments
runbook-generator service_name:api-gateway include_slos:true include_alerts:true
/runbook service:payments
```
