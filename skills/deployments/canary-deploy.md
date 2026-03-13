# Skill: canary-deploy

## Purpose
Executes a canary deployment with metric-gated traffic shifting. Gradually shifts traffic to the new version while monitoring success metrics. Automatically promotes or rolls back based on SLO compliance.

## Inputs
- `service`: Service name to deploy
- `new_image`: New container image tag
- `canary_percentage`: Initial traffic percentage (e.g., 5, 10, 25)
- `success_metrics`: Comma-separated list of metrics to monitor (e.g., "error_rate,p99_latency")
- `baseline_metrics`: Optional reference metrics for comparison
- `duration`: How long to hold at each traffic level (e.g., "10m")
- `promotion_strategy`: automatic | manual

## Outputs
- Canary deployment report with:
  - Deployment status at each traffic level
  - Metric comparison (canary vs baseline)
  - SLO compliance check results
  - Decision: promoted to next level or rolled back
  - Final state confirmation

## Tools Used
- `kubectl`: Update deployment, scale replicas
- `argocd`: Sync ArgoCD application
- `helm`: Upgrade Helm release
- `promql`: Query success metrics during canary
- `datadog-api`: Query Datadog metrics

## Read-Only
No. This skill modifies Kubernetes deployments and may trigger rollbacks.

## Example Invocations
```
canary-deploy service:payments new_image:v2.1.0 canary_percentage:5 success_metrics:error_rate,p99_latency duration:10m
canary-deploy service:api-gateway new_image:latest canary_percentage:10 promotion_strategy:manual
/canary service:payments image:v2.1.0 --canary-pct 5
```
