# Critical Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix critical security and documentation issues identified in the Beta v0.1 audit

**Architecture:** Minimal fixes to address readonly agent credential over-privilege and documentation accuracy without major refactoring

**Tech Stack:** Markdown files, YAML configuration

---

## Task 1: Fix Inspector Agent Readonly Credentials

**Files:**
- Modify: `agents/core/inspector.md`

**Step 1: Read current file to find vault keys section**

Run: `cat agents/core/inspector.md`
Find the "Required Vault Keys" section

**Step 2: Add readonly flag to kubernetes cluster entries**

Modify the Required Vault Keys section to add readonly annotations:

```markdown
## Required Vault Keys
- vault.cloud.aws.account_id
- vault.cloud.aws.region
- vault.kubernetes.clusters[].kubeconfig        # readonly: true
- vault.kubernetes.clusters[].context            # readonly: true
- vault.vcs.github.token                         # readonly: true
- vault.observability.prometheus.url              # readonly: true
- vault.observability.datadog.api_key             # readonly: true
- vault.observability.grafana.url                 # readonly: true
```

**Step 3: Verify edit**

Run: `grep -A 10 "Required Vault Keys" agents/core/inspector.md`

**Step 4: Commit**

```bash
git add agents/core/inspector.md
git commit -m "fix: add readonly annotations to Inspector vault keys"
```

---

## Task 2: Fix SRE Advisor Agent Readonly Note

**Files:**
- Modify: `agents/core/sre-advisor.md`

**Step 1: Read current file**

Run: `cat agents/core/sre-advisor.md`

**Step 2: Add readonly note to Required Vault Keys section**

Modify to include read-only scope note:

```markdown
## Required Vault Keys
- vault.observability.prometheus.url              # readonly: true
- vault.observability.datadog.api_key             # readonly: true - read access only
- vault.observability.datadog.app_key             # readonly: true - read access only
- vault.observability.grafana.url                 # readonly: true
- vault.observability.grafana.token               # readonly: true
```

**Step 3: Add constraint about read-only access**

In Constraints section, add:
```markdown
- ONLY access metrics and dashboards for reading - never modify alerts or SLOs
```

**Step 4: Commit**

```bash
git add agents/core/sre-advisor.md
git commit -m "fix: add readonly annotations to SRE Advisor vault keys"
```

---

## Task 3: Fix CHANGELOG - Mark Implemented Items as DONE

**Files:**
- Modify: `CHANGELOG.md`

**Step 1: Read current CHANGELOG**

Run: `cat CHANGELOG.md`

**Step 2: Update Beta v0.1 section to include all implemented items**

Find the "Beta v0.1 — Foundation" section and add the implemented items:

```markdown
## Beta v0.1 — Foundation

### Added

- **Vault Schema** — Complete vault schema definition (`vault/inventory.yaml.example`)
- **Inspector Agent** — Read-only exploration agent for safe infrastructure discovery
- **Operator Agent** — Day-to-day operational tasks with confirmation workflow
- **Deployer Agent** — Full deployment lifecycle with canary and blue-green strategies
- **Incident Commander Agent** — Incident response coordination from detection to postmortem
- **SRE Advisor Agent** — Basic SLO tracking and error budget monitoring
- **Architect Agent** — Architecture design and ADR generation
- **Doc Writer Agent** — Runbooks, postmortems, and documentation generation

### Added (Observability & Documentation)

- **Observability Skills:** slo-tracker, alert-analyzer, log-investigator, trace-analyzer
- **Documentation Skills:** runbook-generator, adr-writer, postmortem-writer, diagram-generator
- **Security Skills:** secret-scanner, cve-checker, compliance-auditor, iam-reviewer

### Added (Commands)

- Core Slash Commands: /inspect, /deploy, /rollback, /incident, /slo
- Additional Commands: /audit, /plan, /document, /cost, /drift, /canary, /runbook, /postmortem, /capacity, /cve, /iam

### Added (Workflows)

- Zero-Downtime Deployment Workflow
- Incident Response Workflow
- Disaster Recovery Workflow
- Capacity Review Workflow
- New Engineer Onboarding Workflow
```

**Step 3: Update Upcoming Releases section**

Remove Architect, Doc Writer, and security skills from upcoming (they're done):

```markdown
## Upcoming Releases

### Beta v0.2 — Observability & Documentation

- [ ] DORA metrics dashboard
- [ ] Toil registry schema
- [ ] Error budget automation

### v0.3 — Security & Compliance

- [ ] Audit log framework
- [ ] Policy-as-code (OPA) integration

### v1.0 — Production-Ready

- [ ] Full test suite for all skills
- [ ] Multi-cloud support (AWS + GCP + Azure)
- [ ] Agent marketplace (community agents)
- [ ] Web UI for Vault management
- [ ] SSO integration
- [ ] Full documentation site
```

**Step 4: Commit**

```bash
git add CHANGELOG.md
git commit -m "fix: update CHANGELOG with all implemented items marked as DONE"
```

---

## Task 4: Create vault/CHANGELOG.md

**Files:**
- Create: `vault/CHANGELOG.md`

**Step 1: Create the file**

```markdown
# Vault Changelog

All notable changes to the Vault schema are documented here.

---

## 2025-01-01 — Initial Schema

### Added

- Initial vault schema definition
- Cloud provider credentials (AWS, GCP, Azure)
- Kubernetes cluster configurations
- Source control (GitHub, GitLab)
- CI/CD (Jenkins, ArgoCD)
- Observability (Datadog, PagerDuty, Grafana, Prometheus)
- Infrastructure (Terraform, HashiCorp Vault)
- SSH keys and bastion hosts
- Database connections (PostgreSQL, Redis)
- Messaging (Kafka)
- Communication (Slack, PagerDuty webhooks)
```

**Step 2: Commit**

```bash
git add vault/CHANGELOG.md
git commit -m "fix: add vault/CHANGELOG.md as referenced in spec"
```

---

## Task 5: Add Rotation Policy Comments to inventory.yaml.example

**Files:**
- Modify: `vault/inventory.yaml.example`

**Step 1: Read current file**

Run: `cat vault/inventory.yaml.example`

**Step 2: Add rotation policy comments to key entries**

Add inline comments for rotation policies:

```yaml
# ─── Cloud Providers ────────────────────────────────────────────
cloud:
  aws:
    account_id: "${AWS_ACCOUNT_ID}"
    region: us-east-1
    access_key_id: "${AWS_ACCESS_KEY_ID}"      # ROTATION: 90 days
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}" # ROTATION: 90 days
    role_arn: "${AWS_ROLE_ARN}"
    profile: default
```

Continue adding rotation comments to:
- GitHub token: ROTATION: 30 days (personal), 90 days (machine)
- Jenkins token: ROTATION: 90 days
- ArgoCD token: ROTATION: 90 days
- Datadog API key: ROTATION: 90 days
- PagerDuty API key: ROTATION: 90 days
- Grafana token: ROTATION: 90 days
- Database passwords: ROTATION: 30 days
- Kafka passwords: ROTATION: 30 days
- Slack token: ROTATION: 90 days

**Step 3: Commit**

```bash
git add vault/inventory.yaml.example
git commit -m "fix: add rotation policy comments to vault schema"
```

---

## Summary

| Task | Files Changed | Commit |
|------|--------------|--------|
| 1. Inspector readonly | 1 | 1 |
| 2. SRE Advisor readonly | 1 | 1 |
| 3. CHANGELOG fix | 1 | 1 |
| 4. vault/CHANGELOG | 1 | 1 |
| 5. Rotation policies | 1 | 1 |

**Total: 5 files modified, 5 commits**

---

## Plan complete

**Two execution options:**

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

2. **Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

Which approach?
