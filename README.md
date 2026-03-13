# DevOps Superpowers

An open-source, agentic AI ecosystem for DevOps and Site Reliability Engineers (SREs). Built on the [Superpowers](https://github.com/superpowers) framework.

## Overview

DevOps Superpowers provides pre-wired AI agents, slash commands, and skills that understand your infrastructure, incident runbooks, SLOs, and deployment pipelines. It brings SRE methodology to every operation through intelligent automation.

---

## Installation

Choose your AI coding assistant and follow the installation guide.

### Prerequisites

```bash
# Common prerequisites
git, curl, jq, yq
```

---

### OpenCode

```bash
# macOS
brew install opencodeai/opencode/opencode

# Linux
curl -L https://opencode.ai/install.sh | sh

# Verify
opencode --version
```

**Quick Install DevOps Superpowers:**

```bash
# Light install (skills only)
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers
cp -r skills/ ~/.config/opencode/skills/devops-superpowers/

# Full install (agents + skills)
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers
cp -r skills/ ~/.config/opencode/skills/devops-superpowers/
cp -r agents/ ~/.config/opencode/agents/devops-superpowers/
```

---

### Claude Code (Claude CLI)

```bash
# macOS
brew install anthropic/claude/claude

# Linux/Windows (via curl)
curl -s https://anthropic.com/claude-cli/install.sh | sh

# Verify
claude --version
```

**Quick Install DevOps Superpowers:**

```bash
# Light install (skills only)
git clone https://github.com/your-org/devops-superpowers.git
mkdir -p ~/.claude/skills/devops-superpowers
cp -r skills/* ~/.claude/skills/devops-superpowers/

# Full install (agents + skills)
git clone https://github.com/your-org/devops-superpowers.git
mkdir -p ~/.claude/skills/devops-superpowers
mkdir -p ~/.claude/agents/devops-superpowers
cp -r skills/* ~/.claude/skills/devops-superpowers/
cp -r agents/* ~/.claude/agents/devops-superpowers/
```

---

### QwenCode (阿里云通义灵码)

```bash
# VS Code Extension
code --install-extension alibaba.tongyi-lingma

# JetBrains IDEs
# Install from JetBrains Marketplace

# CLI (if available)
npm install -g @qwen/qwen-code
```

**Quick Install DevOps Superpowers:**

```bash
# Light install (skills only)
git clone https://github.com/your-org/devops-superpowers.git
cp -r skills/ ~/.qwen-code/skills/devops-superpowers/

# Full install (agents + skills)
git clone https://github.com/your-org/devops-superpowers.git
cp -r skills/ ~/.qwen-code/skills/devops-superpowers/
cp -r agents/ ~/.qwen-code/agents/devops-superpowers/
```

---

### Gemini Code (Google Gemini CLI)

```bash
# Install via npm
npm install -g @google/gemini-cli

# Verify
gemini --version
```

**Quick Install DevOps Superpowers:**

```bash
# Light install (skills only)
git clone https://github.com/your-org/devops-superpowers.git
mkdir -p ~/.gemini/skills/devops-superpowers
cp -r skills/* ~/.gemini/skills/devops-superpowers/

# Full install (agents + skills)
git clone https://github.com/your-org/devops-superpowers.git
mkdir -p ~/.gemini/skills/devops-superpowers
mkdir -p ~/.gemini/agents/devops-superpowers
cp -r skills/* ~/.gemini/skills/devops-superpowers/
cp -r agents/* ~/.gemini/agents/devops-superpowers/
```

---

## Installation Types

### Light Install (Skills Only)

Best for: Adding DevOps capabilities to existing AI agents

```bash
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers

# Copy skills to your AI tool's skills directory
# See specific tool instructions above
```

**What's included:**
- 20 skills across 5 categories (infrastructure, deployments, observability, security, documentation)
- Slash commands
- Workflows
- Vault schema

### Full Install (Agents + Skills)

Best for: Complete DevOps agentic ecosystem

```bash
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers

# Copy skills AND agents
# See specific tool instructions above
```

**What's included:**
- Everything in light install
- 7 core agents (Inspector, Operator, Deployer, Incident Commander, SRE Advisor, Architect, Doc Writer)
- Custom agent templates

---

## Use Cases

### 1. Infrastructure Exploration

```mermaid
flowchart LR
    A[User] --> B[/inspect]
    B --> C[Inspector Agent]
    C --> D[Collect Context]
    D --> E[Kubernetes]
    D --> E2[AWS/GCP/Azure]
    D --> E3[Terraform State]
    E --> F[Map Topology]
    E2 --> F
    E3 --> F
    F --> G[Return Results]
```

### 2. Zero-Downtime Deployment

```mermaid
flowchart TD
    A[User] --> B[/deploy canary]
    B --> C[Deployer Agent]
    C --> D{Pre-checks}
    D -->|Fail| E[Abort & Notify]
    D -->|Pass| F[Deploy 5% Canary]
    F --> G[Monitor SLOs]
    G --> H{Healthy?}
    H -->|Yes| I[Promote 25%]
    H -->|No| J[Auto Rollback]
    I --> K[Promote 50%]
    K --> L[Promote 100%]
    L --> M[Success]
```

### 3. Incident Response

```mermaid
flowchart LR
    A[Alert] --> B[/incident declare]
    B --> C[Incident Commander]
    C --> D[Create War Room]
    D --> E[Assemble Timeline]
    E --> F[Analyze Logs]
    E --> F2[Check Metrics]
    E --> F3[Review Deploys]
    F --> G[Suggest Mitigations]
    F2 --> G
    F3 --> G
    G --> H[Engineer Action]
    H --> I[Resolve]
    I --> J[Generate Postmortem]
```

### 4. SRE Advisory

```mermaid
flowchart TD
    A[User] --> B[/slo query]
    B --> C[SRE Advisor]
    C --> D[Fetch SLO Data]
    D --> E[Calculate Error Budget]
    E --> F{Burn Rate}
    F -->|>50%| G[Deploy Freeze]
    F -->|25-50%| H[Elevated Caution]
    F -->|>50%| I[Normal Ops]
    G --> J[Remediation Plan]
    H --> J
    I --> K[Report]
    J --> K
    K --> L[Recommendations]
```

---

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

---

## Documentation

- [Getting Started](docs/getting-started.md) — Setup and first deployment
- [Vault Setup](docs/vault-setup.md) — Detailed vault configuration
- [SRE Methodology](docs/sre-methodology.md) — SLOs, error budgets, DORA
- [Architecture](docs/architecture.md) — System design overview

---

## Requirements

- `kubectl` >= 1.28
- `helm` >= 3.12
- `terraform` >= 1.6
- `aws-cli` >= 2.0
- `gh` >= 2.40
- Kubernetes cluster (any cloud)

---

## Version History

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Contributing

1. Check `.superpowers/imports.yaml` — does the skill already exist?
2. Create `skills/[category]/[skill-name].md` for new skills
3. Use `agents/custom/template.md` for new agents
4. Open a PR for review

---

## License

MIT

---

**DevOps Superpowers** — Built on the shoulders of the SRE community
