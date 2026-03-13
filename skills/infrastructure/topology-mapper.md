# Skill: topology-mapper

## Purpose
Discovers and maps the complete topology of a cloud environment (AWS/GCP/Azure) and Kubernetes clusters. Produces a JSON topology graph and Mermaid diagram for visual representation of infrastructure relationships.

## Inputs
- `cloud_provider`: aws | gcp | azure
- `region`: AWS region, GCP zone, or Azure region
- `filters`: Optional resource filters (VPC ID, tag filters, namespace filters)
- `include_k8s`: Include Kubernetes cluster topology (boolean, default: true)

## Outputs
- JSON topology graph with nodes and edges representing resources
- Mermaid diagram for visual representation
- Summary of resource counts by type
- Identification of cross-service dependencies

## Tools Used
- `aws-cli`: Describe VPCs, EC2 instances, RDS, ELB, Lambda, EKS
- `gcloud`: Describe GCP resources (Compute Engine, GKE, Cloud SQL)
- `az`: Describe Azure resources (VMs, AKS, Azure SQL)
- `kubectl`: Get nodes, namespaces, services, deployments, ingresses
- `terraform show`: Read Terraform state for declared resources

## Read-Only
Yes. This skill only reads and visualizes infrastructure state. No modifications are made.

## Example Invocations
```
topology-mapper cloud_provider:aws region:us-east-1
topology-mapper cloud_provider:gcp region:us-central1 include_k8s:true
topology-mapper cloud_provider:azure region:eastus filters:vpc:vpc-prod
/topology-mapper --provider aws --region us-west-2 --output json
```
