# Architecture Overview

This document provides a high-level overview of the DevOps Superpowers system architecture.

## System Design Principles

| Principle | Description |
|-----------|-------------|
| **Context First** | Never take action without collecting full infrastructure context |
| **Read Before Write** | Dedicated read-only agent for safe exploration |
| **Composable** | Skills are modular and import-first |
| **Plan for Failure** | All workflows include rollback and escalation paths |
| **Secure by Default** | All secrets live in the Vault |

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      User Interface                              │
│  (CLI / Chat / Web UI)                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Agent Orchestrator                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Inspector  │  │  Operator   │  │  Deployer   │              │
│  │ (readonly) │  │ (operator)  │  │ (engineer)  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │ Incident   │  │ SRE Advisor │  │  Architect  │              │
│  │ Commander  │  │ (readonly)  │  │ (readonly)  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Skills    │  │   Skills    │  │   Skills    │
│ Infrastructure  │  │  Deployments │  │ Observability│
│ - topology  │  │ - canary    │  │ - slo-tracker│
│ - drift     │  │ - blue-green│  │ - alert-analyzer│
│ - capacity  │  │ - rollback  │  │ - log-investigator│
│ - cost      │  │ - feature-flags│  │ - trace-analyzer│
└─────────────┘  └─────────────┘  └─────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Vault                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Cloud Keys  │  │ K8s Contexts │  │   Tokens    │          │
│  │ AWS/GCP/Azure│ │ kubeconfig   │  │ GitHub/ArgoCD│         │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  Env Variables / HashiCorp Vault / AWS Secrets Manager          │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐     ┌─────────┐     ┌─────────┐
    │AWS/GCP/ │     │K8s      │     │ CI/CD  │
    │Azure    │     │Clusters │     │Systems  │
    └─────────┘     └─────────┘     └─────────┘
```

## Core Components

### 1. Agent Orchestrator

The orchestrator routes requests to appropriate agents based on:
- Privilege level required
- Action type (read/write/destroy)
- Resource scope

#### Agent Privilege Levels

| Level | Can Read | Can Write | Can Destroy | Requires 2nd Approval |
|-------|-----------|------------|-------------|----------------------|
| `readonly` | ✅ | ❌ | ❌ | ❌ |
| `operator` | ✅ | ✅ | ❌ | ❌ |
| `engineer` | ✅ | ✅ | ✅ (staging) | ❌ |
| `admin` | ✅ | ✅ | ✅ (prod) | ✅ |

### 2. Agents

DevOps Superpowers provides 7 core agents:

| Agent | Purpose | Privilege |
|-------|---------|-----------|
| **Inspector** | Safe read-only infrastructure exploration | readonly |
| **Operator** | Day-to-day operational tasks | operator |
| **Deployer** | Deployment lifecycle management | engineer |
| **Incident Commander** | Incident response coordination | engineer |
| **SRE Advisor** | SLO and reliability guidance | readonly |
| **Architect** | Architecture design and ADRs | readonly |
| **Doc Writer** | Documentation generation | readonly |

### 3. Skills

Skills are atomic capabilities that agents compose. Organized by domain:

- **Infrastructure:** topology-mapper, drift-detector, capacity-planner, cost-analyzer
- **Deployments:** canary-deploy, blue-green, rollback, feature-flags
- **Observability:** slo-tracker, alert-analyzer, log-investigator, trace-analyzer
- **Security:** secret-scanner, cve-checker, compliance-auditor, iam-reviewer
- **Documentation:** runbook-generator, adr-writer, postmortem-writer, diagram-generator

### 4. Vault

The Vault is the secrets and inventory store:
- Environment variable references (`${VAR}`)
- Resolved at runtime
- Never exposed to agents directly
- Audit logged

### 5. Slash Commands

Primary interface for invoking agents:

```
/inspect   /deploy    /rollback  /incident
/slo       /audit     /plan      /document
/cost      /drift     /canary    /runbook
/postmortem /capacity  /cve       /iam       /logs
```

## Context Collection Protocol

Every agent follows this protocol:

```
COLLECT → ANALYZE → PLAN → CONFIRM → EXECUTE → VERIFY → REPORT
```

1. **COLLECT:** Gather infrastructure state
2. **ANALYZE:** Identify risks and dependencies
3. **PLAN:** Produce step-by-step execution plan with rollback
4. **CONFIRM:** Require explicit approval for write operations
5. **EXECUTE:** Perform the action
6. **VERIFY:** Confirm desired state achieved
7. **REPORT:** Produce structured summary

## Workflows

### Zero-Downtime Deployment

```
1. /inspect service:$SERVICE --env $ENV
   → Capture baseline metrics, SLO, incidents
   → ABORT if: active SEV1/SEV2, change freeze, error budget < 5%

2. /drift --env $ENV --service $SERVICE
   → Verify no unexpected drift

3. /deploy --dry-run
   → Engineer reviews plan

4. [CONFIRM] Engineer approves

5. /deploy --strategy canary --canary-pct 5
   → Monitor for 10 min: error rate, p99 latency

6. [AUTO-GATE] Metrics within baseline?
   → YES: Promote 25% → 50% → 100%
   → NO: Automatic rollback

7. /inspect service:$SERVICE
   → Verify post-deploy health
```

### Incident Response

```
1. Alert fires → /incident declare sev:$SEV
   → War room created, on-call paged

2. /logs + /inspect
   → Rapid context collection

3. Incident Commander assembles timeline
   → Recent deploys, config changes, anomalies

4. Mitigation options presented
   → Engineer selects action

5. Resolution confirmed
   → /incident resolve

6. /postmortem incident:INC-$ID
   → Action items tracked
```

## Security Model

### Secrets Management

1. No secrets in prompts or chat history
2. Vault resolution happens server-side
3. All secret access is audit-logged
4. Secrets rotate on schedule

### Agent Audit Log

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

### Sensitive Output Masking

Automatic masking of:
- Vault references (`${...}`)
- AWS access keys (`AKIA...`)
- Private key material
- Passwords in connection strings
- JWT tokens

## External Integrations

### Imported Skills

DevOps Superpowers imports from the Superpowers registry:

- `github-cli` — GitHub operations
- `kubectl` — Kubernetes management
- `terraform` — Infrastructure as Code
- `helm` — Package management
- `aws-cli` — AWS operations
- `datadog` — Monitoring
- `pagerduty` — Incident management
- `slack` — Communication

### Cloud Providers

- AWS (EKS, Lambda, RDS, etc.)
- GCP (GKE, Cloud Functions, Cloud SQL)
- Azure (AKS, Functions, Azure SQL)

## Data Flow

```
User Input
    │
    ▼
Slash Command Parser
    │
    ▼
Privilege Check
    │
    ▼
Agent Selection
    │
    ▼
Context Collection
    │  ┌──────────────┐
    ├──▶ Vault        │ (resolve secrets)
    │  └──────────────┘
    │  ┌──────────────┐
    ├──▶ Skills       │ (collect data)
    │  └──────────────┘
    │
    ▼
Analysis & Planning
    │
    ▼
User Confirmation (if write)
    │
    ▼
Execution
    │  ┌──────────────┐
    ├──▶ Vault        │ (write secrets if needed)
    │  └──────────────┘
    │  ┌──────────────┐
    ├──▶ External    │ (API calls)
    │  └──────────────┘
    │
    ▼
Verification
    │
    ▼
Report Generation
    │
    ▼
User Output
```

## Deployment Topology

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Infrastructure                      │
│                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐        │
│  │  Production │   │  Staging    │   │     Dev     │        │
│  │  Cluster   │   │  Cluster    │   │  Cluster    │        │
│  └─────────────┘   └─────────────┘   └─────────────┘        │
│         │                 │                 │               │
│         └─────────────────┼─────────────────┘               │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DevOps Superpowers Agent                 │   │
│  │         (runs in any K8s cluster or local)           │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Vault                              │   │
│  │         (environment variables or secrets manager)   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Performance Considerations

- **Parallel Context Collection:** Agents fetch multiple data sources concurrently
- **Caching:** Recent inspection results cached for 5 minutes
- **Rate Limiting:** External API calls respect provider limits
- **Timeout Handling:** Long-running operations have configurable timeouts

## Scalability

- **Horizontal:** Run multiple agent instances for parallel operations
- **Vertical:** Increase resource allocation for large-scale analysis
- **Distributed:** Agents can run across multiple clusters
