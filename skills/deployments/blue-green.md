# Skill: blue-green

## Purpose
Manages blue-green environment switching for zero-downtime deployments. Maintains two identical production environments and switches traffic atomically between them. Enables instant rollback by switching back to the previous environment.

## Inputs
- `service`: Service name to deploy
- `target_environment`: blue | green (the environment to receive traffic)
- `health_check_url`: URL to verify new environment health
- `pre_flight_checks`: Optional list of checks to run before switch

## Outputs
- Blue-green switch report with:
  - Pre-switch health check results
  - Traffic switch confirmation
  - Post-switch validation results
  - Rollback command if needed

## Tools Used
- `kubectl`: Update service selectors, manage deployments
- `aws-cli`: Update Route53, ALB target groups
- `argocd`: Sync and manage blue-green applications
- `helm`: Manage Helm releases in both environments

## Read-Only
No. This skill modifies Kubernetes services, load balancers, or DNS records to switch traffic.

## Example Invocations
```
blue-green service:payments target_environment:green health_check_url:https://payments.example.com/health
blue-green service:api-gateway target_environment:blue
/blue-green service:payments --target green
```
