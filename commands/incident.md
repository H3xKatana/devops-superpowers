# Command: /incident

Maps to the **Incident Commander** agent (engineer privilege).

## Syntax

```
/incident <action> [flags]
```

## Description

Declare or manage an incident. Coordinates incident response from detection to resolution and postmortem.

## Actions

| Action | Description |
|---|---|
| `declare` | Declare a new incident |
| `update` | Update incident status |
| `resolve` | Resolve an incident |
| `status` | Get incident status |

## Flags

| Flag | Description | Required |
|---|---|---|
| `--sev` | Severity (sev1, sev2, sev3, sev4) | Yes (for declare) |
| `--title` | Incident title | Yes (for declare) |
| `--env` | Target environment | No |
| `--service` | Affected service | No |
| `--confirm` | Skip confirmation prompt | No |
| `--output` | Output format (json, yaml, md, table) | No |
| `--verbose` | Include full context in output | No |
| `--since` | Time range start | No |
| `--until` | Time range end | No |

## Examples

```bash
/incident declare sev:2 title:"Payment API 500 spike"
/incident resolve INC-2024-042
/incident update --id INC-2024-042 --status mitigating
/incident status --env prod
```

## Agent: Incident Commander

**Privilege:** `engineer`

**Capabilities:**
- Declare incident (SEV1-SEV4) and create war room
- Auto-assemble timeline from logs, metrics, and deploys
- Correlate symptoms across services
- Suggest and track mitigation actions
- Draft real-time status page updates
- Capture all decisions and actions for postmortem
- Generate blameless postmortem document
- Track action items to closure

## Incident Response Flow

```
DETECT → DECLARE (SEV) → ASSEMBLE → DIAGNOSE → MITIGATE → RESOLVE → POSTMORTEM → TRACK
```

## SLA Targets per Severity

| SEV | Time to Acknowledge | Time to Mitigate | Postmortem Due |
|---|---|---|---|
| SEV1 | 5 min | 30 min | 24 hours |
| SEV2 | 15 min | 2 hours | 48 hours |
| SEV3 | 1 hour | 8 hours | 1 week |
| SEV4 | 4 hours | Next sprint | Optional |
