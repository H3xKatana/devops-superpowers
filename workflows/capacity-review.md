# Workflow: Capacity Review

## Overview

Capacity planning analysis to ensure infrastructure meets current and projected demand.

## Steps

### Step 1: Collect Current Utilization

```
/inspect service:$SERVICE --env prod
/inspect cluster:$CLUSTER --env prod
```

**Actions:**
- Gather current resource utilization
- CPU, memory, storage metrics
- Request vs limit ratios
- Pod/instance counts
- Queue depths (if applicable)

---

### Step 2: Historical Analysis

```
/capacity service:$SERVICE --since 90d
```

**Actions:**
- Analyze historical trends
- Identify growth patterns
- Calculate peak vs average
- Review seasonality

---

### Step 3: Project Future Demand

**Inputs:**
- Current utilization
- Historical growth rate
- Business projections
- Planned launches/feature releases

**Outputs:**
- 3-month projection
- 6-month projection
- 12-month projection

---

### Step 4: Cost Analysis

```
/cost --service $SERVICE --since 30d
```

**Actions:**
- Calculate current cost
- Project cost at projected capacity
- Compare vs budget

---

### Step 5: Recommendations

**Output:** Capacity report with:

- Recommended scaling actions
- Cost optimization opportunities
- Architecture changes needed
- Risk assessment

## Capacity Thresholds

| Metric | Warning | Critical |
|---|---|---|
| CPU utilization (avg) | > 70% | > 85% |
| Memory utilization (avg) | > 75% | > 90% |
| Disk utilization | > 80% | > 95% |
| Request success rate | < 99.5% | < 99% |
| p99 latency | > 500ms | > 1000ms |

## Scaling Strategies

| Strategy | Use Case |
|---|---|
| Horizontal (replicas) | Stateless services |
| Vertical (size) | StateDatabase |
| Autoscaling | Variable load |
| Pre-scaling | Known spikes |
| Architectural change | Sustained growth |

## Output Format

```yaml
capacity_report:
  service: payments
  current:
    replicas: 10
    cpu_avg: 65%
    memory_avg: 72%
  projection_6m:
    replicas: 18
    cpu_avg: 70%
  recommendations:
    - action: increase HPA max
      reason: approaching limit
      effort: low
    - action: reserved instances
      reason: cost savings
      effort: medium
```
