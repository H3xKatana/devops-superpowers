# Command: /rollback

Maps to the **Deployer** agent (engineer privilege).

## Syntax

```
/rollback <target> [flags]
```

## Description

Instantly revert a deployment to the previous known-good state. Fastest possible operation — no confirmations required once invoked.

## Flags

| Flag | Description | Required |
|---|---|---|
| `--env` | Target environment (prod, staging, dev) | Yes |
| `--service` | Target service name | Yes |
| `--confirm` | Skip confirmation prompt (recommended for emergencies) | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |

## Examples

```bash
/rollback service:payments --env prod
/rollback service:api --env staging --confirm
/rollback --env prod --service payments --verbose
```

## Agent: Deployer

**Privilege:** `engineer`

**Capabilities:**
- Instantly revert to previous known-good state
- Blue-green switch back to stable environment
- Helm rollback to previous release
- ArgoCD rollback to previous revision
- Post-rollback health verification

## Constraints

- Only reverts to immediate previous version
- Does not analyze root cause of failure (use /inspect first)
- Requires --confirm for non-emergency rollbacks in production
