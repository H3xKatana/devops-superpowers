# Skill: compliance-auditor

## Purpose
Audits infrastructure against compliance frameworks (CIS, SOC2, PCI-DSS, HIPAA). Produces compliance scores, identifies failed controls, and provides remediation steps.

## Inputs
- `target`: Target to audit (AWS account, GCP project, Azure subscription, K8s cluster)
- `framework`: cis-aws | cis-k8s | soc2 | pci-dss | hipaa | custom
- `output_format`: json | yaml | html | pdf
- `include_remediation`: Include remediation steps (default: true)

## Outputs
- Compliance audit report with:
  - Overall compliance score (percentage)
  - Failed controls by category
  - Control-level details with:
    - Control ID and description
    - Current state
    - Failed check details
    - Remediation steps
    - Priority (critical, high, medium, low)
  - Recommendations summary

## Tools Used
- `aws-config`: Query AWS Config for compliance
- `prowler`: AWS security assessment
- `kube-bench`: CIS Kubernetes benchmark
- `gcloud security`: GCP security command center
- `az security`: Azure security center
- `datadog-api`: Query compliance monitoring

## Read-Only
Yes. This skill only reads and evaluates infrastructure against compliance rules. No resources are modified.

## Example Invocations
```
compliance-auditor target:123456789012 framework:cis-aws
compliance-auditor target:prod-eks framework:cis-k8s output_format:html
compliance-auditor target:my-project framework:soc2
/audit --framework cis-k8s --env prod
```
