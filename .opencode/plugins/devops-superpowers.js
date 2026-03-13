/**
 * DevOps Superpowers plugin for OpenCode.ai
 *
 * Injects DevOps Superpowers bootstrap context via system prompt transform.
 * Skills are discovered via OpenCode's native skill tool from symlinked directory.
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
};

const normalizePath = (p, homeDir) => {
  if (!p || typeof p !== 'string') return null;
  let normalized = p.trim();
  if (!normalized) return null;
  if (normalized.startsWith('~/')) {
    normalized = path.join(homeDir, normalized.slice(2));
  } else if (normalized === '~') {
    normalized = homeDir;
  }
  return path.resolve(normalized);
};

export const DevOpsSuperpowersPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const devopsSkillsDir = path.resolve(__dirname, '../../skills');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');

  const getBootstrapContent = () => {
    const skillPath = path.join(devopsSkillsDir, 'superpowers', 'using-superpowers', 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      return null;
    }

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);

    return `<EXTREMELY_IMPORTANT>
You have DevOps Superpowers.

DevOps Superpowers provides pre-wired AI agents, slash commands, and skills for DevOps and SRE tasks. It brings SRE methodology to every operation through intelligent automation.

The system activates automatically when you work on DevOps tasks. Key workflows:
1. Use /inspect for safe infrastructure exploration
2. Apply SRE methodology before deployments (check SLOs, error budgets)
3. Use /deploy with canary/blue-green strategies
4. Use /incident for incident response
5. Use /slo for SLO tracking

Skills are in: ${configDir}/skills/devops-superpowers/
Use OpenCode's native \`skill\` tool to list and load skills.
</EXTREMELY_IMPORTANT>`;
  };

  return {
    'experimental.chat.system.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (bootstrap) {
        (output.system ||= []).push(bootstrap);
      }
    }
  };
};
