---
# === IDENTITY ===
slug: "desktop-commander-mcp"
name: "Desktop Commander MCP"
description: "Swiss-army-knife MCP server — terminal commands, filesystem operations, diff editing, in-memory code execution, Excel/PDF support, and fuzzy search."
verdict: "recommended"
verdict_note: "5.3K stars and growing. Covers terminal, filesystem, and code execution in one server. Docker sandboxing option for safety. The community's answer to 'I need Claude to do things on my machine.'"

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/wonderwhy-er/DesktopCommanderMCP"
npm_package: "@wonderwhy-er/desktop-commander"
pypi_package: null
stars: 5300
last_updated: 2026-02-15

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "untested"
  cline: "full"

# === INSTALL ===
install:
  command: "npx @wonderwhy-er/desktop-commander@latest setup"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@wonderwhy-er/desktop-commander@latest"
  env_vars: []
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "terminal"
  - "filesystem"
  - "developer-tools"
related_slugs:
  - "filesystem-mcp"
  - "git-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Terminal control, filesystem operations, and code execution in one MCP server. Execute long-running terminal commands with interactive process control, edit files with diff-based patching, run Python/Node.js/R code in memory without saving files, read and write Excel files, generate PDFs from markdown, and fuzzy search across your filesystem.

Built on top of Anthropic's Filesystem MCP server with significantly expanded capabilities. Think of it as what Filesystem MCP would be if it could also run commands and execute code.

## What It Does Well

- **One server replaces three or four.** Terminal commands (no separate shell MCP needed), filesystem operations (Filesystem MCP capability included), code execution (no separate Python/Node runner needed), and document handling (Excel read/write, PDF generation). Instead of configuring multiple specialized servers, Desktop Commander covers most local-machine workflows.
- **Interactive process control handles long-running tasks.** Start a dev server, interact with SSH sessions, run database CLIs — the server maintains running processes and lets Claude interact with them across multiple tool calls. Most terminal MCP servers execute a command and return output; this one maintains the session.
- **Docker sandboxing for zero-risk environments.** Run Desktop Commander in a Docker container to isolate Claude's filesystem and terminal access from your host system. For safety-conscious users or enterprise environments, this eliminates the "Claude has access to my machine" concern.

## What It Doesn't Do Well

- **Community server without official backing.** Popular and well-maintained, but it's one developer's project. If the maintainer steps away, 5.3K stars worth of users need a new option. No corporate sponsor or foundation behind it.
- **Windows npx issues have been reported historically.** Recent updates resolved most compatibility problems, but ES module issues can surface depending on your Node.js version and npx configuration. Linux and macOS tend to be smoother.

## Setup Notes

The setup command (`npx @wonderwhy-er/desktop-commander@latest setup`) auto-configures your MCP client. Alternatively, add the config JSON manually. No environment variables needed — the server uses your system's native permissions.

For Docker sandboxing: `bash <(curl -fsSL https://raw.githubusercontent.com/wonderwhy-er/DesktopCommanderMCP/main/install-docker.sh)`.

VS Code extension, Smithery integration, and Remote MCP (for ChatGPT/Claude web) are also available.

## Config

```json
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander@latest"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
