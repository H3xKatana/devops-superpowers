# Getting Started with DevOps Superpowers

Welcome to DevOps Superpowers — an open-source, agentic AI ecosystem for DevOps and Site Reliability Engineers.

## Prerequisites

Before you begin, ensure you have the following installed:

- **CLI Tools Required:**
  - `kubectl` >= 1.28
  - `helm` >= 3.12
  - `terraform` >= 1.6
  - `aws-cli` >= 2.0
  - `gh` (GitHub CLI) >= 2.40
  - `docker`
  - `jq` and `yq`

- **Environment:**
  - Access to your cloud provider (AWS, GCP, or Azure)
  - A running Kubernetes cluster
  - GitHub account with appropriate permissions

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/devops-superpowers.git
cd devops-superpowers
```

### 2. Set Up the Vault

The Vault stores all secrets and infrastructure configuration. See [vault-setup.md](vault-setup.md) for detailed instructions.

```bash
# Copy the example inventory template
cp vault/inventory.yaml.example vault/inventory.yaml

# Edit with your environment variables
# NEVER commit real secrets — use ${VAR} references
```

### 3. Configure Environment Variables

Create a `.env` file (never committed) with your secrets:

```bash
# Example .env file
AWS_ACCOUNT_ID=123456789012
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
# ... other variables
```

### 4. Import External Skills

DevOps Superpowers imports skills from the Superpowers registry:

```bash
# Skills are automatically imported on first run
# Manual import:
superpowers import github-cli
superpowers import kubectl
superpowers import terraform
```

### 5. Verify Installation

```bash
# Run the Inspector agent to verify setup
superpowers run inspector --check
```

## Core Concepts

### Agents

DevOps Superpowers provides specialized AI agents:

| Agent | Privilege | Purpose |
|-------|-----------|---------|
| Inspector | readonly | Safe infrastructure exploration |
| Operator | operator | Day-to-day operational tasks |
| Deployer | engineer | Deployment lifecycle management |
| Incident Commander | engineer | Incident response coordination |
| SRE Advisor | readonly | SLO and reliability guidance |
| Architect | readonly | Architecture design and ADRs |
| Doc Writer | readonly | Documentation generation |

### Slash Commands

The primary interface for invoking agents:

```bash
/inspect cluster prod-eks
/deploy service:payments image:v2.1.0 --env prod --strategy canary
/rollback service:payments --env prod
/incident declare sev:2 title:"Payment API 500 spike"
/slo service:payments --since 7d
```

### Context Collection Protocol

Every agent follows this protocol:

```
COLLECT → ANALYZE → PLAN → CONFIRM → EXECUTE → VERIFY → REPORT
```

1. **COLLECT:** Gather infrastructure state
2. **ANALYZE:** Identify risks and dependencies
3. **PLAN:** Produce execution plan with rollback
4. **CONFIRM:** Require explicit approval for writes
5. **EXECUTE:** Perform the action
6. **VERIFY:** Confirm desired state achieved
7. **REPORT:** Produce structured summary

## Your First Deployment

### Step 1: Inspect the Service

```bash
/inspect service:payments --env staging
```

### Step 2: Check SLO Status

```bash
/slo service:payments --env staging
```

### Step 3: Deploy with Canary

```bash
/deploy service:payments image:v2.1.0 --env staging --strategy canary --canary-pct 5
```

### Step 4: Monitor and Promote

The Deployer agent will:
- Deploy 5% canary traffic
- Monitor error rate and latency
- Automatically promote or rollback based on SLO gates

## Security Model

- **Least Privilege:** Agents use minimum credentials required
- **No Secrets in Prompts:** All secrets resolved at runtime from Vault
- **Audit Logging:** All actions logged with user, timestamp, and outcome
- **2-Person Authorization:** Production changes may require approval

## Next Steps

- **[Vault Setup](vault-setup.md)** — Detailed vault configuration
- **[SRE Methodology](sre-methodology.md)** — SLOs, error budgets, DORA metrics
- **[Architecture](architecture.md)** — System design overview

## Troubleshooting

### Permission Denied

Ensure your Vault credentials have the correct privilege level for the action you're attempting.

### Agent Not Responding

Check that all required CLI tools are installed and accessible in your PATH.

### Vault Resolution Failed

Verify your `.env` file is properly configured and environment variables are exported.

## Getting Help

- GitHub Issues: Report bugs and feature requests
- Documentation: See the `docs/` folder for detailed guides
- Slack: Join the DevOps Superpowers community
