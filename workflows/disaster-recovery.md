# Workflow: Disaster Recovery

**Reference:** SPEC Section 8.3

## Overview

DR test workflow to validate recovery procedures and measure actual RTO/RPO vs targets.

## Parameters

| Parameter | Description |
|---|---|
| `--rpo` | Recovery Point Objective (target data loss, e.g., 4h) |
| `--rto` | Recovery Time Objective (target recovery time, e.g., 1h) |
| `--scope` | Full or partial (database, application, network) |

---

## Steps

### Step 1: Pre-Test Snapshot

```
/inspect --scope full --env prod
```

**Actions:**
- Capture full infrastructure snapshot
- Document current state:
  - All services running
  - Data replication status
  - Active connections
  - Current RPO/RTO baselines

**Outputs:**
- Infrastructure topology diagram
- Service dependency map
- Current backup status

---

### Step 2: DR Runbook Generation

```
/architect dr-plan --rpo 4h --rto 1h
```

**Actions:**
- Generate or validate DR runbook
- Review existing runbook accuracy
- Identify gaps in procedures
- Update contact lists

**Outputs:**
- DR runbook (markdown)
- Escalation contacts
- Recovery procedures

---

### Step 3: DR Test Execution

**Types of DR Tests:**

| Type | Impact | Frequency |
|---|---|---|
| Tabletop | None | Monthly |
| Walk-through | None | Quarterly |
| Partial failover | Some traffic | Quarterly |
| Full failover | Full production | Annually |

**Test Actions (non-production impact):**
- Failover to secondary region (staging simulation)
- Test database replication
- Validate backup restoration
- Verify DNS failover

---

### Step 4: Measure RTO/RPO

**Collect metrics:**
- Actual time to detect failure
- Time to initiate recovery
- Time to restore services
- Data loss measured (RPO)

**Compare to targets:**
- Actual RTO vs target RTO
- Actual RPO vs target RPO

---

### Step 5: Document Results

```
/document dr-test results:$RESULTS
```

**Actions:**
- Update DR runbook with test outcomes
- Record lessons learned
- Document any failures
- Create action items for improvements

---

## DR Test Checklist

- [ ] Notify stakeholders of test window
- [ ] Verify backup integrity
- [ ] Confirm secondary region ready
- [ ] Test notification systems
- [ ] Validate monitoring alerts trigger
- [ ] Verify DNS failover works
- [ ] Test database replication
- [ ] Validate application connectivity
- [ ] Confirm data consistency
- [ ] Document all findings

## Common Issues

| Issue | Mitigation |
|---|---|
| DNS failover not working | Test DNS TTL values |
| Database replication lag | Increase replication frequency |
| Application cold start too slow | Pre-warm instances |
| Data inconsistency | Implement checksums |
| Team unfamiliar with procedures | More frequent drills |
