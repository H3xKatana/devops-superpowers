# Skill: capacity-planner

## Purpose
Analyzes historical resource utilization and projects future capacity needs. Provides recommendations for Kubernetes pod autoscaling, node scaling, and database capacity based on trends and growth projections.

## Inputs
- `service_name`: Target service to analyze
- `time_range`: Historical data range (e.g., "30d", "90d")
- `growth_rate`: Expected growth rate percentage (e.g., "20%")
- `horizon`: Projection timeframe (e.g., "6m", "1y")
- `metrics_source`: prometheus | datadog (optional, auto-detected)

## Outputs
- Capacity report with:
  - Current utilization percentages (CPU, memory, storage, network)
  - Historical trend analysis
  - Projected capacity needs at specified horizon
  - Recommended HPA (Horizontal Pod Autoscaler) settings
  - Recommended node pool scaling configuration
  - Cost impact estimation

## Tools Used
- `promql`: Query Prometheus for historical metrics
- `datadog-api`: Query Datadog for metrics
- `kubectl`: Get HPA configurations and pod metrics
- `aws-cli` / `gcloud` / `az`: Get cloud resource metrics

## Read-Only
Yes. This skill only reads metrics and produces analysis. No resources are modified.

## Example Invocations
```
capacity-planner service_name:api-gateway time_range:30d growth_rate:20% horizon:6m
capacity-planner service_name:payments time_range:90d growth_rate:50% horizon:1y
/capacity service:payments --growth 20% --horizon 6m
```
