---
# === IDENTITY ===
slug: "vercel-mcp"
name: "Vercel MCP Server"
description: "Official remote MCP server with OAuth — access logs, project metadata, deployments, and Vercel documentation without local installation."
verdict: "recommended"
verdict_note: "Zero-install remote MCP with OAuth authentication. Read-only for security. The vendor-hosted MCP pattern done right."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "streamable-http"
license: "Proprietary"
github_url: "https://vercel.com/docs/mcp"
npm_package: null
pypi_package: null
stars: 0
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
  command: "claude mcp add --transport http vercel https://mcp.vercel.com"
  config_json:
    url: "https://mcp.vercel.com"
  env_vars: []
  prerequisites:
    - "Vercel account (for authenticated tools)"

# === TAXONOMY ===
category:
  - "deployment"
  - "hosting"
  - "developer-tools"
related_slugs:
  - "cloudflare-mcp"
  - "heroku-mcp"
affiliate_links:
  - label: "Vercel Pricing"
    url: "https://vercel.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Remote MCP server hosted by Vercel at `https://mcp.vercel.com`. Public tools search Vercel's documentation without authentication. Authenticated tools (via OAuth) access your project logs, deployment info, environment variables, and project metadata.

No local installation required — configure the URL in your MCP client, authenticate through the browser, and Claude has access to your Vercel projects.

## What It Does Well

- **Zero-install remote MCP is the future pattern.** No npx, no Docker, no binary downloads. Add a URL to your MCP config, authenticate via browser OAuth, done. This is what vendor MCP integration should look like, and Vercel is one of the first to ship it cleanly.
- **Read-only by default for security.** The server doesn't expose deployment triggers, environment variable modifications, or project deletion. Claude can read logs, inspect deployments, and search docs — but can't break anything. Sensible for a production hosting platform.
- **Docs search works without authentication.** Public tools let anyone search Vercel's documentation through Claude without creating an account. Useful even if you're evaluating Vercel and haven't deployed yet.

## What It Doesn't Do Well

- **Read-only means no deployment management through MCP.** You can't trigger deployments, update environment variables, or manage domains through this server. For write operations, you need the Vercel CLI or dashboard. The community server (nganiet/mcp-vercel) offers full CRUD if you need it.
- **Allowlisted clients only.** Not every MCP client is supported — Vercel maintains an allowlist. Claude, Claude Desktop, Cursor, VS Code, and ChatGPT are confirmed. Other clients may be blocked.

## Setup Notes

For Claude Code: `claude mcp add --transport http vercel https://mcp.vercel.com`. For Cursor and other config-based clients, add the URL to your MCP configuration. First use triggers browser-based OAuth.

Vercel also offers MCP server hosting via the `mcp-handler` npm package, letting you deploy your own MCP servers on Vercel Functions with Fluid compute. That's a separate capability from the Vercel management MCP server.

## Config

```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
