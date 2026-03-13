# Skill: diagram-generator

## Purpose
Produces infrastructure diagrams from live state or descriptions. Generates Mermaid, PlantUML, or ASCII art diagrams for Kubernetes clusters, VPCs, service meshes, and architectures.

## Inputs
- `target`: Target to diagram (cluster name, VPC ID, service mesh, or description)
- `type`: topology | architecture | network | data-flow
- `format`: mermaid | plantuml | ascii
- `include_labels`: Include resource labels as metadata
- `depth`: Detail level (overview | summary | detailed)

## Outputs
- Diagram in requested format:
  - **Mermaid**: Ready for GitHub/GitLab markdown
  - **PlantUML**: For detailed UML diagrams
  - **ASCII**: For terminal-friendly viewing
- Optional: SVG/PNG rendering (if tools available)
- Metadata summary of resources in diagram

## Tools Used
- `kubectl`: Get K8s resources for cluster diagrams
- `aws-cli`: Get VPC, subnet, EC2, RDS for network diagrams
- `terraform show`: Get infrastructure state for diagrams
- `mermaid-cli`: Render diagrams to images

## Read-Only
Yes. This skill only reads infrastructure state and generates diagram code. No resources are modified.

## Example Invocations
```
diagram-generator target:prod-eks type:topology format:mermaid
diagram-generator target:vpc-prod type:network format:ascii
diagram-generator target:"microservices architecture" type:architecture format:mermaid depth:detailed
/diagram cluster:prod --format mermaid
```
