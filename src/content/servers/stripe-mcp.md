---
# === IDENTITY ===
slug: "stripe-mcp"
name: "Stripe MCP Server"
description: "Official Stripe server for managing customers, products, payments, subscriptions, and invoices — with permission-scoped tools via Restricted API Keys."
verdict: "recommended"
verdict_note: "Clean remote OAuth setup, smart RAK-based permission scoping, and part of Stripe's broader AI toolkit ecosystem. Every tool you'd expect from a payments integration."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/stripe/ai"
npm_package: "@stripe/mcp"
pypi_package: null
stars: 3000
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
  command: "npx -y @stripe/mcp --api-key=YOUR_RESTRICTED_KEY"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@stripe/mcp"
      - "--api-key=rk_test_your_restricted_key"
  env_vars:
    - name: "api-key"
      description: "Restricted API Key from dashboard.stripe.com/apikeys — passed as CLI arg, not env var"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Stripe account with Restricted API Key"

# === TAXONOMY ===
category:
  - "coding"
  - "payments"
related_slugs:
  - "github-mcp"
affiliate_links:
  - label: "Stripe Developer Dashboard"
    url: "https://dashboard.stripe.com"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Stripe account for managing the full payments lifecycle. Create and manage customers, set up products and prices, handle subscriptions, generate invoices, search payment history, and access Stripe's documentation. The server is permission-aware — it only exposes tools that match the permissions on your Restricted API Key, so you control exactly what Claude can and can't do.

Part of Stripe's broader AI toolkit that includes agent frameworks for LangChain, CrewAI, and Vercel AI SDK. The MCP server is the Claude-native entry point into that ecosystem.

## What It Does Well

- **Restricted API Key scoping is the right approach to payments security.** Create a RAK at dashboard.stripe.com/apikeys with only the permissions you want Claude to have. The MCP server checks the key's permissions and only registers tools that match. Give it read-only customer access? Claude can look up customers but can't modify them. This is how every payment integration MCP should work.
- **Remote OAuth option eliminates credential management.** The hosted server at `mcp.stripe.com` handles auth through browser-based OAuth managed in your Stripe Dashboard. No API keys in config files, no tokens in environment variables. For teams that care about credential hygiene, this is the cleanest path.
- **Documentation search tool keeps API knowledge current.** The server includes a tool for searching Stripe's docs, so Claude doesn't have to rely on potentially outdated training data for Stripe API specifics. When building integrations, having current API documentation accessible in the same conversation as your code is valuable.

## What It Doesn't Do Well

- **API key goes in CLI args, not environment variables.** The local setup pattern is `--api-key=YOUR_KEY` as a command argument. This is different from virtually every other MCP server that uses env vars. Your key ends up in the MCP config JSON as a plaintext string in the args array. The remote OAuth path avoids this, but if you need local setup, the pattern is less clean than env var isolation.
- **Test mode is essential — and easy to forget.** Stripe's test mode (keys starting with `rk_test_`) and live mode (keys starting with `rk_live_`) use different keys. If you accidentally configure a live key, Claude has access to real payment operations. The server doesn't warn you about which mode you're in. Always use test keys during development and evaluation.
- **The broader Agent Toolkit ecosystem creates confusion about what to install.** @stripe/mcp (this server), @stripe/agent-toolkit (Python + TypeScript agents), @stripe/ai-sdk (Vercel), @stripe/token-meter (usage metering) — multiple packages serving different use cases. For MCP specifically, you want @stripe/mcp. The relationship between these packages isn't immediately clear.

## Setup Notes

Remote OAuth is the recommended path for Stripe Cloud users. `npx -y mcp-remote https://mcp.stripe.com` handles everything through browser-based authorization.

For local setup, create a Restricted API Key at dashboard.stripe.com/apikeys. Start with test mode. Set granular permissions — the server is smart enough to only expose matching tools. The key goes in the args array as `--api-key=rk_test_...`.

Community testing tools exist (hideokamoto/stripe-testing-mcp-tools) for test clocks, bulk customer creation, and subscription testing scenarios. Useful for development workflows alongside the official server.

## Config

Remote (recommended):

```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.stripe.com"]
    }
  }
}
```

Local (test mode):

```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp", "--api-key=rk_test_your_restricted_key"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
