# Vault

The Vault is the single source of truth for all secrets, keys, tokens, and inventory that agents need to operate.

## Overview

The Vault follows these core principles:
- **Context First** — Never take action without collecting full infrastructure context
- **Secure by Default** — All secrets live in the Vault, no credentials in prompts or logs
- **Import First** — Use existing skills from Superpowers registry before writing new ones

## Structure

| File | Description |
|------|-------------|
| `schema.md` | Vault schema definition |
| `inventory.yaml.example` | Example inventory template |
| `README.md` | This file |

## Usage

1. Copy `inventory.yaml.example` to `inventory.yaml`
2. Replace `${VAR}` placeholders with actual environment variable names
3. Never commit real secrets — use environment references or a secrets manager

## Resolution

All `${VAR}` references are resolved from:
- Environment variables
- `.env` files (never committed)
- Secrets managers (HashiCorp Vault, AWS Secrets Manager, etc.)

## Security Rules

1. No secrets in prompts, chat history, or log output
2. Vault resolution happens server-side before agent execution
3. All secret access is audit-logged
4. SSH private keys are path references only — never inline

## Contributing

See [SPEC.md](../SPEC.md) for full vault schema details.
