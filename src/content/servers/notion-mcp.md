---
# === IDENTITY ===
slug: "notion-mcp"
name: "Notion MCP Server"
description: "Official Notion server for reading and writing pages, databases, comments, and searching across workspaces — with a remote OAuth option that skips token management entirely."
verdict: "recommended"
verdict_note: "Official, well-designed, token-optimized. The remote OAuth version is the simplest Notion integration path. Local version works but may be deprecated."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/makenotion/notion-mcp-server"
npm_package: "@notionhq/notion-mcp-server"
pypi_package: null
stars: 3900
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 2

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
  command: "npx -y @notionhq/notion-mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@notionhq/notion-mcp-server"
    env:
      NOTION_TOKEN: "ntn_****"
  env_vars:
    - name: "NOTION_TOKEN"
      description: "Integration token from notion.so/profile/integrations"
      required: true
  prerequisites:
    - "Notion account (free tier works)"
    - "Node.js 18+ (for local install)"
    - "Notion integration created with appropriate permissions"

# === TAXONOMY ===
category:
  - "productivity"
  - "knowledge"
related_slugs:
  - "obsidian-mcp"
  - "memory-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Notion workspace. Read and write pages, query databases (called "data sources" since v2.0.0), add comments, and search across your entire workspace. The server is built and maintained by Notion themselves, optimized for token efficiency so Claude doesn't waste context on redundant formatting.

Two versions exist: a **remote server** hosted by Notion with OAuth authentication (one-click setup, no tokens to manage), and a **local server** via npx that uses an integration token. Notion is prioritizing the remote version — the local repo's issues aren't being actively monitored, which tells you where development effort is going.

## What It Does Well

- **Token-optimized by design.** Notion's API returns verbose JSON with nested blocks, properties, and metadata. The MCP server compresses this into the minimum representation Claude needs. For workspaces with large pages and complex databases, this matters — you fit more useful content in the same context window.
- **The remote OAuth version removes all credential friction.** Click the authorization link, approve access in your browser, and you're connected. No creating integrations, no copying tokens, no environment variables. This is the setup experience every MCP server should aim for.
- **Full workspace search is genuinely useful.** The `search` tool queries across all pages and databases your integration can access. Combined with the structured database querying (filters, sorts), you can use Claude as a natural language interface to your Notion knowledge base. Ask "find my notes from the product meeting last Tuesday" and it actually works.

## What It Doesn't Do Well

- **Pages must be explicitly connected to the integration.** Creating a Notion integration doesn't automatically give it access to your workspace. You need to go into each page or database, click "..." → "Connections," and add your integration. For a large workspace, this manual step-by-step connection process is tedious. The remote OAuth version handles this better with workspace-level permissions.
- **Cannot delete databases.** This is an intentional safety limit — the API allows deletion but Notion chose to block it through the MCP server. Reasonable for safety, but if you're doing workspace cleanup through Claude, you'll hit this wall and need to delete manually.
- **v2.0.0 renamed databases to "data sources" and broke existing workflows.** If you're upgrading from v1.x, any prompts or scripts referencing "database" tools need updating. The old tool names no longer exist. The rename aligns with Notion's evolving terminology but the migration cost is on you.

## Setup Notes

For the remote server, Notion provides a hosted endpoint with OAuth — check Notion's MCP documentation for the current URL and supported clients. This is the path of least resistance.

For the local server, create an integration at notion.so/profile/integrations. Choose the permissions you need (read content, update content, insert content, read comments). Copy the token (starts with `ntn_`). Add it to your MCP config. Then go to each Notion page/database you want accessible, open the connections menu, and add your integration.

Security note: if you only need to read Notion data, create the integration with read-only permissions. There's no reason to grant write access for a browsing-only use case.

The `OPENAPI_MCP_HEADERS` JSON format from older setup guides still works but is harder to get right, especially on Windows where JSON escaping in environment variables is painful. The simpler `NOTION_TOKEN` env var is preferred.

## Config

Local with integration token:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_your_token_here"
      }
    }
  }
}
```

Docker:

```json
{
  "mcpServers": {
    "notion": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "NOTION_TOKEN", "mcp/notion"],
      "env": {
        "NOTION_TOKEN": "ntn_your_token_here"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
