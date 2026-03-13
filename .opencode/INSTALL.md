# Installing DevOps Superpowers for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- Git installed

## Installation Steps

### 1. Clone DevOps Superpowers

```bash
git clone https://github.com/H3xKatana/devops-superpowers.git ~/.config/opencode/devops-superpowers
```

### 2. Register the Plugin

Create a symlink so OpenCode discovers the plugin:

```bash
mkdir -p ~/.config/opencode/plugins
rm -f ~/.config/opencode/plugins/devops-superpowers.js
ln -s ~/.config/opencode/devops-superpowers/.opencode/plugins/devops-superpowers.js ~/.config/opencode/plugins/devops-superpowers.js
```

### 3. Symlink Skills

Create a symlink so OpenCode's native skill tool discovers DevOps Superpowers skills:

```bash
mkdir -p ~/.config/opencode/skills
rm -rf ~/.config/opencode/skills/devops-superpowers
ln -s ~/.config/opencode/devops-superpowers/skills ~/.config/opencode/skills/devops-superpowers
```

### 4. Restart OpenCode

Restart OpenCode. The plugin will automatically inject DevOps Superpowers context.

## Verify

```bash
ls -la ~/.config/opencode/skills/devops-superpowers
ls -la ~/.config/opencode/plugins/devops-superpowers.js
```

## Updating

```bash
cd ~/.config/opencode/devops-superpowers
git pull
```

## Uninstalling

```bash
rm ~/.config/opencode/skills/devops-superpowers
rm ~/.config/opencode/plugins/devops-superpowers.js
rm -rf ~/.config/opencode/devops-superpowers
```

## Getting Help

- Report issues: https://github.com/H3xKatana/devops-superpowers/issues
