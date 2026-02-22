---
# === IDENTITY ===
slug: "mcp-reference-servers"
name: "MCP Reference Servers"
description: "The official maintained reference implementations — Filesystem, Git, Memory, Sequential Thinking, Fetch, and Time. The starting point for every MCP setup."
verdict: "recommended"
verdict_note: "Maintained by the MCP steering group. Free, no API keys, battle-tested. If you're setting up MCP for the first time, start here."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers"
npm_package: "@modelcontextprotocol/server-filesystem"
pypi_package: null
stars: 15000
last_updated: 2026-02-15

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "full"
  cline: "full"

# === INSTALL ===
install:
  command: "npx -y @modelcontextprotocol/server-{name}"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-filesystem"
      - "C:/Users/you/allowed-directory"
  env_vars: []
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "protocol"
  - "reference"
  - "developer-tools"
related_slugs:
  - "filesystem-mcp"
  - "git-mcp"
  - "memory-mcp"
  - "sequential-thinking-mcp"
  - "fetch-mcp"
  - "mcp-connector"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

The official MCP reference servers maintained by the MCP steering group. Seven servers that demonstrate the protocol and provide genuinely useful functionality. Each is reviewed individually elsewhere on ToolShelf, but this page covers the collection and which to start with.

**Actively maintained (servers repo):**
- **Filesystem** — Read/write files within allowed directories
- **Git** — Read local Git repositories, search commits, view diffs
- **Memory** — Knowledge graph persistence across conversations
- **Sequential Thinking** — Structured reasoning enhancement
- **Fetch** — Web page fetching and content extraction
- **Time** — Current time and timezone operations
- **Everything** — Reference/test server demonstrating all MCP capabilities

**Archived (servers-archived repo):**
- AWS KB Retrieval, Brave Search, GitHub, Google Maps, Postgres, Puppeteer, Sentry, Slack — functional but no longer maintained. Many have been superseded by official vendor servers.

## What It Does Well

- **No API keys, no accounts, no paid services.** Every actively maintained reference server works with zero credentials. Filesystem needs a directory path. Git needs a repo path. Fetch needs a URL. That's it. The barrier to trying MCP is as low as it can be.
- **Battle-tested across every MCP client.** These servers are what client developers test against. If an MCP client works with anything, it works with the reference servers. Compatibility is as close to guaranteed as the ecosystem offers.
- **The right starting point for MCP beginners.** Install Filesystem + Fetch + Sequential Thinking and you have a functional MCP setup in under 5 minutes. Add Git and Memory as your workflow demands. This is the recommended "first MCP experience."

## What It Doesn't Do Well

- **The archived servers create confusion about what's maintained.** Brave Search MCP, GitHub MCP, Postgres MCP — these are well-known servers that are now archived. Developers find them in tutorials and blog posts without realizing they're unmaintained. The official vendor replacements (GitHub's own MCP, Brave's own MCP) are better options but aren't always easy to discover.
- **Reference quality means minimal features.** These servers demonstrate the protocol, not maximize functionality. Desktop Commander does everything Filesystem does plus terminal commands plus code execution. The reference servers are starting points, not endpoints.

## Setup Notes

All reference servers follow the same pattern: `npx -y @modelcontextprotocol/server-{name}` with any required arguments. No environment variables for the actively maintained set.

Our recommended starter config (three servers, covers most workflows):

## Config

Recommended starter setup:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:/Users/you/projects"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
- Claude Code
- VS Code
