# Installing DevOps Superpowers for Codex

Enable DevOps Superpowers skills in Codex via native skill discovery.

## Prerequisites

- Git
- Codex installed

## Installation

1. **Clone the DevOps Superpowers repository:**
   ```bash
   git clone https://github.com/H3xKatana/devops-superpowers.git ~/.codex/devops-superpowers
   ```

2. **Create the skills symlink:**
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/devops-superpowers/skills ~/.agents/skills/devops-superpowers
   ```

   **Windows (PowerShell):**
   ```powershell
   New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
   cmd /c mklink /J "$env:USERPROFILE\.agents\skills\devops-superpowers" "$env:USERPROFILE\.codex\devops-superpowers\skills"
   ```

3. **Restart Codex** (quit and relaunch the CLI) to discover the skills.

## Verify

```bash
ls -la ~/.agents/skills/devops-superpowers
```

You should see a symlink pointing to the DevOps Superpowers skills directory.

## Updating

```bash
cd ~/.codex/devops-superpowers && git pull
```

Skills update instantly through the symlink.

## Uninstalling

```bash
rm ~/.agents/skills/devops-superpowers
```

Optionally delete the clone: `rm -rf ~/.codex/devops-superpowers`.
