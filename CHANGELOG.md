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
- **Architect Agent** — Architecture design and ADR generation
- **Doc Writer Agent** — Runbooks, postmortems, and documentation generation

### Added (Observability & Documentation)

- **Observability Skills:** slo-tracker, alert-analyzer, log-investigator, trace-analyzer
- **Documentation Skills:** runbook-generator, adr-writer, postmortem-writer, diagram-generator
- **Security Skills:** secret-scanner, cve-checker, compliance-auditor, iam-reviewer

### Added (Commands)

- Core Slash Commands: `/inspect`, `/deploy`, `/rollback`, `/incident`, `/slo`
- Additional Commands: `/audit`, `/plan`, `/document`, `/cost`, `/drift`, `/canary`, `/runbook`, `/postmortem`, `/capacity`, `/cve`, `/iam`

### Added (Workflows)

- Zero-Downtime Deployment Workflow
- Incident Response Workflow
- Disaster Recovery Workflow
- Capacity Review Workflow
- New Engineer Onboarding Workflow

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

- [ ] DORA metrics dashboard
- [ ] Toil registry schema
- [ ] Error budget automation

### v0.3 — Security & Compliance

- [ ] Audit log framework
- [ ] Policy-as-code (OPA) integration

### v1.0 — Production-Ready

- [ ] Full test suite for all skills
- [ ] Multi-cloud support (AWS + GCP + Azure)
- [ ] Agent marketplace (community agents)
- [ ] Web UI for Vault management
- [ ] SSO integration
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
