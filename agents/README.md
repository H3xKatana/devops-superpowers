# Agents

Agents are the autonomous entities that execute DevOps operations. Each agent has a specific role, privilege level, and set of capabilities.

## Core Agents

| Agent | Privilege | Purpose |
|-------|-----------|---------|
| `inspector` | readonly | Safe exploration of infrastructure state |
| `operator` | operator | Day-to-day operational tasks |
| `deployer` | engineer | Full deployment lifecycle management |
| `incident-commander` | engineer | Coordinate incident response |
| `sre-advisor` | readonly | SLO tracking and reliability recommendations |
| `architect` | readonly | Architecture design and documentation |
| `doc-writer` | readonly | Generate operational documentation |

## Privilege Levels

| Level | Can Read | Can Write | Can Destroy | Requires 2nd Approval |
|-------|----------|-----------|-------------|----------------------|
| `readonly` | ✅ | ❌ | ❌ | ❌ |
| `operator` | ✅ | ✅ | ❌ | ❌ |
| `engineer` | ✅ | ✅ | ✅ (staging) | ❌ |
| `admin` | ✅ | ✅ | ✅ (prod) | ✅ |

## Context Collection Protocol

Every agent follows this protocol before taking action:

```
COLLECT → ANALYZE → PLAN → CONFIRM → EXECUTE → VERIFY → REPORT
```

## Custom Agents

Place custom agent definitions in `agents/custom/` using `template.md` as a template.

## Files

- `core/` — Core agent definitions
- `custom/` — User-defined agents
- `README.md` — This file
