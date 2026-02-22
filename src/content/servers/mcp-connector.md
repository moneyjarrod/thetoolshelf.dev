---
# === IDENTITY ===
slug: "mcp-connector"
name: "Anthropic MCP Connector"
description: "API feature that connects Claude to any remote MCP server without writing client code — add a URL to your API request and Anthropic handles the rest."
verdict: "recommended"
verdict_note: "Eliminates MCP client implementation entirely for API users. Add remote server URLs to your Messages API call and Claude discovers tools, manages connections, and handles errors automatically."

# === TECHNICAL ===
language: "N/A"
transport:
  - "streamable-http"
license: "Proprietary"
github_url: "https://docs.anthropic.com/en/docs/agents-and-tools/mcp-connector"
npm_package: null
pypi_package: null
stars: 0
last_updated: 2026-02-15

# === SETUP ===
setup_difficulty: 2

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "none"
  cursor: "none"
  vscode: "none"
  claude_code: "none"
  windsurf: "none"
  cline: "none"

# === INSTALL ===
install:
  command: "Add mcp_servers parameter to Anthropic Messages API request"
  config_json:
    mcp_servers:
      - url: "https://mcp.example.com"
        name: "example-server"
  env_vars:
    - name: "anthropic-beta"
      description: "Beta header: mcp-client-2025-11-20"
      required: true
  prerequisites:
    - "Anthropic API key"
    - "Remote MCP server URL (must support streamable-http)"

# === TAXONOMY ===
category:
  - "protocol"
  - "api"
related_slugs:
  - "mcp-reference-servers"
  - "vercel-mcp"
  - "heroku-mcp"
  - "postman-mcp"
affiliate_links:
  - label: "Anthropic API Pricing"
    url: "https://www.anthropic.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

A feature in the Anthropic Messages API — not a standalone MCP server. Add the `mcp_servers` parameter to your API request with remote MCP server URLs, and Anthropic handles connection management, tool discovery, error handling, and execution automatically. Claude sees the remote server's tools as if they were native API tools.

This turns any remote MCP server into a Claude API integration without writing MCP client code. The vendor-hosted remote servers reviewed elsewhere on ToolShelf (Vercel, Heroku, Postman, Stripe) all work with MCP Connector out of the box.

## What It Does Well

- **Eliminates MCP client implementation for API developers.** Building an MCP client from scratch means handling transport negotiation, tool discovery, connection lifecycle, error recovery, and type conversion. MCP Connector does all of this. You provide a URL, Anthropic provides the plumbing.
- **Works with any remote MCP server that supports streamable-http.** Not tied to Anthropic's own servers. Any vendor-hosted or self-hosted MCP server with HTTP transport works. The growing ecosystem of remote OAuth servers (Vercel, Heroku, Postman, Stripe) are all compatible.
- **TypeScript SDK helpers bridge MCP and Claude API types.** Functions like `mcpToolResultToContent`, `mcpResourceToContent`, and `mcpResourceToFile` handle the type conversion between MCP's format and Claude's API format. Useful when mixing MCP tools with native Claude API tools in the same request.

## What It Doesn't Do Well

- **Only works through the Anthropic API — not in Claude Desktop, Cursor, or other MCP clients.** This is an API feature, not a universal MCP enhancement. If you use Claude through a chat interface or IDE integration, MCP Connector doesn't apply. Those clients have their own MCP configuration.
- **Beta status with a required beta header.** The feature requires `anthropic-beta: mcp-client-2025-11-20` in every request. Beta features can change or be deprecated. The API surface isn't finalized.

## Setup Notes

Add the `mcp_servers` parameter to your Messages API request body. Each entry needs a URL and name. OAuth authorization tokens can be passed per-server. Tool allowlisting and denylisting control which tools Claude can use from each server.

This is for developers building on the Anthropic API, not for end users configuring MCP clients. If you're looking for MCP server setup in Claude Desktop or Cursor, see our individual server listings.

## Config

API request example:

```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "mcp_servers": [
    {
      "url": "https://mcp.example.com",
      "name": "example-server",
      "authorization_token": "Bearer your_oauth_token"
    }
  ],
  "messages": [
    {"role": "user", "content": "Use the example server to..."}
  ]
}
```

## Tested With

- Anthropic Messages API (direct)
