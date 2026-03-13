# Command: /deploy

Maps to the **Deployer** agent (engineer privilege).

## Syntax

```
/deploy <target> [flags]
```

## Description

Deploy a service with strategy selection. Supports canary, blue-green, and rolling deployments.

## Flags

| Flag | Description | Required |
|---|---|---|
| `--env` | Target environment (prod, staging, dev) | Yes |
| `--service` | Target service name | Yes |
| `--image` | New image tag (e.g., v2.1.0) | Yes |
| `--strategy` | Deployment strategy (canary, blue-green, rolling) | No |
| `--canary-pct` | Canary traffic percentage (5, 10, 25, 50, 100) | No |
| `--dry-run` | Show plan without executing | No |
| `--confirm` | Skip confirmation prompt | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |

## Examples

```bash
/deploy service:payments image:v2.1.0 --env prod --strategy canary --canary-pct 5
/deploy service:api image:v1.5.2 --env staging --strategy rolling
/deploy service:worker image:v3.0.0 --env prod --strategy blue-green --dry-run
/deploy service:payments image:v2.1.0 --env prod --confirm
```

## Deployment Checklist

- [ ] Change freeze check (no deploys during freeze windows)
- [ ] SLO baseline captured (before state)
- [ ] Rollback plan documented
- [ ] Smoke test suite available
- [ ] On-call notified
- [ ] Canary traffic percentage confirmed
- [ ] Blast radius analysis complete

## Agent: Deployer

**Privilege:** `engineer`

**Capabilities:**
- Plan and execute zero-downtime deployments
- Canary rollout with automatic metric-gated progression
- Blue-green switch with instant rollback
- Feature flag management (LaunchDarkly / Unleash)
- Helm chart upgrades with diff preview
- ArgoCD sync with manual gate for production
- Post-deploy validation (smoke tests, SLO check)
- Automatic rollback on SLO breach

## Constraints

- Requires explicit confirmation for production deployments
- Always captures SLO baseline before deploying
- Automatic rollback if SLO breach detected (error rate > baseline × 1.5)
