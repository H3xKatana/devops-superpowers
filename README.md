# DevOps Superpowers

An open-source, agentic AI ecosystem for DevOps and Site Reliability Engineers (SREs). Built on the [Superpowers](https://github.com/superpowers) framework.

## How it works

DevOps Superpowers provides pre-wired AI agents, slash commands, and skills that understand your infrastructure, incident runbooks, SLOs, and deployment pipelines. It brings SRE methodology to every operation through intelligent automation.

The system activates automatically when you work with a coding agent on DevOps tasks. It doesn't just jump into executing commands—instead, it ensures proper context collection, planning, and verification at every step.

---

## Installation

### OpenCode

```bash
# Skills only
cp -r skills/ ~/.config/opencode/skills/devops-superpowers/

# Full (agents + skills)
cp -r skills/ ~/.config/opencode/skills/devops-superpowers/
cp -r agents/ ~/.config/opencode/skills/devops-superpowers/
```

---

## For LLMs

### OpenCode

Tell OpenCode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/H3xKatana/devops-superpowers/refs/heads/main/.opencode/INSTALL.md
```

---

## The Basic Workflow

1. **Infrastructure Inspection** - Use `/inspect` to safely explore infrastructure before taking action. The Inspector agent collects Kubernetes topology, cloud resources, Terraform state, and recent deployments.

2. **Planning** - When deploying or making changes, the system applies SRE methodology: checks change freezes, SLO status, and incident states before proceeding.

3. **Deployment** - Use `/deploy` with strategy selection (canary, blue-green, rolling). The system monitors metrics and automatically promotes or rolls back based on error rates and latency.

4. **Incident Response** - Use `/incident` to declare incidents. The Incident Commander creates war rooms, assembles timelines, suggests mitigations, and generates postmortems.

5. **SRE Advisory** - Use `/slo` to query SLO status. The system calculates error budget burn rate and applies appropriate deployment policies.

---

## What's Inside

### Agents

| Agent | Purpose |
|-------|---------|
| **Inspector** | Read-only infrastructure exploration |
| **Operator** | Day-to-day operational tasks |
| **Deployer** | Zero-downtime deployments (canary, blue-green) |
| **Incident Commander** | Full incident lifecycle management |
| **SRE Advisor** | SLO tracking, error budgets, toil identification |
| **Architect** | Architecture design and ADRs |
| **Doc Writer** | Runbooks, postmortems, documentation |

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

### Skills

**Infrastructure:** topology-mapper, drift-detector, capacity-planner, cost-analyzer

**Deployments:** canary-deploy, blue-green, rollback, feature-flags

**Observability:** slo-tracker, alert-analyzer, log-investigator, trace-analyzer

**Security:** secret-scanner, cve-checker, compliance-auditor, iam-reviewer

**Documentation:** runbook-generator, adr-writer, postmortem-writer, diagram-generator

---

## Core Tenets

| Tenet | Description |
|-------|-------------|
| **Context First** | Never take action without collecting full infrastructure context |
| **Read Before Write** | Dedicated read-only agent for safe exploration |
| **SRE Methodology** | Every action guided by SLOs, error budgets, toil reduction |
| **Secure by Default** | All secrets live in the Vault — never in prompts or logs |
| **Composable** | Skills are modular and import-first |

---

## Documentation

- [Getting Started](docs/getting-started.md) — Setup and first deployment
- [Vault Setup](docs/vault-setup.md) — Detailed vault configuration
- [SRE Methodology](docs/sre-methodology.md) — SLOs, error budgets, DORA
- [Architecture](docs/architecture.md) — System design overview
- [CHANGELOG](CHANGELOG.md) — Version history

---

## Contributing

1. Check `.superpowers/imports.yaml` — does the skill already exist?
2. Create `skills/[category]/[skill-name].md` for new skills
3. Use `agents/core/template.md` for new agents
4. Open a PR for review

---

## License

MIT License

---

**DevOps Superpowers** — Built on the [Superpowers](https://github.com/obra/superpowers) framework
