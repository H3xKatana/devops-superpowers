# Command: /audit

Maps to the **Inspector** agent (readonly) for security.

## Syntax

```
/audit <target> [flags]
```

## Description

Security and compliance audit. Read-only exploration of security posture.

## Targets

| Target | Description |
|---|---|
| `iam` | IAM permission audit |
| `cve` | CVE scan of running images |
| `compliance` | Compliance framework audit (CIS, SOC2, PCI-DSS) |
| `secrets` | Secret scanner |
| `access` | User access review |

## Flags

| Flag | Description | Required |
|---|---|---|
| `--framework` | Compliance framework (cis-k8s, cis-aws, soc2, pci-dss) | No |
| `--env` | Target environment | No |
| `--service` | Target service | No |
| `--since` | Time range start | No |
| `--until` | Time range end | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |
| `--dry-run` | Show plan without executing | No |

## Examples

```bash
/audit --framework cis-k8s --env prod
/audit iam --env prod
/audit cve --env prod --service payments
/audit compliance --framework soc2 --env prod
/audit secrets --env prod --output table
```

## Agent: Inspector

**Privilege:** `readonly`

**Security Capabilities:**
- Secret-scanner: Scans repositories and configs for accidentally committed secrets
- CVE-checker: Checks running container images against known CVE databases
- Compliance-auditor: Audits infrastructure against compliance frameworks (CIS, SOC2, PCI-DSS)
- IAM-reviewer: Reviews IAM roles and policies for over-privileged access

## Tools Used

- `truffleHog`, `gitleaks` (secret scanning)
- `trivy`, `grype` (CVE scanning)
- `aws-config` / `prowler` (compliance)
- AWS IAM Access Analyzer
