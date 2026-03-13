# Skill: iam-reviewer

## Purpose
Reviews IAM roles and policies for over-privileged access. Identifies overly permissive policies, unused permissions, and provides least-privilege recommendations.

## Inputs
- `cloud_account`: Cloud account ID
- `service_filter`: Optional service filter (e.g., "ec2", "s3", "lambda")
- `identity_filter`: Optional identity filter (role name, user, group)
- `analysis_type`: permissions | access | unused

## Outputs
- IAM review report with:
  - Overly permissive roles/policies (excessive privileges)
  - Privilege escalation paths identified
  - Unused permissions (permissions granted but never used in 30 days)
  - Cross-account access analysis
  - Service account key rotation status
  - Least-privilege recommendations with:
    - Current policy
    - Recommended policy
    - Impact assessment

## Tools Used
- `aws-iam`: Query IAM policies and role mappings
- `gcloud iam`: Query GCP IAM policies
- `az role`: Query Azure RBAC
- `cloudtrail`: Analyze actual API usage for unused permissions
- `kubectl`: Review K8s RBAC (ClusterRoles, ServiceAccounts)

## Read-Only
Yes. This skill only reads IAM policies and CloudTrail logs to analyze permissions. No IAM policies are modified.

## Example Invocations
```
iam-reviewer cloud_account:123456789012
iam-reviewer cloud_account:123456789012 service_filter:lambda
iam-reviewer cloud_account:prod analysis_type:unused
iam-reviewer cloud_account:staging identity_filter:deploy-bot
/iam --env prod
```
