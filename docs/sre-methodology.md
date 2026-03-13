# SRE Methodology

DevOps Superpowers is grounded in Google SRE methodology. Every agent and workflow enforces SRE principles: SLOs, error budgets, toil reduction, and DORA metrics.

## SLO Framework

### Service Level Objectives

Every service must define SLOs in the following format:

```yaml
# slo.yaml (per service)
service: payments
slos:
  - name: availability
    description: "Payment API availability"
    target: 99.95%
    window: rolling_30d
    sli:
      type: request_success_rate
      metric: "sum(rate(http_requests_total{service='payments',code!~'5..'}[5m])) / sum(rate(http_requests_total{service='payments'}[5m]))"
    error_budget:
      total_minutes: 21.9
      alert_burn_rate_1h: 14.4
      alert_burn_rate_6h: 6.0

  - name: latency
    description: "P99 latency < 500ms"
    target: 99.0%
    window: rolling_30d
    sli:
      type: latency_percentile
      percentile: 99
      threshold_ms: 500
```

### SLO Definition Components

| Component | Description |
|-----------|-------------|
| **name** | Unique identifier for the SLO |
| **description** | Human-readable description |
| **target** | Availability target (e.g., 99.95%) |
| **window** | Rolling time window (7d, 30d, calendar month) |
| **SLI** | Service Level Indicator — the actual metric |
| **error_budget** | Allowed failure time within window |

### SLI Types

- **request_success_rate:** Ratio of successful requests to total requests
- **latency_percentile:** Percentage of requests below threshold
- **availability:** Uptime percentage
- **throughput:** Requests per second capacity

### Querying SLOs

```bash
/slo service:payments --since 7d
/slo service:api-gateway --output table
```

## Error Budget Policy

The error budget determines what operations are permitted based on remaining reliability margin.

### Budget Thresholds

| Budget Remaining | Policy | Actions Permitted |
|-------------------|--------|-------------------|
| > 50% | **Normal** | All deployments permitted |
| 25–50% | **Elevated Caution** | Require `/inspect` before every deploy |
| 10–25% | **Deploy Freeze** | Non-critical changes blocked. SRE Advisor produces remediation plan |
| < 10% | **Critical Freeze** | Only reliability work permitted. Incident Commander on standby |
| 0% | **Emergency Mode** | No new features. All hands on reliability |

### Error Budget Burn Rate Alerts

The system alerts at multiple burn rates:

| Burn Rate | Time to Consume Budget | Alert Threshold |
|-----------|------------------------|------------------|
| 14.4x | 1 hour | Critical — immediate action |
| 6.0x | 6 hours | High — investigate soon |
| 3.0x | 12 hours | Medium — schedule review |
| 1.0x | 30 days | Normal — no action needed |

### Enforcing Error Budgets

The Deployer agent automatically checks error budget status before any deployment:

```bash
/deploy service:payments image:v2.1.0 --env prod
# → CHECKS: Error budget = 45%
# → RESULT: Proceed with elevated caution
# → ACTION: Run /inspect before proceeding
```

## Toil Reduction

### What is Toil?

Toil is manual, repetitive, automateable work that tends to be tactical and doesn't provide lasting value.

### Toil Registry

Track toil in `toil-registry.yaml`:

```yaml
toil:
  - id: TOIL-001
    description: "Manual certificate renewal every 90 days"
    time_per_occurrence: 45min
    frequency: quarterly
    annual_cost_hours: 3
    automation_candidate: cert-manager
    status: in-progress

  - id: TOIL-002
    description: "Manual PagerDuty alert triage during low-signal periods"
    time_per_occurrence: 30min
    frequency: weekly
    annual_cost_hours: 26
    automation_candidate: alert-classifier skill
    status: planned
```

### Identifying Toil

The SRE Advisor agent continuously identifies toil opportunities:

```bash
/capacity service:payments --analysis toil
# → Output: Top-3 toil reduction opportunities
```

### Toil Categories

| Category | Examples | Automation Approach |
|----------|----------|---------------------|
| **Rotations** | Certificates, credentials | cert-manager, secret rotation |
| **Triage** | Alert investigation | Alert classifiers, runbooks |
| **Deployments** | Manual promotion | GitOps, automated pipelines |
| **Provisioning** | Resource creation | Terraform, self-service |
| **Reporting** | Metrics compilation | Automated dashboards |

### Toil Reduction Workflow

```
1. SRE Advisor identifies toil
   → Add to toil-registry.yaml

2. Estimate automation effort
   → time_saved × frequency vs. implementation_cost

3. Prioritize backlog
   → Highest ROI first

4. Implement automation
   → Use existing skills or create new

5. Measure improvement
   → Track reduction in toil hours
```

## DORA Metrics

The SRE Advisor tracks the four DORA (DevOps Research and Assessment) metrics:

### Metrics Overview

| Metric | Elite Performance | High | Medium | Low |
|--------|------------------|------|--------|-----|
| **Deployment Frequency** | On-demand (multiple/day) | Weekly to monthly | Monthly to every 6 months | Less than once per 6 months |
| **Lead Time for Changes** | < 1 hour | 1 day to 1 week | 1–6 months | > 6 months |
| **Change Failure Rate** | < 5% | 5–10% | 10–15% | > 15% |
| **Time to Restore (MTTR)** | < 1 hour | < 1 day | 1 day to 1 week | > 6 months |

### Tracking DORA Metrics

#### Deployment Frequency

```bash
/slo deployment-frequency --env prod --since 30d
```

- **Source:** Deployer Agent logs, CI/CD pipeline runs
- **Target:** Multiple deploys per day (Elite)

#### Lead Time for Changes

```bash
/slo lead-time --env prod --since 30d
```

- **Source:** GitHub PR merge time + CI/CD duration
- **Target:** < 1 hour (Elite)

#### Change Failure Rate

```bash
/slo change-failure-rate --env prod --since 30d
```

- **Source:** Rollback rate / total deploys
- **Target:** < 5% (Elite)

#### Time to Restore Service

```bash
/slo mttr --env prod --since 30d
```

- **Source:** Incident Commander timeline
- **Target:** < 1 hour (Elite)

### DORA Dashboard

Generate a DORA metrics dashboard:

```bash
/slo dashboard --env prod --output grafana
```

The dashboard displays:
- Current metric values vs. targets
- Trend graphs (30/60/90 days)
- Quarter-over-quarter comparison
- Reliability recommendations

## Incident Response Integration

### SLA Targets per Severity

| SEV | Time to Acknowledge | Time to Mitigate | Postmortem Due |
|-----|---------------------|-------------------|----------------|
| SEV1 | 5 min | 30 min | 24 hours |
| SEV2 | 15 min | 2 hours | 48 hours |
| SEV3 | 1 hour | 8 hours | 1 week |
| SEV4 | 4 hours | Next sprint | Optional |

### Incident Workflow

```bash
# Declare incident
/incident declare sev:1 title:"Payment API down"

# Automatic actions:
# - War room created (Slack)
# - On-call paged
# - Status page updated

# During incident:
/logs service:payments --since 5m
/inspect service:payments --env prod

# Resolve
/incident resolve INC-2024-042

# Generate postmortem
/postmortem incident:INC-2024-042
```

### Post-Incident Review

All incidents trigger:
1. Timeline generation from logs/metrics
2. Blameless postmortem document
3. Action items tracked in backlog
4. SRE Advisor updates DORA metrics

## Quarterly Reliability Review

The SRE Advisor generates quarterly reports:

```bash
/slo quarterly-report --quarter Q1-2025
```

Report includes:
- SLO compliance per service
- Error budget consumption trends
- Toil reduction progress
- DORA metrics evolution
- Top reliability risks
- Recommendations backlog
