---
name: "Filesystem MCP"
description: "Read, write, and manage files on your local machine through AI."
verdict: "recommended"
verdict_note: "The most reliable MCP server in the ecosystem. No API keys, no setup headaches, just works."

language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
npm_package: "@modelcontextprotocol/server-filesystem"
pypi_package: null
stars: 0
last_updated: 2026-01-14

setup_difficulty: 1

compatibility:
  claude_desktop: "full"
  cursor: "untested"
  vscode: "untested"
  claude_code: "untested"
  windsurf: "untested"
  cline: "untested"

install:
  command: "npx -y @modelcontextprotocol/server-filesystem C:/Users/you/projects"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "C:/Users/you/projects"
    env: {}
  env_vars: []
  prerequisites:
    - "Node.js 18+"

category:
  - "file-system"
  - "local-tools"
related_slugs:
  - "desktop-commander"
  - "memory-mcp"
affiliate_links: []

metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Filesystem MCP gives your AI assistant direct access to files on your machine. It can read, write, create, move, search, and list files within directories you allow. It's the official reference implementation from the MCP project — the one every tutorial starts with, and the one most developers install first.

## What It Does Well

- **Zero-config startup.** Point it at a directory, paste the JSON, restart your client. No API keys, no accounts, no Docker, no environment variables. Under two minutes from nothing to working.
- **Sandboxed by default.** You pass allowed directories as arguments. The server only operates within those paths. You control the blast radius — scope it to one project folder or open the whole drive depending on your workflow.
- **Battle-tested stability.** This server has handled hundreds of file operations across dozens of sessions in our testing without a single failure. Read, write, move, search — it just works. At ~150,000 weekly npm downloads, it's one of the most used MCP servers in the ecosystem.

## What It Doesn't Do Well

- **No file watching.** It reads files when asked, but doesn't monitor for external changes. If you edit a file in your text editor, the AI won't know until it reads the file again. For workflows where you're editing files in parallel, this creates a stale-read risk.
- **Stars are misleading.** This server lives inside the `modelcontextprotocol/servers` monorepo. There's no star count for Filesystem specifically — the repo's stars represent dozens of servers combined. Not a functional issue, but worth knowing when evaluating popularity.
- **Wide-open access is tempting.** Passing `C:\` as the allowed directory works and eliminates permission headaches, but the server runs with your user account's full permissions. The official docs recommend scoping to specific directories for a reason. There's no read-only mode built in (though Docker mount flags can simulate it).

## Setup Notes

Setup is the gold standard for MCP servers. Paste the config, restart Claude Desktop, done. The README matches reality. No missing steps, no undocumented prerequisites, no surprises.

One real-world choice: you can scope access to specific project directories (safer, recommended by the docs) or open the entire drive (convenient if you're doing heavy cross-project work and don't want to hit permission walls mid-session). We ran it with broad access for months of daily use with no issues — but that's a trust decision each developer needs to make for themselves.

Paths must be absolute. Relative paths silently fail in some clients.

## Config

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/you/projects"
      ]
    }
  }
}
```

Add multiple directories by adding more path arguments after the package name. No environment variables needed.

## Tested With

- Claude Desktop on Windows 11 (daily use across 100+ sessions)
