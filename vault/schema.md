# Vault Schema

This document defines the schema for the DevOps Superpowers Vault — the single source of truth for all secrets, keys, tokens, and inventory.

## Core Principles

1. **Never hardcode secrets** — All values reference environment variables or secrets managers
2. **Runtime resolution** — Agents receive resolved references, never raw values
3. **Least privilege** — Readonly agents get readonly-scoped credentials
4. **Audit trail** — All vault access is logged

## Top-Level Structure

| Section | Description |
|---------|-------------|
| `metadata` | Environment, owner, last_updated |
| `cloud` | AWS, GCP, Azure credentials |
| `kubernetes` | Cluster configs and kubeconfig paths |
| `vcs` | GitHub, GitLab tokens |
| `cicd` | Jenkins, ArgoCD credentials |
| `observability` | Datadog, PagerDuty, Grafana, Prometheus |
| `infrastructure` | Terraform state, HashiCorp Vault |
| `ssh` | SSH keys and bastion hosts |
| `databases` | PostgreSQL, Redis connection details |
| `messaging` | Kafka brokers and credentials |
| `communication` | Slack, PagerDuty webhooks |
| `cli_tools` | Available CLI tools and versions |

## Resolution Rules

1. All `${VAR}` references are resolved from environment variables
2. Agents receive a resolved vault reference object at runtime
3. Readonly agents receive only read-scoped credentials
4. Schema changes require PR review and `vault/CHANGELOG.md` entry

## Security

- No secrets in prompts, chat history, or logs
- Vault resolution happens server-side before agent execution
- All secret access is audit-logged
- SSH private keys are path references only — never inline
