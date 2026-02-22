---
# === IDENTITY ===
slug: "planetscale-mcp"
name: "PlanetScale MCP Server"
description: "Official serverless MySQL-compatible database integration with auto-config CLI installer and hosted OAuth remote server."
verdict: "conditional"
verdict_note: "Clean setup with CLI installer and read-only safety defaults, but requires a PlanetScale paid account. Good for existing PlanetScale users, not worth onboarding just for MCP."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "Apache-2.0"
github_url: "https://github.com/planetscale/mcp-server"
npm_package: null
pypi_package: null
stars: 50
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 2

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "untested"
  claude_code: "full"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "pscale mcp install --target claude"
  config_json:
    command: "pscale"
    args:
      - "mcp"
      - "server"
  env_vars: []
  prerequisites:
    - "PlanetScale CLI installed"
    - "PlanetScale account (paid)"

# === TAXONOMY ===
category:
  - "database"
  - "mysql"
related_slugs:
  - "neon-mcp"
  - "mysql-mcp"
  - "supabase-mcp"
affiliate_links:
  - label: "PlanetScale Pricing"
    url: "https://planetscale.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to PlanetScale's serverless MySQL-compatible database for read-only queries, schema inspection, and database management. The CLI includes an auto-config installer that writes MCP configuration for your client of choice. A hosted OAuth remote server is replacing the local CLI path as the primary integration.

## What It Does Well

- **Auto-config installer removes setup friction.** Run `pscale mcp install --target claude` (or `--target cursor` or `--target zed`) and the CLI writes the correct MCP config for you. No manually editing JSON files, no guessing at argument formats. This is the UX standard other MCP servers should aim for.
- **Read-only by default with destructive query protection.** The server routes queries to replicas automatically and blocks destructive operations unless explicitly enabled. Ephemeral credentials mean no long-lived tokens sitting in config files.
- **Claude Code plugin provides a dedicated integration path.** The planetscale/claude-plugin is purpose-built for Claude Code workflows, separate from the general MCP server. If you're primarily working in Claude Code, there's a first-class option.

## What It Doesn't Do Well

- **Requires a PlanetScale paid account.** Unlike community database MCP servers that work with any MySQL instance, this only works with PlanetScale databases. If you don't already have a PlanetScale subscription, this server provides zero value.
- **Transitioning from CLI to hosted OAuth creates a moving target.** The `pscale mcp server` CLI path is being deprecated in favor of the hosted remote server with OAuth. If you set up the CLI version today, you'll need to migrate later. The remote version is the future but may not be stable in all clients yet.

## Setup Notes

Install the PlanetScale CLI first, authenticate with `pscale auth login`, then run the install command targeting your MCP client. The CLI handles everything — config writing, credential management, server startup. If the auto-installer supports your client, setup takes under 2 minutes.

For the hosted OAuth path, configure your MCP client to connect to the remote URL and authenticate through the browser. This avoids local CLI dependency entirely.

## Config

CLI (current):

```json
{
  "mcpServers": {
    "planetscale": {
      "command": "pscale",
      "args": ["mcp", "server"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
