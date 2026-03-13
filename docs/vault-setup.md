# Vault Setup Guide

The Vault is the single source of truth for all secrets, keys, tokens, and inventory that agents need to operate. This guide covers detailed configuration.

## Overview

The Vault system:
- Stores all credentials as environment variable references
- Resolves secrets at runtime — never hardcodes values
- Enforces least-privilege access
- Provides audit logging for all secret access

## Directory Structure

```
vault/
├── schema.md              # Vault schema definition
├── inventory.yaml.example # Example inventory template
└── README.md             # This file
```

## Inventory Schema

The main configuration file is `vault/inventory.yaml`. Below is the complete schema:

### Metadata

```yaml
metadata:
  environment: production  # production | staging | dev
  owner: platform-team
  last_updated: 2025-01-01
```

### Cloud Providers

#### AWS

```yaml
cloud:
  aws:
    account_id: "${AWS_ACCOUNT_ID}"
    region: us-east-1
    access_key_id: "${AWS_ACCESS_KEY_ID}"
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}"
    role_arn: "${AWS_ROLE_ARN}"
    profile: default
```

#### GCP

```yaml
cloud:
  gcp:
    project_id: "${GCP_PROJECT_ID}"
    service_account_key: "${GCP_SA_KEY_PATH}"
```

#### Azure

```yaml
cloud:
  azure:
    subscription_id: "${AZURE_SUBSCRIPTION_ID}"
    tenant_id: "${AZURE_TENANT_ID}"
    client_id: "${AZURE_CLIENT_ID}"
    client_secret: "${AZURE_CLIENT_SECRET}"
```

### Kubernetes

```yaml
kubernetes:
  clusters:
    - name: prod-eks
      kubeconfig: "${KUBECONFIG_PROD}"
      context: prod-context
      readonly: false
    - name: staging-eks
      kubeconfig: "${KUBECONFIG_STAGING}"
      context: staging-context
      readonly: false
```

### Source Control (VCS)

```yaml
vcs:
  github:
    token: "${GITHUB_TOKEN}"
    org: my-org
    default_branch: main
  gitlab:
    token: "${GITLAB_TOKEN}"
    url: https://gitlab.mycompany.com
```

### CI/CD

```yaml
cicd:
  jenkins:
    url: "${JENKINS_URL}"
    user: "${JENKINS_USER}"
    token: "${JENKINS_TOKEN}"
  argocd:
    url: "${ARGOCD_URL}"
    token: "${ARGOCD_TOKEN}"
```

### Observability

```yaml
observability:
  datadog:
    api_key: "${DD_API_KEY}"
    app_key: "${DD_APP_KEY}"
    site: datadoghq.com
  pagerduty:
    api_key: "${PD_API_KEY}"
    service_id: "${PD_SERVICE_ID}"
  grafana:
    url: "${GRAFANA_URL}"
    token: "${GRAFANA_TOKEN}"
  prometheus:
    url: "${PROMETHEUS_URL}"
```

### Infrastructure

```yaml
infrastructure:
  terraform:
    state_bucket: "${TF_STATE_BUCKET}"
    lock_table: "${TF_LOCK_TABLE}"
    workspace: production
  vault:
    url: "${HCV_URL}"
    token: "${HCV_TOKEN}"
```

### SSH & Keys

```yaml
ssh:
  keys:
    - name: prod-bastion
      path: "${SSH_KEY_PROD}"
      user: ec2-user
      hosts:
        - bastion.prod.example.com
```

### Databases

```yaml
databases:
  postgres_prod:
    host: "${DB_HOST_PROD}"
    port: 5432
    user: "${DB_USER_PROD}"
    password: "${DB_PASS_PROD}"
    readonly_replica: "${DB_REPLICA_PROD}"
  redis:
    host: "${REDIS_HOST}"
    port: 6379
```

### Messaging & Queues

```yaml
messaging:
  kafka:
    brokers: "${KAFKA_BROKERS}"
    sasl_username: "${KAFKA_USER}"
    sasl_password: "${KAFKA_PASS}"
```

### Communication

```yaml
communication:
  slack:
    token: "${SLACK_TOKEN}"
    incident_channel: "#incidents"
    deploy_channel: "#deployments"
  pagerduty_webhook: "${PD_WEBHOOK}"
```

### CLI Tools

```yaml
cli_tools:
  - name: kubectl
    version: ">=1.28"
    installed: true
  - name: helm
    version: ">=3.12"
    installed: true
  - name: terraform
    version: ">=1.6"
    installed: true
  - name: aws-cli
    version: ">=2.0"
    installed: true
```

## Setting Up Your Vault

### Step 1: Copy the Example

```bash
cp vault/inventory.yaml.example vault/inventory.yaml
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Cloud Provider
export AWS_ACCOUNT_ID="123456789012"
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

# Kubernetes
export KUBECONFIG_PROD="/path/to/prod-kubeconfig"
export KUBECONFIG_STAGING="/path/to/staging-kubeconfig"

# VCS
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"

# CI/CD
export ARGOCD_URL="https://argocd.example.com"
export ARGOCD_TOKEN=""

# Observability
export DD_API_KEY=""
export GRAFANA_URL="https://grafana.example.com"
export GRAFANA_TOKEN=""

# ... add other variables as needed
```

**Important:** Never commit `.env` to version control. Add it to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

### Step 3: Validate Configuration

```bash
# Test vault resolution
superpowers vault validate

# Check for missing variables
superpowers vault check
```

### Step 4: Test Agent Access

```bash
# Test with Inspector (readonly)
superpowers run inspector --check

# Test with Operator (requires write access)
superpowers run operator --check
```

## Vault Resolution Rules

1. All `${VAR}` references resolve from environment variables
2. Agents receive resolved vault objects at runtime — never see raw values
3. Readonly agents receive read-scoped credentials only
4. Vault schema changes require PR review

## Secret Rotation

### Automatic Rotation

For HashiCorp Vault users:

```yaml
infrastructure:
  vault:
    url: "${HCV_URL}"
    token: "${HCV_TOKEN}"
    auth_method: kubernetes
    role: devops-superpowers
```

### Manual Rotation

To rotate credentials:

1. Update the environment variable
2. Restart the agent runtime
3. Verify access with Inspector

```bash
# Example: Rotate GitHub token
export GITHUB_TOKEN="new_token_here"
superpowers run inspector --verify
```

## Environment-Specific Vaults

Create separate inventory files per environment:

```
vault/
├── inventory.yaml          # Base configuration
├── inventory.prod.yaml     # Production overrides
├── inventory.staging.yaml # Staging overrides
└── inventory.dev.yaml      # Dev overrides
```

Load a specific environment:

```bash
superpowers --env production run deployer ...
```

## Security Best Practices

1. **Never hardcode secrets** — Always use `${VAR}` references
2. **Use IAM roles** — Prefer role assumption over access keys
3. **Enable audit logging** — Track all secret access
4. **Rotate regularly** — Set rotation schedules per secret type
5. **Use separate credentials** — Different credentials per environment

## Troubleshooting

### "Vault key not found"

- Verify the environment variable is set: `echo $VAR_NAME`
- Check the variable name matches exactly in inventory.yaml

### "Permission denied"

- Verify your IAM/role has the required permissions
- Check readonly flag in cluster configuration

### "Secret rotation failed"

- Check the secrets manager is accessible
- Verify credentials haven't expired
