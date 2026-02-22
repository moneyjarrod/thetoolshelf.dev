---
# === IDENTITY ===
slug: "heroku-mcp"
name: "Heroku MCP Server"
description: "Official dual-mode server — CLI-native local REPL or remote OAuth. Deploy, scale, monitor apps, manage Postgres and Redis add-ons, run one-off dynos."
verdict: "recommended"
verdict_note: "CLI-native integration reuses existing Heroku auth. Remote OAuth option eliminates local dependency. Full app lifecycle management from deploy to logs to database."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "ISC"
github_url: "https://github.com/heroku/heroku-mcp-server"
npm_package: "@heroku/mcp-server"
pypi_package: null
stars: 300
last_updated: 2026-02-10

# === SETUP ===
setup_difficulty: 2

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "untested"
  claude_code: "full"
  windsurf: "full"
  cline: "untested"

# === INSTALL ===
install:
  command: "heroku mcp:start"
  config_json:
    command: "heroku"
    args:
      - "mcp:start"
  env_vars: []
  prerequisites:
    - "Heroku CLI v10.8.1+"
    - "Heroku account"

# === TAXONOMY ===
category:
  - "deployment"
  - "hosting"
  - "PaaS"
related_slugs:
  - "vercel-mcp"
  - "cloudflare-mcp"
  - "docker-mcp"
affiliate_links:
  - label: "Heroku Pricing"
    url: "https://www.heroku.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Full Heroku app lifecycle management through MCP. Deploy apps, scale dynos, restart processes, tail logs, monitor performance, manage Postgres and Redis add-ons, run one-off dynos for sandboxed code execution, and manage deployment pipelines.

Two modes: local CLI integration (`heroku mcp:start`) that reuses your existing Heroku CLI authentication, or remote OAuth at `https://mcp.heroku.com/mcp` with no local install required.

## What It Does Well

- **CLI-native integration reuses existing auth seamlessly.** If you already have the Heroku CLI installed and authenticated, `heroku mcp:start` starts the MCP server using your existing session. No separate API keys, no OAuth configuration, no tokens in config files. The simplest auth story of any PaaS MCP server.
- **One-off dynos provide sandboxed code execution.** Claude can spin up temporary dynos to run code, scripts, or commands in an isolated Heroku environment. This is useful for testing deployment scripts or running database migrations without affecting your local machine.
- **Remote OAuth option means zero local dependencies.** The hosted server at `https://mcp.heroku.com/mcp` handles authentication through the browser. No CLI install, no Node.js, no npx. Configure the URL and authenticate.

## What It Doesn't Do Well

- **Requires Heroku CLI globally installed for local mode.** The `heroku mcp:start` path needs the Heroku CLI at v10.8.1+. If you don't already use Heroku's CLI, that's a global install just for MCP. The remote OAuth path avoids this.
- **Early development status acknowledged by Heroku.** The server notes it's in early development. Features may change, and edge cases in app management may not be fully covered yet.

## Setup Notes

For existing Heroku users: `heroku mcp:start` and you're done. The CLI handles everything.

For new setups or users who prefer remote: configure `https://mcp.heroku.com/mcp` as an HTTP MCP server. OAuth handles auth through the browser.

The npx alternative (`npx -y @heroku/mcp-server`) requires HEROKU_API_KEY as an environment variable instead of using CLI session auth.

Works with Claude Desktop, Cursor, Windsurf, Zed, and Agentforce (Salesforce integration).

## Config

CLI (recommended for existing Heroku users):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "heroku",
      "args": ["mcp:start"]
    }
  }
}
```

Remote (no local install):

```json
{
  "mcpServers": {
    "heroku": {
      "url": "https://mcp.heroku.com/mcp"
    }
  }
}
```

npx (alternative local):

```json
{
  "mcpServers": {
    "heroku": {
      "command": "npx",
      "args": ["-y", "@heroku/mcp-server"],
      "env": {
        "HEROKU_API_KEY": "your_heroku_api_key"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
