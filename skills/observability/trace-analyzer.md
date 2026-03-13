# Skill: trace-analyzer

## Purpose
Analyzes distributed traces to identify latency bottlenecks, error propagation, and dependency issues. Provides flame graph summaries and identifies the slowest spans in request paths.

## Inputs
- `service`: Primary service to analyze
- `time_range`: Time window for trace analysis
- `percentile`: Latency percentile to focus on (e.g., p50, p95, p99)
- `threshold_ms`: Latency threshold in milliseconds
- `trace_backend`: jaeger | datadog | zipkin | honeycomb

## Outputs
- Trace analysis report with:
  - Flame graph summary of slowest paths
  - Top 10 slowest spans with service and duration
  - Error propagation analysis (how errors cascade)
  - Dependency analysis (slowest downstream services)
  - Recommendations for optimization

## Tools Used
- `jaeger-api`: Query Jaeger traces
- `datadog-api`: Query Datadog APM traces
- `zipkin-api`: Query Zipkin traces
- `honeycomb-api`: Query Honeycomb traces

## Read-Only
Yes. This skill only reads trace data from the tracing backend. No traces or configurations are modified.

## Example Invocations
```
trace-analyzer service:payments time_range:1h percentile:p99 threshold_ms:500
trace-analyzer service:api-gateway time_range:24h percentile:p95
trace-analyzer service:checkout trace_backend:datadog
```
