# Skill: feature-flags

## Purpose
Manages feature flag state across environments. Enables, disables, or adjusts feature rollout percentages for LaunchDarkly, Unleash, or custom feature flag systems.

## Inputs
- `flag_name`: Feature flag key/name
- `action`: enable | disable | percentage | schedule
- `target_segments`: Optional user segments to target (e.g., "beta-users", "internal")
- `percentage`: Rollout percentage (0-100) for percentage action
- `environment`: Target environment (prod | staging | dev)
- `flag_provider`: launchdarkly | unleash | custom

## Outputs
- Flag state confirmation with:
  - Current flag state
  - Affected user estimate (if percentage-based)
  - Scheduled changes (if applicable)
  - Audit log entry

## Tools Used
- `launchdarkly-api`: Manage LaunchDarkly flags
- `unleash-api`: Manage Unleash flags
- `kubectl`: For custom flag implementations stored in ConfigMaps
- `gh`: Update flag configurations in git

## Read-Only
No. This skill modifies feature flag state in the flag provider.

## Example Invocations
```
feature-flags flag_name:new-payment-flow action:enable environment:prod
feature-flags flag_name:dark-mode action:percentage percentage:50 environment:staging
feature-flags flag_name:beta-feature action:disable target_segments:external-users
/feature-flag enable payments-api --env prod
```
