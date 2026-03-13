# DevOps Superpowers

An open-source, agentic AI ecosystem for DevOps and Site Reliability Engineers (SREs). Built on the [Superpowers](https://github.com/superpowers) framework.

## Overview

DevOps Superpowers provides pre-wired AI agents, slash commands, and skills that understand your infrastructure, incident runbooks, SLOs, and deployment pipelines. It brings SRE methodology to every operation through intelligent automation.

## Core Tenets

| Tenet | Description |
|-------|-------------|
| **Context First** | Never take action without collecting full infrastructure context |
| **Read Before Write** | Dedicated read-only agent for safe exploration |
| **SRE Methodology** | Every action guided by SLOs, error budgets, toil reduction |
| **Secure by Default** | All secrets live in the Vault — never in prompts or logs |
| **Composable** | Skills are modular and import-first |

## Quick Start

```bash
# Clone and enter directory
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers

# Copy vault template
cp vault/inventory.yaml.example vault/inventory.yaml

# Configure environment
# Edit vault/inventory.yaml with your ${VAR} references

# Run Inspector to verify setup
/inspect cluster prod-eks
```

## Features

### AI Agents

- **Inspector** — Safe read-only infrastructure exploration
- **Operator** — Day-to-day operational tasks
- **Deployer** — Zero-downtime deployments (canary, blue-green)
- **Incident Commander** — Full incident lifecycle management
- **SRE Advisor** — SLO tracking, error budgets, toil identification
- **Architect** — Architecture design and ADRs
- **Doc Writer** — Runbooks, postmortems, documentation

### Slash Commands

| Command | Description |
|---------|-------------|
| `/inspect` | Explore infrastructure |
| `/deploy` | Deploy with strategy selection |
| `/rollback` | Instant rollback |
| `/incident` | Declare/manage incidents |
| `/slo` | Query SLO status |
| `/audit` | Security compliance audit |
| `/plan` | Architecture planning |
| `/document` | Generate documentation |
| `/cost` | Cloud cost analysis |
| `/drift` | Detect infrastructure drift |
| `/canary` | Canary deployment management |

### Skills

**Infrastructure:** topology-mapper, drift-detector, capacity-planner, cost-analyzer

**Deployments:** canary-deploy, blue-green, rollback, feature-flags

**Observability:** slo-tracker, alert-analyzer, log-investigator, trace-analyzer

**Security:** secret-scanner, cve-checker, compliance-auditor, iam-reviewer

**Documentation:** runbook-generator, adr-writer, postmortem-writer, diagram-generator

### SRE Integration

- **SLO Framework** — Define and track Service Level Objectives
- **Error Budget Policy** — Automated deploy restrictions based on budget
- **DORA Metrics** — Deployment frequency, lead time, failure rate, MTTR
- **Toil Reduction** — Identify and track automation opportunities

## Documentation

- [Getting Started](docs/getting-started.md) — Setup and first deployment
- [Vault Setup](docs/vault-setup.md) — Detailed vault configuration
- [SRE Methodology](docs/sre-methodology.md) — SLOs, error budgets, DORA
- [Architecture](docs/architecture.md) — System design overview

## Security Model

- **Least Privilege** — Agents use minimum credentials required
- **Vault-Based Secrets** — No credentials in prompts or logs
- **Audit Logging** — All actions logged with full context
- **2-Person Authorization** — Production changes may require approval

## Requirements

- `kubectl` >= 1.28
- `helm` >= 3.12
- `terraform` >= 1.6
- `aws-cli` >= 2.0
- `gh` >= 2.40
- Kubernetes cluster (any cloud)

## Version History

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Contributing

1. Check `.superpowers/imports.yaml` — does the skill already exist?
2. Create `skills/[category]/[skill-name].md` for new skills
3. Use `agents/custom/template.md` for new agents
4. Open a PR for review

## License

MIT

---

**DevOps Superpowers** — Built on the shoulders of the SRE community
