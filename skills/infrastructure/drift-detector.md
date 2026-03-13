# Skill: drift-detector

## Purpose
Compares live infrastructure state against declared Terraform or Helm state to identify drift. Detects resources that were modified, deleted, or added outside of the IaC pipeline.

## Inputs
- `target`: Terraform workspace (e.g., "production") or Helm release (e.g., "nginx-ingress")
- `provider`: terraform | helm
- `ignore_changes`: Optional list of fields to ignore (e.g., ["tags", "metadata.annotations"])

## Outputs
- Drift report with three categories:
  - **Added**: Resources in live state but not in IaC
  - **Changed**: Resources that differ between live and IaC
  - **Removed**: Resources in IaC but deleted from live state
- Severity assessment for each drift item
- Recommended remediation actions

## Tools Used
- `terraform plan`: Compare Terraform state against live resources
- `helm diff`: Compare Helm releases against rendered manifests
- `kubectl get`: Compare K8s resource state
- `aws-cli` / `gcloud` / `az`: Query live cloud state for comparison

## Read-Only
Yes. This skill runs `terraform plan` and `helm diff` which are read-only operations. No `terraform apply` or `helm upgrade` is executed.

## Example Invocations
```
drift-detector target:production provider:terraform
drift-detector target:nginx-ingress provider:helm
drift-detector target:staging provider:terraform ignore_changes:tags
/drift --env prod --service payments
```
