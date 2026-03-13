# Skill: alert-analyzer

## Purpose
Analyzes firing alerts for patterns, duplicates, and noise. Correlates related alerts, identifies root causes, and suggests runbook improvements based on alert history.

## Inputs
- `alert_source`: datadog | pagerduty | alertmanager
- `time_range`: Time window to analyze (e.g., "24h", "7d")
- `filter`: Optional alert filters (severity, service, team)
- `include_resolved`: Include resolved alerts in pattern analysis

## Outputs
- Alert analysis report with:
  - Total alerts by severity
  - Duplicate alert groups (alerts firing for same root cause)
  - Noise alerts (frequently firing, low impact)
  - Pattern detection (alerts that often fire together)
  - Runbook gap analysis (alerts without runbooks)
  - Recommendations for alert tuning

## Tools Used
- `datadog-api`: Query Datadog monitors and alerts
- `pagerduty-api`: Query PagerDuty incidents and alerts
- `alertmanager-api`: Query Prometheus Alertmanager
- `kubectl`: Read alert configurations

## Read-Only
Yes. This skill only reads and analyzes alert data. No alerts are modified or silenced.

## Example Invocations
```
alert-analyzer alert_source:pagerduty time_range:7d
alert-analyzer alert_source:datadog filter:severity:critical
alert-analyzer alert_source:alertmanager time_range:24h include_resolved:true
```
