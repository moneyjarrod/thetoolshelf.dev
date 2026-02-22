---
# === IDENTITY ===
slug: "linear-mcp"
name: "Linear MCP Server"
description: "Official Linear server for finding, creating, and updating issues, projects, and comments — remote-first with OAuth 2.1 authorization."
verdict: "recommended"
verdict_note: "Cleanest project management MCP setup available. Official remote server with OAuth means zero local dependencies. Does what it says, works in every major client."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "streamable-http"
  - "sse"
license: "MIT"
github_url: "https://github.com/linear/linear-mcp"
npm_package: null
pypi_package: null
stars: 1200
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "full"
  cline: "untested"

# === INSTALL ===
install:
  command: "npx -y mcp-remote https://mcp.linear.app/mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "mcp-remote"
      - "https://mcp.linear.app/mcp"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Linear account"

# === TAXONOMY ===
category:
  - "productivity"
  - "project-management"
related_slugs:
  - "jira-mcp"
  - "github-mcp"
affiliate_links:
  - label: "Linear Plans"
    url: "https://linear.app/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Linear workspace for issue and project management. Find issues by status, assignee, or search query. Create new issues with full metadata. Update existing issues (status, priority, assignee). Add comments. Manage projects. The server is remote-first — hosted by Linear with OAuth 2.1 authentication, so there's nothing to install locally beyond the mcp-remote bridge.

Linear built this as the official integration point for AI clients. It supersedes the half-dozen community implementations that existed before Linear shipped their own.

## What It Does Well

- **Absolute minimum setup friction.** One npx command, browser opens for OAuth, authorize, done. No API keys to generate, no tokens to manage, no environment variables. This is what "easy" looks like — compare with servers that need API keys, service accounts, and environment configuration. Linear's remote server sets the bar.
- **OAuth 2.1 with dynamic client registration is the right auth model.** The server handles auth properly — browser-based OAuth flow, no credentials in config files, permissions scoped to what you authorize. For teams with security requirements around credential management, this is exactly what they want to see.
- **Multi-client support is explicitly documented and tested.** Linear provides specific setup instructions and install links for Claude Desktop, Claude Code, Cursor, Codex, v0, Windsurf, and Zed. They're not just "works in Claude Desktop" — they've verified and documented each client. SSE endpoint available at `/sse` for clients that prefer that transport.

## What It Doesn't Do Well

- **Tool set is focused, not comprehensive.** Issues, projects, and comments cover the core workflow, but Linear has a rich data model with cycles, views, roadmaps, labels, teams, and integrations that aren't fully exposed yet. If you need to manage cycles or configure team settings, you're still going to the Linear UI.
- **No multi-workspace support in the official server.** The community implementation (dvcrn/mcp-server-linear) supports multiple workspaces with a TOOL_PREFIX pattern. The official server operates on one workspace at a time. If you work across multiple Linear workspaces, the community version still has an edge here.
- **OAuth flow requires browser interaction.** The first connection opens a browser window for authorization. In headless environments, CI/CD pipelines, or SSH sessions without browser forwarding, this doesn't work. API key auth via Authorization header is supported as an alternative, but it's not the default path.

## Setup Notes

Run `npx -y mcp-remote https://mcp.linear.app/mcp` and your browser opens for OAuth. Authorize, and you're connected. If auth gets stuck, `rm -rf ~/.mcp-auth` clears saved credentials. WSL users may need the SSE endpoint (`https://mcp.linear.app/sse`) for proper transport handling.

Claude Code has a direct setup command: `claude mcp add --transport http linear-server https://mcp.linear.app/mcp`.

Community implementations still exist and some have unique features (Go version with read-only default, multi-workspace support, Cline-specific server), but the official remote server is the recommended starting point for new setups.

## Config

Remote (recommended):

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/mcp"]
    }
  }
}
```

Claude Code:

```bash
claude mcp add --transport http linear-server https://mcp.linear.app/mcp
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
