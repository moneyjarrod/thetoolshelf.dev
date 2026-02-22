---
# === IDENTITY ===
slug: "exa-mcp"
name: "Exa MCP Server"
description: "Semantic search engine for AI — finds content by meaning, not keywords, with deep research, code context, company lookup, and web crawling tools."
verdict: "recommended"
verdict_note: "Best semantic search MCP available. Dual-mode setup (remote or local), selective tool enabling, and the deep researcher feature set it apart from keyword-based alternatives."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/exa-labs/exa-mcp-server"
npm_package: "exa-mcp-server"
pypi_package: null
stars: 2887
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
  command: "npx -y exa-mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "exa-mcp-server"
    env:
      EXA_API_KEY: "your-key-from-dashboard.exa.ai"
  env_vars:
    - name: "EXA_API_KEY"
      description: "API key from dashboard.exa.ai/api-keys — free credits on signup for testing"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Exa API key (free credits on signup)"

# === TAXONOMY ===
category:
  - "search"
  - "research"
related_slugs:
  - "brave-search-mcp"
  - "tavily-mcp"
affiliate_links:
  - label: "Exa API Plans"
    url: "https://exa.ai/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Exa is a semantic search engine built specifically for AI consumption. Instead of matching keywords like traditional search, it finds content by meaning — you describe what you're looking for in natural language and Exa returns results that match the concept, not just the words. The MCP server exposes eight tools covering web search, advanced filtered search, code context retrieval, web crawling, company research, people search, and an async deep researcher that runs multi-step research jobs.

The key distinction from Brave Search or Tavily: Exa uses neural/embedding-based retrieval. It understands what you mean, not just what you typed. This matters most for research-heavy workflows where keyword search returns noise.

## What It Does Well

- **Semantic search quality is noticeably better for research tasks.** Ask for "papers about using transformer attention mechanisms for time series forecasting" and you get relevant research, not SEO-optimized blog posts about transformers. The neural retrieval model understands domain-specific queries that keyword search struggles with.
- **Selective tool enabling keeps your tool surface clean.** The remote server supports URL parameters to expose only the tools you need: `?tools=web_search_exa,get_code_context_exa`. Most MCP servers dump all their tools into your context whether you need them or not. Exa lets you choose.
- **Deep researcher runs multi-step research asynchronously.** Start a research job with `deep_researcher_start`, check on it with `deep_researcher_check`. The server handles the multi-query, multi-source synthesis. For complex research questions, this saves significant back-and-forth compared to running individual searches.

## What It Doesn't Do Well

- **No free tier for ongoing use.** You get free credits on signup (roughly $10-20 worth), but after that it's $49/month minimum for the Starter plan. Brave Search MCP is free with no limits. If you're doing occasional searches, the cost-per-query math doesn't favor Exa. Best for teams or workflows where search quality directly impacts output quality.
- **Results are opinionated and not always transparent.** Semantic search is great when it works, but when it doesn't, you can't easily debug why. Keyword search is predictable — you know what you searched for. Neural search is a black box. Sometimes you get unexpected results and there's no way to understand the ranking logic.
- **Community forks fragment the ecosystem.** Multiple alternative implementations exist (egoist/exa-mcp, 199-mcp/mcp-exa with SSE support, it-beard/exa-server) plus a separate exa-knowledge-mcp for docs. The official server is the right choice, but the fragmentation can confuse new users browsing GitHub.

## Setup Notes

Two paths: remote or local. Remote is preferred — `npx -y mcp-remote https://mcp.exa.ai/mcp` handles everything server-side with no local dependencies beyond the mcp-remote bridge. Local install via `npx -y exa-mcp-server` works fine but requires the EXA_API_KEY environment variable.

Get your API key from dashboard.exa.ai. Signup gives you free credits to evaluate before committing to a paid plan. The remote server handles auth via the Exa dashboard, so no API key in your local config if you go that route.

## Config

Remote (preferred):

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.exa.ai/mcp"]
    }
  }
}
```

Local:

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "your-key-here"
      }
    }
  }
}
```

With selective tools (remote):

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.exa.ai/mcp?tools=web_search_exa,get_code_context_exa"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
