# DevOps Superpowers — Specification
**Version:** Beta v0.1  
**Status:** Draft  
**Date:** 2025  
**Author:** DevOps Superpowers Contributors

---

## Table of Contents

1. [Vision & Philosophy](#1-vision--philosophy)
2. [Design Principles](#2-design-principles)
3. [Project Structure](#3-project-structure)
4. [Vault — Secrets & Inventory Store](#4-vault--secrets--inventory-store)
5. [Agents](#5-agents)
6. [Skills](#6-skills)
7. [Slash Commands](#7-slash-commands)
8. [Workflows](#8-workflows)
9. [SRE Methodology Integration](#9-sre-methodology-integration)
10. [Security Model](#10-security-model)
11. [External Skills & Imports](#11-external-skills--imports)
12. [Roadmap & Versioning](#12-roadmap--versioning)
13. [Contributing](#13-contributing)

---

## 1. Vision & Philosophy

**DevOps Superpowers** is an open-source, agentic AI ecosystem for DevOps and Site Reliability Engineers (SREs). It extends the concept of [Superpowers](https://github.com/superpowers) — a community-curated registry of agentic skills — with deep, opinionated tooling for the full DevOps and SRE lifecycle.

Where Superpowers provides breadth, DevOps Superpowers provides **depth** — pre-wired agents, slash commands, and skills that understand your infrastructure, your incident runbooks, your SLOs, and your deployment pipelines.

### Core Tenets

| Tenet | Description |
|---|---|
| **Context First** | Never take action without collecting full infrastructure context. Agents always read before they write. |
| **Read Before Write** | A dedicated read-only agent exists for safe exploration. No mutations without explicit confirmation. |
| **Automate When Possible** | If a task is repeated more than twice, it should be a skill or command. |
| **SRE Methodology** | Every action is guided by SRE principles: SLOs, error budgets, toil reduction, blameless postmortems. |
| **Secure by Default** | All secrets live in the Vault. No credentials in prompts, chat history, or logs. |
| **Composable** | Skills are modular and import-first. We never rewrite what already exists. |
| **Plan for Failure** | All workflows include rollback, circuit-breakers, and escalation paths. |

---

## 2. Design Principles

### 2.1 Import First
Before writing a new skill, search the Superpowers registry. If a skill exists (e.g., `github-cli`, `kubectl`, `terraform`), import it globally. This spec notes required external skills in [Section 11](#11-external-skills--imports).

### 2.2 Context Collection Protocol
Every agent follows this protocol before taking any action:

```
COLLECT → ANALYZE → PLAN → CONFIRM → EXECUTE → VERIFY → REPORT
```

- **COLLECT:** Gather all relevant infrastructure state (topology, current SLOs, recent incidents, config).
- **ANALYZE:** Identify risks, dependencies, blast radius.
- **PLAN:** Produce a step-by-step execution plan with rollback at each step.
- **CONFIRM:** Present plan to engineer, require explicit approval for any write operation.
- **EXECUTE:** Perform the action, logging every step.
- **VERIFY:** Confirm the desired state was achieved (health checks, metric validation).
- **REPORT:** Produce a structured summary with diffs, timings, and any anomalies.

### 2.3 Agentic Boundaries

Agents are scoped by **role** and **privilege level**:

| Level | Can Read | Can Write | Can Destroy | Requires 2nd Approval |
|---|---|---|---|---|
| `readonly` | ✅ | ❌ | ❌ | ❌ |
| `operator` | ✅ | ✅ | ❌ | ❌ |
| `engineer` | ✅ | ✅ | ✅ (staging) | ❌ |
| `admin` | ✅ | ✅ | ✅ (prod) | ✅ |

---

## 3. Project Structure

```
devops-superpowers/
├── spec.md                          # This document
├── README.md
├── CHANGELOG.md
│
├── .superpowers/                    # Global skill imports (external)
│   └── imports.yaml                 # Manifest of imported skills
│
├── vault/                           # Secrets & inventory store
│   ├── schema.md                    # Vault schema definition
│   ├── inventory.yaml.example       # Example inventory template
│   └── README.md
│
├── agents/                          # Agentic definitions
│   ├── core/
│   │   ├── inspector.md             # Read-only exploration agent
│   │   ├── operator.md              # Day-to-day operations agent
│   │   ├── deployer.md              # Deployment lifecycle agent
│   │   ├── incident-commander.md    # Incident response agent
│   │   ├── sre-advisor.md           # SRE best practice advisor
│   │   ├── architect.md             # Architecture design agent
│   │   └── doc-writer.md            # Documentation generation agent
│   ├── custom/                      # User-defined agents
│   └── README.md
│
├── skills/                          # Custom skill definitions
│   ├── infrastructure/
│   │   ├── topology-mapper.md
│   │   ├── drift-detector.md
│   │   ├── capacity-planner.md
│   │   └── cost-analyzer.md
│   ├── deployments/
│   │   ├── canary-deploy.md
│   │   ├── blue-green.md
│   │   ├── rollback.md
│   │   └── feature-flags.md
│   ├── observability/
│   │   ├── slo-tracker.md
│   │   ├── alert-analyzer.md
│   │   ├── log-investigator.md
│   │   └── trace-analyzer.md
│   ├── security/
│   │   ├── secret-scanner.md
│   │   ├── cve-checker.md
│   │   ├── compliance-auditor.md
│   │   └── iam-reviewer.md
│   ├── documentation/
│   │   ├── runbook-generator.md
│   │   ├── adr-writer.md
│   │   ├── postmortem-writer.md
│   │   └── diagram-generator.md
│   └── README.md
│
├── commands/                        # Slash command definitions
│   ├── inspect.md
│   ├── deploy.md
│   ├── rollback.md
│   ├── incident.md
│   ├── slo.md
│   ├── audit.md
│   ├── plan.md
│   ├── document.md
│   ├── cost.md
│   └── README.md
│
├── workflows/                       # Multi-step agentic workflows
│   ├── incident-response.md
│   ├── zero-downtime-deploy.md
│   ├── disaster-recovery.md
│   ├── capacity-review.md
│   └── onboarding.md
│
└── docs/                            # Human-readable documentation
    ├── getting-started.md
    ├── vault-setup.md
    ├── sre-methodology.md
    └── architecture.md
```

---

## 4. Vault — Secrets & Inventory Store

The Vault is the single source of truth for all secrets, keys, tokens, and inventory that agents need to operate. It is **never stored in chat history or prompt context directly** — references are resolved at runtime by the agent.

### 4.1 Vault Schema

```yaml
# vault/inventory.yaml
# DO NOT COMMIT WITH REAL VALUES — use environment references or a secrets manager

metadata:
  environment: production          # production | staging | dev
  owner: platform-team
  last_updated: 2025-01-01

# ─── Cloud Providers ────────────────────────────────────────────
cloud:
  aws:
    account_id: "${AWS_ACCOUNT_ID}"
    region: us-east-1
    access_key_id: "${AWS_ACCESS_KEY_ID}"      # never hardcode
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}"
    role_arn: "${AWS_ROLE_ARN}"
    profile: default

  gcp:
    project_id: "${GCP_PROJECT_ID}"
    service_account_key: "${GCP_SA_KEY_PATH}"  # path to key file

  azure:
    subscription_id: "${AZURE_SUBSCRIPTION_ID}"
    tenant_id: "${AZURE_TENANT_ID}"
    client_id: "${AZURE_CLIENT_ID}"
    client_secret: "${AZURE_CLIENT_SECRET}"

# ─── Kubernetes ──────────────────────────────────────────────────
kubernetes:
  clusters:
    - name: prod-eks
      kubeconfig: "${KUBECONFIG_PROD}"
      context: prod-context
      readonly: false
    - name: staging-eks
      kubeconfig: "${KUBECONFIG_STAGING}"
      context: staging-context
      readonly: false

# ─── Source Control ──────────────────────────────────────────────
vcs:
  github:
    token: "${GITHUB_TOKEN}"
    org: my-org
    default_branch: main
  gitlab:
    token: "${GITLAB_TOKEN}"
    url: https://gitlab.mycompany.com

# ─── CI/CD ───────────────────────────────────────────────────────
cicd:
  jenkins:
    url: "${JENKINS_URL}"
    user: "${JENKINS_USER}"
    token: "${JENKINS_TOKEN}"
  argocd:
    url: "${ARGOCD_URL}"
    token: "${ARGOCD_TOKEN}"

# ─── Observability ───────────────────────────────────────────────
observability:
  datadog:
    api_key: "${DD_API_KEY}"
    app_key: "${DD_APP_KEY}"
    site: datadoghq.com
  pagerduty:
    api_key: "${PD_API_KEY}"
    service_id: "${PD_SERVICE_ID}"
  grafana:
    url: "${GRAFANA_URL}"
    token: "${GRAFANA_TOKEN}"
  prometheus:
    url: "${PROMETHEUS_URL}"

# ─── Infrastructure ──────────────────────────────────────────────
infrastructure:
  terraform:
    state_bucket: "${TF_STATE_BUCKET}"
    lock_table: "${TF_LOCK_TABLE}"
    workspace: production
  vault:                           # HashiCorp Vault (if used)
    url: "${HCV_URL}"
    token: "${HCV_TOKEN}"

# ─── SSH & Keys ──────────────────────────────────────────────────
ssh:
  keys:
    - name: prod-bastion
      path: "${SSH_KEY_PROD}"
      user: ec2-user
      hosts:
        - bastion.prod.example.com
    - name: staging-bastion
      path: "${SSH_KEY_STAGING}"
      user: ec2-user

# ─── Databases ───────────────────────────────────────────────────
databases:
  postgres_prod:
    host: "${DB_HOST_PROD}"
    port: 5432
    user: "${DB_USER_PROD}"
    password: "${DB_PASS_PROD}"
    readonly_replica: "${DB_REPLICA_PROD}"
  redis:
    host: "${REDIS_HOST}"
    port: 6379

# ─── Messaging & Queues ──────────────────────────────────────────
messaging:
  kafka:
    brokers: "${KAFKA_BROKERS}"
    sasl_username: "${KAFKA_USER}"
    sasl_password: "${KAFKA_PASS}"

# ─── Communication ───────────────────────────────────────────────
communication:
  slack:
    token: "${SLACK_TOKEN}"
    incident_channel: "#incidents"
    deploy_channel: "#deployments"
  pagerduty_webhook: "${PD_WEBHOOK}"

# ─── CLI Tools Available ─────────────────────────────────────────
cli_tools:
  - name: kubectl
    version: ">=1.28"
    installed: true
  - name: helm
    version: ">=3.12"
    installed: true
  - name: terraform
    version: ">=1.6"
    installed: true
  - name: aws-cli
    version: ">=2.0"
    installed: true
  - name: gh                        # GitHub CLI — import from Superpowers
    version: ">=2.40"
    installed: true
  - name: argocd
    installed: true
  - name: docker
    installed: true
  - name: jq
    installed: true
  - name: yq
    installed: true
```

### 4.2 Vault Resolution Rules

1. All `${VAR}` references are resolved from environment variables, `.env` files (never committed), or a secrets manager (HashiCorp Vault, AWS Secrets Manager, etc.).
2. Agents receive a **resolved** vault reference object at runtime — they never see raw env var names.
3. Readonly agents receive only read-scoped credentials (readonly replicas, scoped tokens).
4. Vault schema changes require a PR review and `vault/CHANGELOG.md` entry.

---

## 5. Agents

Each agent is defined by a Markdown file containing: purpose, privilege level, required vault keys, context collection steps, capabilities, and example invocations.

---

### 5.1 Inspector Agent (`agents/core/inspector.md`)

**Privilege:** `readonly`  
**Purpose:** Safe exploration of infrastructure state. The default agent to invoke first. Never mutates anything.

**Capabilities:**
- Map cluster topology (nodes, namespaces, workloads, services)
- Query Prometheus/Datadog metrics without modifying alerts
- Inspect Terraform state (read-only)
- Read GitHub PRs, workflow runs, and repository state
- List secrets (names only, never values)
- Summarize recent incidents and SLO status
- Generate topology diagrams (Mermaid/ASCII)
- Audit IAM permissions (read API calls only)

**Context Collected:**
```
- Cloud account topology
- Kubernetes cluster state
- Recent deployment history
- Active incidents
- Current SLO compliance
- Open PRs / pending changes
```

**Example Invocations:**
```
/inspect cluster prod-eks
/inspect slo service:payments last:7d
/inspect topology aws:us-east-1
/inspect drift terraform:production
/inspect iam user:deploy-bot
```

---

### 5.2 Operator Agent (`agents/core/operator.md`)

**Privilege:** `operator`  
**Purpose:** Day-to-day operational tasks. Can apply non-destructive changes. Always confirms before acting.

**Capabilities:**
- Restart pods / services (with health check verification)
- Scale deployments (with SLO impact analysis first)
- Apply ConfigMaps and non-breaking manifests
- Trigger CI/CD pipeline runs
- Acknowledge/resolve PagerDuty alerts
- Post incident updates to Slack
- Run database queries (read-only by default; write queries require explicit flag)
- Rotate short-lived credentials

**Context Collected Before Any Write:**
```
- Current service health
- Active incidents that could be affected
- Blast radius analysis
- Rollback plan
- On-call engineer availability
```

---

### 5.3 Deployer Agent (`agents/core/deployer.md`)

**Privilege:** `engineer`  
**Purpose:** Full deployment lifecycle management. Supports canary, blue-green, and rolling strategies.

**Capabilities:**
- Plan and execute zero-downtime deployments
- Canary rollout with automatic metric-gated progression
- Blue-green switch with instant rollback
- Feature flag management (LaunchDarkly / Unleash)
- Helm chart upgrades with diff preview
- ArgoCD sync with manual gate for production
- Post-deploy validation (smoke tests, SLO check)
- Automatic rollback on SLO breach

**Deployment Checklist (enforced):**
```
[ ] Change freeze check (no deploys during freeze windows)
[ ] SLO baseline captured (before state)
[ ] Rollback plan documented
[ ] Smoke test suite available
[ ] On-call notified
[ ] Canary traffic percentage confirmed
[ ] Blast radius analysis complete
```

---

### 5.4 Incident Commander Agent (`agents/core/incident-commander.md`)

**Privilege:** `engineer`  
**Purpose:** Coordinate incident response from detection to resolution and postmortem.

**Capabilities:**
- Declare incident (SEV1-SEV4) and create war room
- Auto-assemble timeline from logs, metrics, and deploys
- Correlate symptoms across services
- Suggest and track mitigation actions
- Draft real-time status page updates
- Capture all decisions and actions for postmortem
- Generate blameless postmortem document
- Track action items to closure

**Incident Response Flow:**
```
DETECT → DECLARE (SEV) → ASSEMBLE → DIAGNOSE → MITIGATE → RESOLVE → POSTMORTEM → TRACK
```

**SLA Targets per Severity:**

| SEV | Time to Acknowledge | Time to Mitigate | Postmortem Due |
|---|---|---|---|
| SEV1 | 5 min | 30 min | 24 hours |
| SEV2 | 15 min | 2 hours | 48 hours |
| SEV3 | 1 hour | 8 hours | 1 week |
| SEV4 | 4 hours | Next sprint | Optional |

---

### 5.5 SRE Advisor Agent (`agents/core/sre-advisor.md`)

**Privilege:** `readonly`  
**Purpose:** Long-running advisory agent. Continuously monitors SLOs, error budgets, and reliability posture. Provides recommendations, never takes autonomous action.

**Capabilities:**
- SLO tracking and error budget burn rate analysis
- Toil identification and automation recommendations
- Capacity planning (based on historical trends + growth projections)
- Reliability risk assessment for upcoming changes
- Post-incident trend analysis
- Quarterly reliability review report generation
- Architecture reliability score (DORA metrics)

**Weekly Outputs:**
```
- Error budget report per service
- Top-3 toil reduction opportunities
- Deployment frequency & change failure rate
- MTTR trend
- Recommendations backlog (prioritized)
```

---

### 5.6 Architect Agent (`agents/core/architect.md`)

**Privilege:** `readonly` (produces plans, never deploys)  
**Purpose:** Design, evaluate, and document architectural changes. Produces ADRs, diagrams, and risk assessments.

**Capabilities:**
- Design cloud-native architectures (multi-region, HA)
- Evaluate trade-offs (cost vs reliability vs performance)
- Generate Architecture Decision Records (ADRs)
- Produce infrastructure diagrams (Terraform modules, Mermaid)
- Review PRs for architectural impact
- Model failure scenarios and calculate blast radius
- Produce migration plans (lift-and-shift, re-architecture)
- Capacity and cost modeling

---

### 5.7 Doc Writer Agent (`agents/core/doc-writer.md`)

**Privilege:** `readonly`  
**Purpose:** Generate and maintain operational documentation from live infrastructure state.

**Capabilities:**
- Generate runbooks from existing kubectl/AWS/Terraform state
- Write postmortem documents from incident timelines
- Produce onboarding guides for new engineers
- Keep API documentation in sync with OpenAPI specs
- Generate CHANGELOG entries from Git history
- Write architecture diagrams and explanations
- Maintain an always-current service catalog

---

### 5.8 Custom Agent Template (`agents/custom/template.md`)

```markdown
# Agent: [Name]

## Metadata
- Version: 1.0.0
- Privilege: readonly | operator | engineer | admin
- Author: 
- Tags: [infra, k8s, security, cost, ...]

## Purpose
[One paragraph description]

## Required Vault Keys
- vault.cloud.aws.access_key_id
- vault.kubernetes.clusters[0].kubeconfig
- [list all keys this agent needs]

## Context Collection
Before acting, collect:
- [ ] ...

## Capabilities
- ...

## Constraints
- Never ...
- Always confirm before ...

## Example Invocations
\`\`\`
/[command] [args]
\`\`\`

## Rollback Plan
[How to undo what this agent does]
```

---

## 6. Skills

Skills are the atomic capabilities that agents compose. Each skill is a single-responsibility unit.

### 6.1 Infrastructure Skills

#### `topology-mapper`
Discovers and maps the complete topology of a cloud environment.
- Inputs: cloud provider, region, optional filters
- Outputs: JSON topology graph + Mermaid diagram
- Tools used: `aws-cli`, `kubectl`, `terraform show`
- Read-only: yes

#### `drift-detector`
Compares live infrastructure state against declared Terraform/Helm state.
- Inputs: Terraform workspace or Helm release
- Outputs: drift report (added, changed, removed resources)
- Tools used: `terraform plan`, `helm diff`
- Read-only: yes (plan only, no apply)

#### `capacity-planner`
Analyzes historical resource utilization and projects future capacity needs.
- Inputs: service name, time range, growth rate (%)
- Outputs: capacity report with recommended node/pod autoscaling config
- Tools used: Prometheus queries, Datadog API

#### `cost-analyzer`
Breaks down cloud spend by service, team, and optimization opportunity.
- Inputs: cloud account, time range, tag filters
- Outputs: cost report with top 10 savings opportunities

### 6.2 Deployment Skills

#### `canary-deploy`
Executes a canary deployment with metric-gated traffic shifting.
- Inputs: service, new image tag, canary %, success metrics, duration
- Outputs: canary report, promotion or rollback decision
- SLO gate: automatic rollback if error rate > baseline × 1.5

#### `blue-green`
Manages blue-green environment switching.
- Inputs: service, target environment (blue|green), health check URL
- Outputs: switch confirmation, traffic validation report

#### `rollback`
Instantly reverts a deployment to the previous known-good state.
- Inputs: service, environment
- Outputs: rollback confirmation, health check results
- Fastest possible operation — no confirmations required once invoked

#### `feature-flags`
Manages feature flag state (LaunchDarkly / Unleash / custom).
- Inputs: flag name, action (enable/disable/percentage), target segments
- Outputs: flag state confirmation, affected user estimate

### 6.3 Observability Skills

#### `slo-tracker`
Tracks SLOs and error budget consumption.
- Inputs: service name, SLO definition (or auto-discovered from config)
- Outputs: current SLO %, error budget remaining, burn rate

#### `alert-analyzer`
Analyzes firing alerts for patterns, duplicates, and noise.
- Inputs: alert source (Datadog/PagerDuty/Alertmanager), time range
- Outputs: alert report, deduplication suggestions, runbook gaps

#### `log-investigator`
Searches and correlates logs across services for a given incident window.
- Inputs: time range, services, error patterns
- Outputs: structured timeline, anomaly highlights, relevant log snippets

#### `trace-analyzer`
Analyzes distributed traces to identify latency bottlenecks.
- Inputs: service, time range, percentile thresholds
- Outputs: flame graph summary, slowest spans, dependency analysis

### 6.4 Security Skills

#### `secret-scanner`
Scans repositories and configs for accidentally committed secrets.
- Inputs: repo URL or local path
- Outputs: findings report with file, line, secret type (never the value)
- Tools: `truffleHog`, `gitleaks`

#### `cve-checker`
Checks running container images against known CVE databases.
- Inputs: image list (from cluster or registry)
- Outputs: CVE report sorted by severity (CRITICAL first)
- Tools: `trivy`, `grype`

#### `compliance-auditor`
Audits infrastructure against compliance frameworks (CIS, SOC2, PCI-DSS).
- Inputs: target (AWS account, K8s cluster), framework
- Outputs: compliance score, failed controls, remediation steps

#### `iam-reviewer`
Reviews IAM roles and policies for over-privileged access.
- Inputs: cloud account, optional service filter
- Outputs: overly permissive roles, unused permissions, least-privilege recommendations

### 6.5 Documentation Skills

#### `runbook-generator`
Generates operational runbooks from live service state and historical incidents.
- Inputs: service name
- Outputs: Markdown runbook with: overview, dependencies, alert responses, escalation

#### `adr-writer`
Creates Architecture Decision Records from a conversation or PR.
- Inputs: context (problem statement, options, decision)
- Outputs: structured ADR in Markdown (MADR format)

#### `postmortem-writer`
Generates a blameless postmortem from an incident timeline.
- Inputs: incident ID or timeline data
- Outputs: postmortem document (Markdown or DOCX)

#### `diagram-generator`
Produces infrastructure diagrams from live state or descriptions.
- Inputs: target (cluster, VPC, service mesh)
- Outputs: Mermaid diagram, PlantUML, or ASCII art

---

## 7. Slash Commands

Slash commands are the primary interface for engineers to invoke agents and skills.

### Core Commands

| Command | Agent | Description |
|---|---|---|
| `/inspect` | Inspector | Read-only exploration of any resource |
| `/deploy` | Deployer | Deploy a service (with strategy selection) |
| `/rollback` | Deployer | Rollback a service immediately |
| `/incident` | Incident Commander | Declare or manage an incident |
| `/slo` | SRE Advisor | Query SLO status and error budgets |
| `/audit` | Inspector | Security and compliance audit |
| `/plan` | Architect | Architecture planning and ADR generation |
| `/document` | Doc Writer | Generate or update documentation |
| `/cost` | Inspector | Cloud cost analysis and optimization |
| `/drift` | Inspector | Detect infrastructure drift |
| `/canary` | Deployer | Canary deployment management |
| `/runbook` | Doc Writer | Generate or update a runbook |
| `/postmortem` | Incident Commander | Generate postmortem document |
| `/capacity` | SRE Advisor | Capacity planning analysis |
| `/cve` | Inspector | CVE scan of running images |
| `/iam` | Inspector | IAM permission audit |
| `/logs` | Inspector | Log investigation |

### Command Syntax Convention

```
/[command] [resource] [flags]

Flags:
  --env       Target environment (prod|staging|dev)
  --service   Target service name
  --dry-run   Show plan without executing
  --confirm   Skip confirmation prompt (use with care)
  --output    Output format (json|yaml|md|table)
  --since     Time range start
  --until     Time range end
  --verbose   Include full context in output
```

### Example Invocations

```bash
/inspect cluster prod-eks --output table
/deploy service:payments image:v2.1.0 --env prod --strategy canary --canary-pct 5
/rollback service:payments --env prod
/incident declare sev:2 title:"Payment API 500 spike" 
/slo service:payments --since 7d
/audit --framework cis-k8s --env prod
/plan "migrate postgres to aurora serverless" --output md
/document runbook service:payments
/cost --env prod --since 30d --output table
/drift --env prod --service payments
/postmortem incident:INC-2024-042
/capacity service:payments --growth 20% --horizon 6m
```

---

## 8. Workflows

Workflows are multi-agent, multi-step processes that span the entire lifecycle of a DevOps operation.

### 8.1 Zero-Downtime Deployment Workflow

```
1. /inspect service:$SERVICE --env $ENV
   → Capture baseline metrics, current SLO, active incidents
   → ABORT if: active SEV1/SEV2, change freeze, error budget < 5%

2. /drift --env $ENV --service $SERVICE
   → Verify no unexpected drift before deploying

3. /deploy service:$SERVICE image:$NEW_TAG --env $ENV --strategy canary --dry-run
   → Engineer reviews full plan and diff

4. [CONFIRM] Engineer approves

5. /deploy service:$SERVICE image:$NEW_TAG --env $ENV --strategy canary --canary-pct 5
   → Deploy 5% canary
   → Monitor for 10 min: error rate, p99 latency, saturation

6. [AUTO-GATE] Metrics within SLO baseline?
   → YES: Promote to 25% → 50% → 100%
   → NO: /rollback service:$SERVICE --env $ENV (automatic)

7. /inspect service:$SERVICE --env $ENV
   → Verify post-deploy health

8. /document changelog service:$SERVICE version:$NEW_TAG
   → Update changelog automatically
```

### 8.2 Incident Response Workflow

```
1. Alert fires → /incident declare sev:$SEV title:"$TITLE"
   → War room created (Slack channel + PagerDuty incident)
   → On-call paged
   → Status page updated

2. /logs service:$AFFECTED --since $INCIDENT_START --until now
   /inspect service:$AFFECTED --env prod
   → Rapid context collection

3. Incident Commander Agent assembles timeline:
   → Recent deploys
   → Config changes
   → Metric anomalies
   → Correlated alerts

4. Mitigation options presented to IC (Incident Commander)
   → Engineer selects action
   → /rollback or /operator scale or /feature-flag disable

5. Resolution confirmed via /inspect (health checks green)
   → /incident resolve INC-$ID

6. /postmortem incident:INC-$ID
   → Auto-populated from timeline
   → Engineer reviews and fills gaps
   → Action items tracked in backlog
```

### 8.3 Disaster Recovery Workflow

```
1. /inspect --scope full --env prod
   → Capture full infrastructure snapshot

2. /architect dr-plan --rpo 4h --rto 1h
   → Generate or validate DR runbook

3. DR test scheduled (no production impact):
   → Failover to secondary region (staging simulation)
   → Measure actual RTO/RPO vs targets

4. /document dr-test results:$RESULTS
   → Update DR runbook with test outcomes
```

### 8.4 New Engineer Onboarding Workflow

```
1. /inspect --scope full --env all
   → Produce infrastructure overview for new engineer

2. /document onboarding engineer:$NAME team:$TEAM
   → Generate personalized guide:
     - Services owned
     - Runbooks
     - Alert response guide
     - Key contacts

3. /audit iam user:$NEW_ENGINEER
   → Verify least-privilege access provisioned correctly
```

---

## 9. SRE Methodology Integration

DevOps Superpowers is grounded in the Google SRE methodology. Every agent and workflow enforces these principles.

### 9.1 SLO Framework

Every service must define SLOs in the format:

```yaml
# slo.yaml (per service, stored in service repo)
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

### 9.2 Error Budget Policy

| Budget Remaining | Policy |
|---|---|
| > 50% | Normal operations. All deployments permitted. |
| 25–50% | Elevated caution. Require /inspect before every deploy. |
| 10–25% | Deploy freeze for non-critical changes. SRE Advisor produces remediation plan. |
| < 10% | Full deploy freeze. Only reliability work permitted. Incident Commander on standby. |
| 0% | Emergency mode. No new features. All hands on reliability. |

### 9.3 Toil Reduction Tracking

The SRE Advisor Agent identifies and tracks toil:

```yaml
# toil-registry.yaml
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

### 9.4 DORA Metrics Tracking

The SRE Advisor tracks the four DORA metrics continuously:

| Metric | Target (Elite) | Tool |
|---|---|---|
| Deployment Frequency | Multiple/day | Deployer Agent logs |
| Lead Time for Changes | < 1 hour | GitHub + CI metrics |
| Change Failure Rate | < 5% | Rollback rate tracking |
| Time to Restore Service | < 1 hour | Incident Commander timeline |

---

## 10. Security Model

### 10.1 Principle of Least Privilege
- Every agent uses the minimum credentials required
- Readonly agents get readonly tokens only
- Production credentials require 2-person authorization for provisioning

### 10.2 Secrets Management Rules
1. No secrets in prompts, chat history, or log output
2. Vault resolution happens server-side before agent execution
3. All secret access is audit-logged (who, what, when)
4. Secrets rotate on schedule; Vault schema tracks rotation dates
5. SSH private keys are path references only — never inline

### 10.3 Agent Audit Log Format

```json
{
  "timestamp": "2025-01-15T14:23:01Z",
  "agent": "deployer",
  "user": "alice@example.com",
  "action": "deploy",
  "resource": "service:payments",
  "environment": "production",
  "privilege_level": "engineer",
  "dry_run": false,
  "approved_by": "alice@example.com",
  "outcome": "success",
  "duration_ms": 47230,
  "vault_keys_accessed": ["cloud.aws.access_key_id", "kubernetes.clusters.prod-eks.kubeconfig"],
  "rollback_available": true
}
```

### 10.4 Sensitive Output Masking

All agent output automatically masks:
- Anything matching `${...}` vault references
- AWS access keys (`AKIA...`)
- Private key material (`-----BEGIN ... KEY-----`)
- Passwords in connection strings
- JWT tokens

---

## 11. External Skills & Imports

These skills should be imported from the Superpowers registry rather than reimplemented. Add them to `.superpowers/imports.yaml`.

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

**Note:** If a skill is not available in the registry, prompt the user to check with `/import search [skill-name]` before creating a custom implementation.

---

## 12. Roadmap & Versioning

### Beta v0.1 (Current) — Foundation
- [ ] Vault schema and inventory template
- [ ] Inspector Agent (readonly)
- [ ] Operator Agent
- [ ] Deployer Agent (canary + blue-green)
- [ ] Incident Commander Agent
- [ ] SRE Advisor Agent (basic)
- [ ] Core slash commands (`/inspect`, `/deploy`, `/rollback`, `/incident`, `/slo`)
- [ ] External skill imports manifest
- [ ] SLO YAML schema
- [ ] Zero-downtime deployment workflow
- [ ] Incident response workflow

### Beta v0.2 — Observability & Documentation
- [ ] Architect Agent
- [ ] Doc Writer Agent
- [ ] All observability skills (slo-tracker, alert-analyzer, log-investigator, trace-analyzer)
- [ ] `runbook-generator` skill
- [ ] `postmortem-writer` skill
- [ ] `/document`, `/runbook`, `/postmortem` commands
- [ ] DORA metrics dashboard

### v0.3 — Security & Compliance
- [ ] `secret-scanner` skill
- [ ] `cve-checker` skill
- [ ] `compliance-auditor` skill
- [ ] `iam-reviewer` skill
- [ ] `/audit`, `/cve`, `/iam` commands
- [ ] Audit log framework

### v0.4 — Cost & Capacity
- [ ] `capacity-planner` skill
- [ ] `cost-analyzer` skill
- [ ] `drift-detector` enhanced
- [ ] `/cost`, `/capacity`, `/drift` commands
- [ ] Toil registry schema

### v1.0 — Production-Ready
- [ ] Full test suite for all skills
- [ ] Multi-cloud support (AWS + GCP + Azure)
- [ ] Agent marketplace (community agents)
- [ ] Web UI for Vault management
- [ ] SSO integration
- [ ] Policy-as-code (OPA) integration
- [ ] Full documentation site

---

## 13. Contributing

### Adding a New Skill
1. Check `.superpowers/imports.yaml` — does it already exist?
2. If not in registry, create `skills/[category]/[skill-name].md`
3. Follow the skill template (see `skills/README.md`)
4. Skills must be: single-responsibility, idempotent, and have an explicit rollback path
5. Open a PR; the Architect Agent will review for design consistency

### Adding a New Agent
1. Use `agents/custom/template.md` as the base
2. Define: purpose, privilege level, required vault keys, capabilities, constraints
3. Add example invocations
4. PR must include: agent definition + at least 2 skills it composes

### Vault Schema Changes
1. Never add new top-level keys without a design discussion
2. All new keys must have: example value, environment variable reference, and rotation policy
3. Update `vault/CHANGELOG.md`

---

*DevOps Superpowers — Beta v0.1 — Built on the shoulders of the SRE community*
