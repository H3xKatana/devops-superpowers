# Workflow: New Engineer Onboarding

**Reference:** SPEC Section 8.4

## Overview

Onboarding workflow to get new engineers productive quickly with personalized guides and access verification.

## Parameters

| Parameter | Description |
|---|---|
| `--engineer` | New engineer name |
| `--team` | Team they are joining |
| `--env` | Environments they will access |

---

## Steps

### Step 1: Infrastructure Overview

```
/inspect --scope full --env all
```

**Actions:**
- Produce infrastructure overview for new engineer
- Document:
  - All services and their owners
  - Cluster topology
  - Environment structure (prod, staging, dev)
  - CI/CD pipelines
  - Monitoring and alerting systems

**Output:** Infrastructure topology diagram

---

### Step 2: Team Onboarding Guide

```
/document onboarding --engineer $NAME --team $TEAM
```

**Actions:**
- Generate personalized guide:
  - Services owned by team
  - Team runbooks
  - Alert response guide
  - Key contacts (on-call, PM, tech lead)
  - Development workflow
  - Code review process
  - Deployment process

**Output:** Markdown onboarding document

---

### Step 3: Access Verification

```
/audit iam user:$NEW_ENGINEER
```

**Actions:**
- Verify least-privilege access provisioned correctly
- Check:
  - GitHub team membership
  - Cloud account access (AWS/GCP/Azure)
  - Kubernetes cluster access
  - CI/CD system access
  - Monitoring tool access
  - Communication tool access (Slack, etc.)

---

### Step 4: Development Environment Setup

**Actions:**
- Verify local tooling access
- Guide through:
  - Clone relevant repositories
  - Configure local environment
  - Set up kubectl context
  - Configure IDE
  - Access secrets/vault

---

### Step 5: First Change Process

**Actions:**
- Pair with mentor on first change
- Walk through:
  - Creating feature branch
  - Running tests locally
  - Opening PR
  - Code review process
  - Merging and deployment

---

### Step 6: Shadow Period

**Recommended:** 1-2 week shadow period

**Actions:**
- Shadow on-call rotations
- Attend incident response
- Review recent postmortems
- Complete runbook walkthroughs

---

## Onboarding Checklist

### Access (Week 1)

- [ ] GitHub account + team membership
- [ ] AWS/GCP/Azure console access
- [ ] kubectl configured
- [ ] VPN access
- [ ] Slack channels joined
- [ ] PagerDuty access (read-only initially)
- [ ] Grafana/Datadog dashboards

### Learning (Week 1-2)

- [ ] Architecture overview complete
- [ ] Team services documented
- [ ] Runbooks reviewed
- [ ] Recent incidents reviewed
- [ ] Codebase walkthrough

### Doing (Week 2-4)

- [ ] First PR merged
- [ ] Deployment performed
- [ ] On-call shadowed
- [ ] Incident responded (as observer)

## Key Contacts Template

| Role | Name | Slack | PagerDuty |
|---|---|---|---|
| Tech Lead | @username | #channel | Schedule |
| Product Manager | @username | #channel | - |
| On-call | rotation | #oncall | Schedule |
| Team Slack | - | #team-channel | - |
