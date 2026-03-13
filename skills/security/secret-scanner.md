# Skill: secret-scanner

## Purpose
Scans repositories, commits, and configuration files for accidentally committed secrets. Detects API keys, passwords, private keys, tokens, and other sensitive credentials.

## Inputs
- `target`: Repository URL, local path, or commit range
- `scan_type`: repo | file | diff | history
- `exclude_patterns`: Optional patterns to exclude (e.g., "*.test.*", "fixtures/*")
- `secret_types`: Types of secrets to scan (default: all)

## Outputs
- Secret scanning report with:
  - Findings grouped by severity (critical, high, medium)
  - File path and line number for each finding
  - Secret type (AWS key, GitHub token, private key, etc.)
  - Note: Actual secret values are NEVER exposed
  - Recommended remediation actions

## Tools Used
- `trufflehog`: Scan for secrets in repositories
- `gitleaks`: Scan for secrets in git history
- `git-secrets`: Check for patterns in commits
- `aws-cli`: Validate and check for exposed AWS keys

## Read-Only
Yes. This skill only scans and detects secrets. It does not exfiltrate or use the secrets found.

## Example Invocations
```
secret-scanner target:https://github.com/org/repo scan_type:history
secret-scanner target:./config-files scan_type:file
secret-scanner target:HEAD~10..HEAD scan_type:diff
/audit secrets --repo org/repo
```
