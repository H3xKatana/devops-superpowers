# Skill: slo-tracker

## Purpose
Tracks Service Level Objectives (SLOs) and error budget consumption. Reports current SLO compliance, burn rate, and projects when error budget will be exhausted. Integrates with Prometheus, Datadog, or CloudWatch.

## Inputs
- `service_name`: Service to track SLOs for
- `slo_definition`: Optional SLO config (or auto-discovered from slo.yaml)
- `time_window`: Rolling window (e.g., "30d", "7d", "24h")
- `alert_thresholds`: Burn rate thresholds for alerts

## Outputs
- SLO status report with:
  - Current SLO percentage vs target
  - Error budget remaining (time and percentage)
  - Burn rate (fast/slow/normal)
  - Projected budget exhaustion date
  - Recommendations based on burn rate

## Tools Used
- `promql`: Query Prometheus for SLI metrics
- `datadog-api`: Query Datadog for metrics
- `aws-cloudwatch`: Query CloudWatch for AWS services
- `kubectl`: Read SLO config from ConfigMaps

## Read-Only
Yes. This skill only reads metrics and calculates SLO status. No resources are modified.

## Example Invocations
```
slo-tracker service_name:payments time_window:30d
slo-tracker service_name:api-gateway alert_thresholds:14.4,6.0
/slo service:payments --since 7d
```
