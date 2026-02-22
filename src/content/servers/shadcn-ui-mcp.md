---
# === IDENTITY ===
slug: "shadcn-ui-mcp"
name: "shadcn/ui MCP Server"
description: "Official shadcn CLI-integrated server for browsing, searching, and installing UI components from shadcn registries via natural language."
verdict: "recommended"
verdict_note: "Dead simple setup for any project already using shadcn/ui. Natural language component installation is the killer feature — say what you need, get it installed."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/shadcn-ui/ui"
npm_package: "shadcn"
pypi_package: null
stars: 80000
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "npx -y shadcn@latest mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "shadcn@latest"
      - "mcp"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Existing project with shadcn/ui initialized"

# === TAXONOMY ===
category:
  - "coding"
  - "ui"
related_slugs:
  - "github-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude direct access to the shadcn/ui component registry. Browse available components, search across registries (official, third-party, private, namespaced), and install components into your project — all through natural language. Instead of manually browsing ui.shadcn.com, copying install commands, and configuring components, you tell Claude what you need and the MCP server handles the registry lookup and installation.

This is the official server, built into the shadcn CLI itself. It's not a community wrapper around the docs — it's the CLI's MCP mode.

## What It Does Well

- **Natural language component installation removes friction.** "Add a date picker with range selection" finds the right component, checks your registry configuration, and installs it. No browsing docs, no copy-pasting CLI commands, no figuring out which variant you need. For rapid prototyping, this collapses multiple steps into one conversation turn.
- **Multi-registry support covers the expanding ecosystem.** The server doesn't just access the official shadcn/ui registry. It supports third-party registries, private company registries, and namespaced registries. As the shadcn ecosystem grows beyond the core component set, this becomes increasingly valuable.
- **Zero configuration for existing shadcn projects.** If your project already has shadcn/ui initialized, the MCP server works immediately. No API keys, no tokens, no environment variables. Just `npx -y shadcn@latest mcp` and it reads your project's existing configuration. Setup difficulty doesn't get lower than this.

## What It Doesn't Do Well

- **Project-scoped — useless without an existing project.** This server operates on your project's shadcn configuration. If you're just exploring components or comparing options before starting a project, it won't help. You need an initialized project for the server to target. For general component research, the community servers that expose docs and source code are more useful.
- **Community servers fill a different need that the official server doesn't.** The official server installs components. The community servers (Jpisnice/shadcn-ui-mcp-server, heilgar/shadcn-ui-mcp-server) give Claude access to component documentation and source code for reference. These are complementary, not competing — but the distinction isn't obvious, and new users often install the wrong one.
- **No affiliate or revenue path.** shadcn/ui is fully open source with no paid tiers. For ToolShelf, this listing exists for category coverage and traffic, not revenue. Mentioned for transparency.

## Setup Notes

Add to your project's `.mcp.json`, `.cursor/mcp.json`, or `.vscode/mcp.json`. That's it. The server reads your project's existing shadcn configuration to know which registry, framework, and styling setup to use.

Community servers that provide component docs and source access are separate tools. If you want Claude to reference component code without installing (for learning or comparison), look at Jpisnice/shadcn-ui-mcp-server, which supports React, Svelte, Vue, and React Native. Note: community servers that hit GitHub API have rate limits — 60 requests/hour without a GitHub token, 5,000/hour with one.

## Config

Project-level (`.mcp.json` or `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@latest", "mcp"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
