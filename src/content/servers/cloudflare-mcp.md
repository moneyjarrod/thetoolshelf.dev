---
# === IDENTITY ===
slug: "cloudflare-mcp"
name: "Cloudflare MCP Servers"
description: "Official Cloudflare catalog of managed remote MCP servers — Workers, KV, R2, D1, DNS, CDN, and security management through OAuth with zero local install."
verdict: "recommended"
verdict_note: "Remote-first, OAuth-based, zero local install. The Workers Bindings server enables full-stack app deployment from natural language. Perfect for Cloudflare-centric workflows."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/cloudflare/mcp-server-cloudflare"
npm_package: null
pypi_package: null
stars: 2500
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 2

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "untested"
  claude_code: "full"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "Remote server — no local install needed. For clients without remote MCP support: npx -y mcp-remote https://[server-url].workers.dev/mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "mcp-remote"
      - "https://workers-mcp.cloudflare.com/mcp"
  env_vars: []
  prerequisites:
    - "Cloudflare account (free tier works)"
    - "MCP client with remote server support (or Node.js for mcp-remote proxy)"

# === TAXONOMY ===
category:
  - "cloud"
  - "devops"
related_slugs:
  - "aws-mcp"
  - "docker-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to Cloudflare's platform through a catalog of managed remote MCP servers. Manage Workers, KV stores, R2 buckets, D1 databases, DNS records, CDN settings, and security configurations — all through conversation. The servers run on Cloudflare's edge infrastructure and authenticate via OAuth. No local install required if your client supports remote MCP.

The primary server for most developers is **Workers Bindings MCP** with 25 tools covering Workers deployment, KV operations, R2 storage, and D1 database queries. Additional servers cover the Cloudflare API (DNS, CDN, security), AutoRAG (document retrieval), and AI Gateway (visibility over AI apps).

## What It Does Well

- **Remote-first architecture means zero local setup.** Most MCP servers require installing a local binary, managing dependencies, and configuring environment variables. Cloudflare's servers run remotely — you point your client at the URL and authenticate via OAuth in the browser. For clients that support remote MCP natively, the config is a single URL. No Docker, no Python, no Node.js required on your machine.
- **Workers Bindings MCP enables full-stack deployment from conversation.** 25 tools cover the complete Workers development lifecycle: create Workers, deploy code, manage KV namespaces, interact with R2 buckets, query D1 databases, and configure bindings between them. You can go from "build me a URL shortener" to deployed application without leaving the chat. That's not a gimmick — Workers' simplicity makes this genuinely practical.
- **OAuth makes credential management invisible.** Sign in with your Cloudflare account in the browser and access is granted. No API tokens to generate, no secrets to store in config files, no key rotation to manage. The auth session persists until you revoke it. Combined with the remote architecture, the entire security model is handled for you.

## What It Doesn't Do Well

- **Clients without remote MCP support need a proxy.** Not every MCP client supports connecting to remote HTTP servers yet. For those that don't, you need the `mcp-remote` npm package as a local bridge — adding back the local Node.js dependency that remote-first is supposed to avoid. As more clients add remote support, this limitation fades, but today it's a real friction point for some setups.
- **Cloudflare-only scope limits utility.** If your infrastructure spans multiple cloud providers, Cloudflare MCP covers only the Cloudflare portion. Unlike AWS MCP which covers a massive surface area of cloud services, Cloudflare's servers are focused on their specific product line: Workers, KV, R2, D1, DNS, CDN. Deep within that scope, but narrow outside it.
- **SSE transport is deprecated.** Older configurations using SSE (Server-Sent Events) transport need updating to streamable HTTP. If you're following older tutorials or setup guides that reference SSE, the config format has changed. Not a major issue but something to watch for.

## Setup Notes

If your client supports remote MCP servers natively (Claude Desktop, Cursor, and others are adding this), the setup is adding a URL to your config and clicking through OAuth. Check Cloudflare's developer documentation for the current server URLs — they maintain a catalog page.

For clients that don't support remote MCP yet, install the `mcp-remote` npm proxy: `npx -y mcp-remote https://[server-url].workers.dev/mcp`. This runs a local stdio bridge that proxies to the remote server. You still get OAuth authentication — the proxy opens a browser window for the flow.

Cloudflare also offers `workers-mcp`, a framework for building your own custom MCP servers on Workers. This is separate from the managed servers — it's a development tool for creating new MCP servers that deploy to Cloudflare's edge. If you're building MCP servers (not just using them), this is worth a look.

Free tier Cloudflare accounts have access to Workers, KV, R2, and D1 with generous limits. You don't need a paid plan to use the MCP servers.

## Config

For clients with remote MCP support:

```json
{
  "mcpServers": {
    "cloudflare": {
      "type": "http",
      "url": "https://workers-mcp.cloudflare.com/mcp"
    }
  }
}
```

For clients needing mcp-remote proxy:

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://workers-mcp.cloudflare.com/mcp"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
