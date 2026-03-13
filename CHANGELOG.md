# Changelog

All notable changes to DevOps Superpowers are documented in this file.

---

## Beta v0.1 — Foundation

### Added

- **Vault Schema** — Complete vault schema definition (`vault/inventory.yaml.example`)
- **Inspector Agent** — Read-only exploration agent for safe infrastructure discovery
- **Operator Agent** — Day-to-day operational tasks with confirmation workflow
- **Deployer Agent** — Full deployment lifecycle with canary and blue-green strategies
- **Incident Commander Agent** — Incident response coordination from detection to postmortem
- **SRE Advisor Agent** — Basic SLO tracking and error budget monitoring
- **Core Slash Commands:**
  - `/inspect` — Infrastructure exploration
  - `/deploy` — Deployment with strategy selection
  - `/rollback` — Instant rollback to previous state
  - `/incident` — Declare and manage incidents
  - `/slo` — Query SLO status and error budgets

- **External Skill Imports** — Manifest for importing skills from Superpowers registry
- **SLO YAML Schema** — Standard format for defining service-level objectives
- **Zero-Downtime Deployment Workflow** — Complete workflow with canary gates
- **Incident Response Workflow** — Detection through resolution and postmortem

### Features

- **Context Collection Protocol** — Every agent follows COLLECT → ANALYZE → PLAN → CONFIRM → EXECUTE → VERIFY → REPORT
- **Agent Privilege Levels** — Four levels: readonly, operator, engineer, admin
- **Error Budget Policy** — Automated deploy restrictions based on remaining budget
- **Sensitive Output Masking** — Automatic masking of secrets in logs

### Documentation

- Complete SPEC.md with full system specification

---

## Upcoming Releases

### Beta v0.2 — Observability & Documentation

- [ ] Architect Agent
- [ ] Doc Writer Agent
- [ ] All observability skills (slo-tracker, alert-analyzer, log-investigator, trace-analyzer)
- [ ] runbook-generator skill
- [ ] postmortem-writer skill
- [ ] `/document`, `/runbook`, `/postmortem` commands
- [ ] DORA metrics dashboard

### v0.3 — Security & Compliance

- [ ] secret-scanner skill
- [ ] cve-checker skill
- [ ] compliance-auditor skill
- [ ] iam-reviewer skill
- [ ] `/audit`, `/cve`, `/iam` commands
- [ ] Audit log framework

### v0.4 — Cost & Capacity

- [ ] capacity-planner skill
- [ ] cost-analyzer skill
- [ ] drift-detector enhanced
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

## Versioning

DevOps Superpowers follows [Semantic Versioning](https://semver.org/):

- **Beta** — Pre-production, unstable API
- **v1.0** — Production-ready

### Version Format

`vMAJOR.MINOR.PATCH`

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

---

## Upgrade Guide

### Upgrading from Beta v0.1 to v0.2

1. Pull latest changes
2. Review new vault schema additions
3. Update inventory.yaml with new required fields
4. Run `superpowers migrate`

---

*DevOps Superpowers — Beta v0.1 — Built on the shoulders of the SRE community*
