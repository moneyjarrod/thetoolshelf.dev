---
# === IDENTITY ===
slug: "postman-mcp"
name: "Postman MCP Server"
description: "Official remote and local MCP server — API testing, collection management, code generation, and the MCP Generator for 100K+ public APIs."
verdict: "recommended"
verdict_note: "OAuth remote server with no API key needed. Three tool tiers (minimal/code/full). The MCP Generator alone makes this worth listing — generate MCP servers from Postman's API catalog."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "streamable-http"
  - "stdio"
license: "Apache-2.0"
github_url: "https://github.com/postmanlabs/postman-mcp-server"
npm_package: "@postmanlabs/postman-mcp-server"
pypi_package: null
stars: 400
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
  cline: "untested"

# === INSTALL ===
install:
  command: "claude mcp add --transport http postman https://mcp.postman.com"
  config_json:
    url: "https://mcp.postman.com"
  env_vars: []
  prerequisites:
    - "Postman account (for authenticated features)"

# === TAXONOMY ===
category:
  - "api-testing"
  - "developer-tools"
  - "code-generation"
related_slugs:
  - "github-mcp"
  - "stripe-mcp"
affiliate_links:
  - label: "Postman Pricing"
    url: "https://www.postman.com/pricing/"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to Postman for API testing, collection management, environment management, code synchronization, and workspace collaboration. Three tool configurations: minimal (essential operations), code (API search + client code generation), and full (100+ tools for advanced Enterprise features).

The standout feature is the MCP Generator — generate MCP servers from any of Postman's 100,000+ public APIs. This turns any API in Postman's catalog into an MCP integration without writing server code.

## What It Does Well

- **Remote OAuth with no API key is the lowest-friction entry point.** The hosted server at `https://mcp.postman.com` uses MCP-spec-compliant OAuth. No API key generation, no tokens in config files. Add the URL, authenticate via browser, start using Postman through Claude.
- **MCP Generator creates servers from any API in Postman's catalog.** This isn't just a Postman management tool — it's a factory for MCP servers. Find an API on Postman's public catalog, generate an MCP server for it, and connect Claude to that API. For APIs that don't have official MCP support, this fills the gap.
- **Three tool tiers let you control scope.** Minimal for basic Postman operations, code for API-to-code workflows, full for Enterprise teams. Start minimal and expand as needed instead of being overwhelmed by 100+ tools on first use.

## What It Doesn't Do Well

- **Rate limits count toward your Postman plan's monthly API calls.** Every MCP tool invocation is an API call. If Claude makes 50 tool calls researching your collections, that's 50 calls against your plan limit. On the free tier, this adds up fast.
- **EU region doesn't support OAuth.** The EU server (`https://mcp.eu.postman.com`) requires API key authentication — no browser-based OAuth. If your data residency requires EU hosting, you lose the zero-friction OAuth setup.

## Setup Notes

Remote is recommended: `claude mcp add --transport http postman https://mcp.postman.com` for Claude Code. For config-based clients, add the URL.

Local is available via `npx -y @postmanlabs/postman-mcp-server` with POSTMAN_API_KEY for environments where remote connectivity isn't available.

Postman also functions as an MCP client — you can test and debug MCP servers directly from Postman. The Agent Mode (beta) generates MCP servers for internal APIs.

## Config

Remote (recommended):

```json
{
  "mcpServers": {
    "postman": {
      "url": "https://mcp.postman.com"
    }
  }
}
```

Local:

```json
{
  "mcpServers": {
    "postman": {
      "command": "npx",
      "args": ["-y", "@postmanlabs/postman-mcp-server"],
      "env": {
        "POSTMAN_API_KEY": "PMAK-your_api_key"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- VS Code
