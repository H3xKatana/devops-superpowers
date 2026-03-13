# Skill: cost-analyzer

## Purpose
Breaks down cloud spend by service, team, environment, and resource type. Identifies optimization opportunities such as idle resources, right-sizing recommendations, and reserved instance opportunities.

## Inputs
- `cloud_account`: Cloud account ID or alias
- `time_range`: Billing period (e.g., "30d", "current_month")
- `tag_filters`: Filter by tags (e.g., "team:platform", "env:prod")
- `group_by`: Group results by (service | team | environment | resource_type)

## Outputs
- Cost breakdown report with:
  - Total spend by service/team/environment
  - Top 10 costliest resources
  - Month-over-month trend analysis
  - Savings opportunities ranked by impact:
    - Idle resources ( unattached EBS volumes, unused Elastic IPs)
    - Right-sizing recommendations (overprovisioned instances)
    - Reserved instance/savings plan opportunities
    - Graviton/arm migration potential
    - Spot instance opportunities
  - Estimated annual savings

## Tools Used
- `aws-ce`: AWS Cost Explorer queries
- `gcloud billing`: GCP Cloud Billing queries
- `az cost management`: Azure Cost Management queries
- `kubectl`: Get K8s resource requests/limits for right-sizing

## Read-Only
Yes. This skill only reads billing data and provides recommendations. No resources are modified.

## Example Invocations
```
cost-analyzer cloud_account:123456789012 time_range:30d group_by:service
cost-analyzer cloud_account:prod time_range:current_month tag_filters:team:payments
/cost --env prod --since 30d --output table
```
