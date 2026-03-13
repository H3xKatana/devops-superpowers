# Workflow: Incident Response

**Reference:** SPEC Section 8.2

## Overview

Multi-step incident response workflow spanning detection through postmortem.

## Steps

### Step 1: Detect and Declare

```
Alert fires → /incident declare sev:$SEV title:"$TITLE"
```

**Actions:**
- War room created (Slack channel + PagerDuty incident)
- On-call paged
- Status page updated
- Timeline started

**ABORT if:** Invalid alert (false positive) - resolve without incident

---

### Step 2: Context Collection

```
/logs service:$AFFECTED --since $INCIDENT_START --until now
/inspect service:$AFFECTED --env prod
```

**Actions:**
- Rapid context collection
- Gather relevant logs
- Inspect current service state
- Query metrics for affected time window

---

### Step 3: Timeline Assembly

**Incident Commander Agent assembles timeline:**

- Recent deploys
- Config changes
- Metric anomalies
- Correlated alerts
- External dependencies

---

### Step 4: Mitigation

**Actions:**
- Mitigation options presented to Incident Commander
- Engineer selects action
- Execute mitigation:
  - `/rollback` if deploy-related
  - `/operator scale` if capacity issue
  - `/feature-flag disable` if feature causing issues
  - Manual intervention if needed

---

### Step 5: Resolution

```
/inspect service:$AFFECTED --env prod
/incident resolve INC-$ID
```

**Verification:**
- Health checks green
- Error rates normalized
- Latency within SLO
- Customer impact resolved

---

### Step 6: Postmortem

```
/postmortem incident:INC-$ID
```

**Actions:**
- Auto-populated from timeline
- Engineer reviews and fills gaps
- Action items tracked in backlog
- Publish to team documentation

---

## Severity Reference

| SEV | Time to Acknowledge | Time to Mitigate | Postmortem Due |
|---|---|---|---|
| SEV1 | 5 min | 30 min | 24 hours |
| SEV2 | 15 min | 2 hours | 48 hours |
| SEV3 | 1 hour | 8 hours | 1 week |
| SEV4 | 4 hours | Next sprint | Optional |

## Error Budget Impact

- Document SLO breach during incident
- Calculate error budget consumed
- Include in postmortem
- Plan remediation if budget critical
