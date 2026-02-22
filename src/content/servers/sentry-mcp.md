---
# === IDENTITY ===
slug: "sentry-mcp"
name: "Sentry MCP Server"
description: "Official Sentry server for searching issues, events, and errors — includes AI-powered fix recommendations via Sentry's Seer integration."
verdict: "conditional"
verdict_note: "Powerful for teams already using Sentry, but the embedded LLM requirement for AI features is an unusual dependency that adds cost and complexity. Great if you're on Sentry paid plans, skip if you just want error search."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "Apache-2.0"
github_url: "https://github.com/getsentry/sentry-mcp"
npm_package: "@sentry/mcp-server"
pypi_package: null
stars: 11891
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
  command: "npx -y @sentry/mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@sentry/mcp-server"
    env:
      SENTRY_ACCESS_TOKEN: "your-token"
  env_vars:
    - name: "SENTRY_ACCESS_TOKEN"
      description: "Auth token from sentry.io/settings/auth-tokens/"
      required: true
    - name: "EMBEDDED_AGENT_PROVIDER"
      description: "LLM provider for AI search features (openai or anthropic) — optional but needed for Seer"
      required: false
    - name: "OPENAI_API_KEY"
      description: "Required if EMBEDDED_AGENT_PROVIDER is openai"
      required: false
    - name: "ANTHROPIC_API_KEY"
      description: "Required if EMBEDDED_AGENT_PROVIDER is anthropic"
      required: false
  prerequisites:
    - "Node.js 18+"
    - "Sentry account with auth token"
    - "Optional: separate LLM API key for AI-powered search features"

# === TAXONOMY ===
category:
  - "devops"
  - "monitoring"
related_slugs:
  - "grafana-mcp"
affiliate_links:
  - label: "Sentry Plans"
    url: "https://sentry.io/pricing/"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Sentry error tracking instance. Search issues and events, get detailed error information, create and update issues, and — with the Seer integration — get AI-generated fix recommendations for your bugs. The server works with both Sentry's hosted platform and self-hosted instances.

The standout feature is Seer, Sentry's AI analysis engine. When enabled, it provides root cause analysis and suggested fixes for errors. But there's a significant catch in how it's wired up (see below).

## What It Does Well

- **AI-powered fix recommendations via Seer are genuinely useful.** When Seer is enabled, Claude doesn't just show you the error — it gets Sentry's analysis of the root cause and suggested code changes. For teams triaging dozens of issues, having the fix suggestion ready in the MCP response saves real time.
- **Remote OAuth server is the cleanest setup path.** The hosted version at `mcp.sentry.dev/mcp` handles auth via OAuth in your browser. No tokens in config files, no environment variables to manage. Just connect and authorize.
- **Self-hosted Sentry support is a real differentiator.** The `--host` flag lets you point the server at any Sentry instance, not just sentry.io. For enterprise teams running self-hosted Sentry, this is the only official MCP option. You can also disable specific skills (like Seer) with `--disable-skills=seer`.

## What It Doesn't Do Well

- **The AI search features require a separate LLM API key.** This is the big gotcha. Sentry's MCP server itself calls an LLM for AI-powered search and analysis. You need to set `EMBEDDED_AGENT_PROVIDER` (openai or anthropic) plus the corresponding API key. So Claude is talking to an MCP server that's talking to another LLM. The cost and complexity of this nested dependency is unusual and not immediately obvious from the README.
- **Token consumption is effectively doubled for AI features.** When Claude queries Sentry with AI features enabled, the MCP server makes its own LLM calls behind the scenes. You're paying for Claude's tokens AND the embedded agent's tokens. For teams watching API costs, this adds up quickly with no visibility into the inner LLM's usage.
- **Issue management tools are basic compared to dedicated project management MCPs.** Create and update issue operations exist but are straightforward CRUD. If you need sophisticated workflow automation (assigning, triaging, bulk operations), you'll need supplementary tooling.

## Setup Notes

Two paths: remote OAuth or local with token. Remote is recommended for Sentry Cloud users — `npx -y mcp-remote https://mcp.sentry.dev/mcp` handles everything through browser-based OAuth.

For local setup, generate an auth token at sentry.io/settings/auth-tokens. If you want the AI features, you'll also need an OpenAI or Anthropic API key configured separately. This is the part that surprises people — the MCP server has its own LLM dependency.

Self-hosted users: add `--host https://your-sentry.example.com` to the args. Skills can be individually disabled if you don't want Seer or other AI features.

## Config

Remote (recommended for Sentry Cloud):

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.sentry.dev/mcp"]
    }
  }
}
```

Local (with AI features):

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_ACCESS_TOKEN": "sntrys_your_token_here",
        "EMBEDDED_AGENT_PROVIDER": "anthropic",
        "ANTHROPIC_API_KEY": "sk-ant-your_key_here"
      }
    }
  }
}
```

Local (without AI features):

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server", "--disable-skills=seer"],
      "env": {
        "SENTRY_ACCESS_TOKEN": "sntrys_your_token_here"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
