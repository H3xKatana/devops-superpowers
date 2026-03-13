# Skill: rollback

## Purpose
Instantly reverts a deployment to the previous known-good state. Uses the fastest possible rollback mechanism available (Helm rollback, kubectl rollout, or image tag revert) with health verification.

## Inputs
- `service`: Service name to rollback
- `environment`: Target environment (prod | staging | dev)
- `revision`: Optional specific revision to rollback to (default: previous)
- `verify_health`: Run health checks after rollback (default: true)

## Outputs
- Rollback confirmation with:
  - Previous revision details
  - Rollback execution status
  - Health check results
  - Time to rollback (target: < 60 seconds)

## Tools Used
- `kubectl rollout undo`: Kubernetes deployment rollback
- `helm rollback`: Helm release rollback
- `argocd rollback`: ArgoCD application rollback
- `kubectl get pods`: Verify pod health post-rollback

## Read-Only
No. This skill reverts deployments to previous versions. It is a destructive operation in the sense of undoing a deploy, but it restores to a known-good state.

## Example Invocations
```
rollback service:payments environment:prod
rollback service:api-gateway environment:staging revision:3
rollback service:payments environment:prod verify_health:true
/rollback service:payments --env prod
```
