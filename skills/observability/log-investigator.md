# Skill: log-investigator

## Purpose
Searches and correlates logs across multiple services for a given time window. Identifies anomalies, builds structured timelines, and extracts relevant log snippets for incident investigation.

## Inputs
- `time_range`: Start and end time (e.g., "2024-01-15T14:00:00Z to 2024-01-15T14:30:00Z")
- `services`: Comma-separated list of services to search
- `error_patterns`: Optional regex patterns to search for (e.g., "Error|Exception|Failed")
- `log_source`: datadog | splunk | elasticsearch | cloudwatch | loki

## Outputs
- Log investigation report with:
  - Structured timeline of events
  - Error frequency over time
  - Anomaly highlights (unusual patterns, spikes)
  - Relevant log snippets (with sensitive data masked)
  - Cross-service correlation (errors that occurred together)
  - Suggested next steps for investigation

## Tools Used
- `datadog-api`: Search Datadog logs
- `splunk`: Search Splunk logs
- `elasticsearch`: Query Elasticsearch/Opensearch
- `aws-logs`: Query CloudWatch logs
- `loki`: Query Grafana Loki

## Read-Only
Yes. This skill only searches and reads logs. No log data is modified.

## Example Invocations
```
log-investigator time_range:"2024-01-15T14:00:00Z to 2024-01-15T14:30:00Z" services:api-gateway,payments
log-investigator time_range:1h services:payments error_patterns:"5\\d{2}"
log-investigator time_range:30m services:api-gateway log_source:datadog
/logs service:payments --since 30m
```
