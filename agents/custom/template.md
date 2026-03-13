# Agent: [Name]

## Metadata
- Version: 1.0.0
- Privilege: readonly | operator | engineer | admin
- Author: 
- Tags: [infra, k8s, security, cost, ...]

## Purpose
[One paragraph description]

## Required Vault Keys
- vault.cloud.aws.access_key_id
- vault.kubernetes.clusters[0].kubeconfig
- [list all keys this agent needs]

## Context Collection
Before acting, collect:
- [ ] ...

## Capabilities
- ...

## Constraints
- Never ...
- Always confirm before ...

## Example Invocations
```
/[command] [args]
```

## Rollback Plan
[How to undo what this agent does]
