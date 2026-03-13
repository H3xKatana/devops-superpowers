# Skills

Skills are the atomic capabilities that agents compose. Each skill is a single-responsibility unit.

## Categories

### Infrastructure Skills
- `topology-mapper` — Discover and map complete cloud topology
- `drift-detector` — Compare live state against declared Terraform/Helm state
- `capacity-planner` — Analyze utilization and project future capacity
- `cost-analyzer` — Break down cloud spend and identify savings

### Deployment Skills
- `canary-deploy` — Metric-gated canary deployment
- `blue-green` — Blue-green environment switching
- `rollback` — Instant revert to previous good state
- `feature-flags` — Manage feature flag state

### Observability Skills
- `slo-tracker` — Track SLOs and error budget consumption
- `alert-analyzer` — Analyze firing alerts for patterns
- `log-investigator` — Search and correlate logs
- `trace-analyzer` — Analyze distributed traces

### Security Skills
- `secret-scanner` — Scan for accidentally committed secrets
- `cve-checker` — Check containers against CVE databases
- `compliance-auditor` — Audit against compliance frameworks
- `iam-reviewer` — Review IAM for over-privileged access

### Documentation Skills
- `runbook-generator` — Generate operational runbooks
- `adr-writer` — Create Architecture Decision Records
- `postmortem-writer` — Generate blameless postmortems
- `diagram-generator` — Produce infrastructure diagrams

## Design Principles

1. **Single Responsibility** — Each skill does one thing well
2. **Idempotent** — Can be run multiple times safely
3. **Explicit Rollback** — Every write operation has a rollback path
4. **Import First** — Check Superpowers registry before creating new skills

## Files

- `infrastructure/` — Infrastructure skills
- `deployments/` — Deployment skills
- `observability/` — Observability skills
- `security/` — Security skills
- `documentation/` — Documentation skills
- `README.md` — This file
