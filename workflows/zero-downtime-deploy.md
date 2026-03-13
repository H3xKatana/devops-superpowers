# Workflow: Zero-Downtime Deployment

**Reference:** SPEC Section 8.1

## Overview

8-step deployment workflow with canary gates, SLO verification, and automatic rollback.

## Prerequisites

- [ ] Change freeze check (no deploys during freeze windows)
- [ ] SLO baseline captured (before state)
- [ ] Rollback plan documented
- [ ] Smoke test suite available
- [ ] On-call notified
- [ ] Canary traffic percentage confirmed
- [ ] Blast radius analysis complete

---

## Steps

### Step 1: Pre-Deploy Inspection

```
/inspect service:$SERVICE --env $ENV
```

**Actions:**
- Capture baseline metrics
- Check current SLO status
- Verify no active incidents
- Check error budget remaining

**ABORT if:**
- Active SEV1/SEV2 incident
- Change freeze in effect
- Error budget < 5%

---

### Step 2: Drift Detection

```
/drift --env $ENV --service $SERVICE
```

**Actions:**
- Verify no unexpected drift before deploying
- Check Terraform state vs live infrastructure
- Identify any unmanaged changes

**ABORT if:**
- Critical drift detected
- Unapproved configuration changes

---

### Step 3: Dry Run

```
/deploy service:$SERVICE image:$NEW_TAG --env $ENV --strategy canary --dry-run
```

**Actions:**
- Engineer reviews full plan and diff
- Preview Kubernetes/ Helm changes
- Validate image exists
- Check resource requirements

---

### Step 4: Engineer Approval

**[CONFIRM]** - Engineer approves deployment

**Required for production:**
- Review all changes
- Verify rollback plan
- Confirm on-call aware

---

### Step 5: Canary Deployment

```
/deploy service:$SERVICE image:$NEW_TAG --env $ENV --strategy canary --canary-pct 5
```

**Actions:**
- Deploy 5% canary
- Monitor for 10 min:
  - Error rate
  - p99 latency
  - Saturation metrics

---

### Step 6: Auto-Gate Metrics

**[AUTO-GATE]** - Metrics within SLO baseline?

**YES - Promote:**
- 5% → 25% (monitor 10 min)
- 25% → 50% (monitor 10 min)
- 50% → 100% (monitor 10 min)

**NO - Rollback:**
```
/rollback service:$SERVICE --env $ENV
```

**Rollback triggers:**
- Error rate > baseline × 1.5
- p99 latency > 2× baseline
- Saturation > 90%
- Any SEV2+ alert

---

### Step 7: Post-Deploy Verification

```
/inspect service:$SERVICE --env $ENV
```

**Actions:**
- Verify post-deploy health
- Confirm all pods running
- Validate SLO still within target
- Check error rates normalized

---

### Step 8: Documentation

```
/document changelog service:$SERVICE version:$NEW_TAG
```

**Actions:**
- Update changelog automatically
- Record deployment time
- Document any issues encountered
- Notify team of completion

---

## Rollback Plan

| Scenario | Action |
|---|---|
| Canary metrics failing | Automatic rollback to previous |
| Post-deploy issues | Manual `/rollback` command |
| SLO breach | Automatic rollback + page on-call |
| Customer impact | Emergency `/rollback` + incident |
