# DevOps Superpowers Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a complete DevOps Superpowers agentic AI ecosystem for DevOps and SREs with agents, skills, slash commands, and workflows.

**Architecture:** This is a documentation/definition project that creates an agentic framework. All components are defined as Markdown files with YAML schemas. The system will be usable by AI assistants to perform DevOps operations.

**Tech Stack:** Markdown, YAML, Mermaid diagrams

---

## Phase 1: Project Foundation

### Task 1: Create directory structure

**Files:**
- Create: `.superpowers/imports.yaml`
- Create: `vault/schema.md`
- Create: `vault/inventory.yaml.example`
- Create: `vault/README.md`
- Create: `agents/core/inspector.md`
- Create: `agents/core/operator.md`
- Create: `agents/core/deployer.md`
- Create: `agents/core/incident-commander.md`
- Create: `agents/core/sre-advisor.md`
- Create: `agents/core/architect.md`
- Create: `agents/core/doc-writer.md`
- Create: `agents/custom/template.md`
- Create: `agents/README.md`
- Create: `skills/infrastructure/topology-mapper.md`
- Create: `skills/infrastructure/drift-detector.md`
- Create: `skills/infrastructure/capacity-planner.md`
- Create: `skills/infrastructure/cost-analyzer.md`
- Create: `skills/deployments/canary-deploy.md`
- Create: `skills/deployments/blue-green.md`
- Create: `skills/deployments/rollback.md`
- Create: `skills/deployments/feature-flags.md`
- Create: `skills/observability/slo-tracker.md`
- Create: `skills/observability/alert-analyzer.md`
- Create: `skills/observability/log-investigator.md`
- Create: `skills/observability/trace-analyzer.md`
- Create: `skills/security/secret-scanner.md`
- Create: `skills/security/cve-checker.md`
- Create: `skills/security/compliance-auditor.md`
- Create: `skills/security/iam-reviewer.md`
- Create: `skills/documentation/runbook-generator.md`
- Create: `skills/documentation/adr-writer.md`
- Create: `skills/documentation/postmortem-writer.md`
- Create: `skills/documentation/diagram-generator.md`
- Create: `skills/README.md`
- Create: `commands/inspect.md`
- Create: `commands/deploy.md`
- Create: `commands/rollback.md`
- Create: `commands/incident.md`
- Create: `commands/slo.md`
- Create: `commands/audit.md`
- Create: `commands/plan.md`
- Create: `commands/document.md`
- Create: `commands/cost.md`
- Create: `commands/README.md`
- Create: `workflows/incident-response.md`
- Create: `workflows/zero-downtime-deploy.md`
- Create: `workflows/disaster-recovery.md`
- Create: `workflows/capacity-review.md`
- Create: `workflows/onboarding.md`
- Create: `docs/getting-started.md`
- Create: `docs/vault-setup.md`
- Create: `docs/sre-methodology.md`
- Create: `docs/architecture.md`

**Step 1: Create directory structure with all folders**

```bash
mkdir -p .superpowers vault agents/core agents/custom skills/infrastructure skills/deployments skills/observability skills/security skills/documentation commands workflows docs
```

**Step 2: Create imports.yaml**

```yaml
# .superpowers/imports.yaml
imports:
  - name: github-cli
    source: superpowers/github-cli
    version: latest
    reason: "Full GitHub CLI integration — gh commands for PRs, issues, workflows"

  - name: kubectl
    source: superpowers/kubectl
    version: latest
    reason: "Kubernetes CLI operations"

  - name: terraform
    source: superpowers/terraform
    version: latest
    reason: "Terraform plan/apply/state operations"

  - name: helm
    source: superpowers/helm
    version: latest
    reason: "Helm chart management"

  - name: aws-cli
    source: superpowers/aws-cli
    version: latest
    reason: "AWS CLI operations"

  - name: docker
    source: superpowers/docker
    version: latest
    reason: "Container build and push operations"

  - name: datadog
    source: superpowers/datadog
    version: latest
    reason: "Datadog metrics and monitors API"

  - name: pagerduty
    source: superpowers/pagerduty
    version: latest
    reason: "Incident management and on-call API"

  - name: slack
    source: superpowers/slack
    version: latest
    reason: "Slack messaging and channel management"

  - name: jira
    source: superpowers/jira
    version: latest
    reason: "Issue tracking for postmortem action items"
    optional: true

  - name: argocd
    source: superpowers/argocd
    version: latest
    reason: "GitOps deployment management"
    optional: true
```

**Step 3: Create vault files**

Create `vault/schema.md`, `vault/inventory.yaml.example`, `vault/README.md` with content from SPEC.md sections 4.1 and 4.2.

**Step 4: Commit**

```bash
git init && git add . && git commit -m "feat: project foundation and directory structure"
```

---

### Task 2: Create Core Agents

**Files:**
- Modify: `agents/core/inspector.md`
- Modify: `agents/core/operator.md`
- Modify: `agents/core/deployer.md`
- Modify: `agents/core/incident-commander.md`
- Modify: `agents/core/sre-advisor.md`
- Modify: `agents/core/architect.md`
- Modify: `agents/core/doc-writer.md`

**Step 1: Create Inspector Agent**

Write the complete inspector.md based on SPEC.md section 5.1 with:
- Privilege: readonly
- Purpose, capabilities, context collected
- Example invocations
- All sections from the spec

**Step 2: Create Operator Agent**

Write complete operator.md based on SPEC.md section 5.2

**Step 3: Create Deployer Agent**

Write complete deployer.md based on SPEC.md section 5.3 with deployment checklist

**Step 4: Create Incident Commander Agent**

Write complete incident-commander.md based on SPEC.md section 5.4 with:
- SLA targets per severity table
- Incident response flow

**Step 5: Create SRE Advisor Agent**

Write complete sre-advisor.md based on SPEC.md section 5.5

**Step 6: Create Architect Agent**

Write complete architect.md based on SPEC.md section 5.6

**Step 7: Create Doc Writer Agent**

Write complete doc-writer.md based on SPEC.md section 5.7

**Step 8: Commit**

```bash
git add agents/core/ && git commit -m "feat: add all 7 core agents"
```

---

### Task 3: Create Skills

**Files:**
- Modify: `skills/infrastructure/topology-mapper.md`
- Modify: `skills/infrastructure/drift-detector.md`
- Modify: `skills/infrastructure/capacity-planner.md`
- Modify: `skills/infrastructure/cost-analyzer.md`
- Modify: `skills/deployments/canary-deploy.md`
- Modify: `skills/deployments/blue-green.md`
- Modify: `skills/deployments/rollback.md`
- Modify: `skills/deployments/feature-flags.md`
- Modify: `skills/observability/slo-tracker.md`
- Modify: `skills/observability/alert-analyzer.md`
- Modify: `skills/observability/log-investigator.md`
- Modify: `skills/observability/trace-analyzer.md`
- Modify: `skills/security/secret-scanner.md`
- Modify: `skills/security/cve-checker.md`
- Modify: `skills/security/compliance-auditor.md`
- Modify: `skills/security/iam-reviewer.md`
- Modify: `skills/documentation/runbook-generator.md`
- Modify: `skills/documentation/adr-writer.md`
- Modify: `skills/documentation/postmortem-writer.md`
- Modify: `skills/documentation/diagram-generator.md`

**Step 1: Create Infrastructure Skills**

Create all 4 infrastructure skills with inputs, outputs, tools used, and read-only status.

**Step 2: Create Deployment Skills**

Create all 4 deployment skills with SLO gates and rollback procedures.

**Step 3: Create Observability Skills**

Create all 4 observability skills for SLO tracking and analysis.

**Step 4: Create Security Skills**

Create all 4 security skills for scanning and compliance.

**Step 5: Create Documentation Skills**

Create all 4 documentation skills for runbooks, ADRs, and postmortems.

**Step 6: Commit**

```bash
git add skills/ && git commit -m "feat: add all 20 skills across 5 categories"
```

---

### Task 4: Create Slash Commands

**Files:**
- Modify: `commands/inspect.md`
- Modify: `commands/deploy.md`
- Modify: `commands/rollback.md`
- Modify: `commands/incident.md`
- Modify: `commands/slo.md`
- Modify: `commands/audit.md`
- Modify: `commands/plan.md`
- Modify: `commands/document.md`
- Modify: `commands/cost.md`

**Step 1: Create core commands**

Each command file should include:
- Syntax
- Flags (--env, --service, --dry-run, --confirm, --output, --since, --until, --verbose)
- Examples
- Agent mapping

**Step 2: Commit**

```bash
git add commands/ && git commit -m "feat: add all slash commands"
```

---

### Task 5: Create Workflows

**Files:**
- Modify: `workflows/incident-response.md`
- Modify: `workflows/zero-downtime-deploy.md`
- Modify: `workflows/disaster-recovery.md`
- Modify: `workflows/capacity-review.md`
- Modify: `workflows/onboarding.md`

**Step 1: Create Zero-Downtime Deploy Workflow**

Document the 8-step workflow from SPEC.md section 8.1

**Step 2: Create Incident Response Workflow**

Document the 6-step workflow from SPEC.md section 8.2

**Step 3: Create Disaster Recovery Workflow**

Document from SPEC.md section 8.3

**Step 4: Create Capacity Review and Onboarding Workflows**

**Step 5: Commit**

```bash
git add workflows/ && git commit -m "feat: add all 5 workflows"
```

---

### Task 6: Create Documentation

**Files:**
- Modify: `docs/getting-started.md`
- Modify: `docs/vault-setup.md`
- Modify: `docs/sre-methodology.md`
- Modify: `docs/architecture.md`
- Create: `README.md`
- Create: `CHANGELOG.md`

**Step 1: Create getting-started.md**

Guide for new users to set up and start using DevOps Superpowers.

**Step 2: Create vault-setup.md**

Detailed instructions for configuring the vault.

**Step 3: Create sre-methodology.md**

Explain SLO framework, error budget policy, toil reduction, DORA metrics.

**Step 4: Create architecture.md**

System architecture overview.

**Step 5: Create README.md and CHANGELOG.md**

**Step 6: Commit**

```bash
git add docs/ README.md CHANGELOG.md && git commit -m "docs: add complete documentation"
```

---

## Phase 2: Verification & Templates

### Task 7: Create Agent Template and READMEs

**Files:**
- Modify: `agents/custom/template.md`
- Modify: `agents/README.md`
- Modify: `skills/README.md`
- Modify: `commands/README.md`

**Step 1: Create custom agent template**

Use the template from SPEC.md section 5.8

**Step 2: Create all README files**

**Step 3: Commit**

```bash
git add agents/custom/ agents/README.md skills/README.md commands/README.md && git commit -m "feat: add templates and READMEs"
```

---

## Execution Options

**Plan complete and saved to `docs/plans/2026-03-13-devops-superpowers.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
