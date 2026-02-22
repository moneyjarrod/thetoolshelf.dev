---
# === IDENTITY ===
slug: "perplexity-mcp"
name: "Perplexity MCP Server"
description: "Official Perplexity AI server with four specialized tools — web search, conversational AI, deep research, and advanced reasoning with citations."
verdict: "recommended"
verdict_note: "Four distinct research tools covering different depth levels, from quick search to deep multi-step research. Real-time citations and source filtering make results trustworthy."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "http"
license: "MIT"
github_url: "https://github.com/perplexityai/modelcontextprotocol"
npm_package: "@perplexity-ai/mcp-server"
pypi_package: null
stars: 500
last_updated: 2026-02-15

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
  command: "npx -y @perplexity-ai/mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@perplexity-ai/mcp-server"
    env:
      PERPLEXITY_API_KEY: "pplx-your_api_key"
  env_vars:
    - name: "PERPLEXITY_API_KEY"
      description: "API key from perplexity.ai/settings/api"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Perplexity API key (paid)"

# === TAXONOMY ===
category:
  - "search"
  - "research"
  - "reasoning"
related_slugs:
  - "brave-search-mcp"
  - "tavily-mcp"
  - "exa-mcp"
affiliate_links:
  - label: "Perplexity API Pricing"
    url: "https://docs.perplexity.ai/guides/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Four specialized AI-powered research tools from Perplexity: web search (quick answers with citations), chat (conversational AI with real-time web access via sonar-pro), deep research (comprehensive multi-step research via sonar-deep-research), and reason (advanced reasoning via sonar-reasoning-pro with showThinking parameter).

Each tool targets a different research depth — from fast factual lookups to thorough investigative research that takes 30+ seconds to complete.

## What It Does Well

- **Four tools at different depth levels is the right architecture.** Quick search for facts, chat for conversational follow-ups, deep research for comprehensive analysis, and reason for complex problem-solving. Claude picks the right tool for the query complexity instead of running every search through the same one-size-fits-all pipeline.
- **Citations and source filtering build trust in results.** Every response includes citations to original sources. Recency filters (day/week/month/year), domain filtering, and academic mode let you control where information comes from. This is measurably better than search MCP servers that return results without provenance.
- **Deep research produces report-quality output.** The sonar-deep-research model runs multi-step research that takes 30+ seconds but returns comprehensive, sourced analysis. For tasks where Claude needs to understand a topic thoroughly before acting, this replaces manual multi-query research workflows.

## What It Doesn't Do Well

- **Requires a Perplexity API key, which is paid.** Unlike Brave Search MCP (free, no key) or Fetch MCP (free, no key), Perplexity requires a paid API subscription. The quality is higher, but so is the barrier to entry.
- **Deep research timeout needs manual extension in some clients.** The sonar-deep-research model can take 180+ seconds. Default MCP timeouts in some clients will kill the request before it completes. You may need to configure extended timeouts, which isn't always straightforward.

## Setup Notes

Standard npx install with API key. Get the key from perplexity.ai/settings/api. For Claude Code: `claude mcp add perplexity --env PERPLEXITY_API_KEY="pplx-your_key" -- npx -y @perplexity-ai/mcp-server`.

HTTP mode is available via `npm run start:http` for remote setups, exposing the server at `http://localhost:8080/mcp`.

If you plan to use deep_research, set your MCP client timeout to at least 180 seconds to avoid premature request termination.

## Config

```json
{
  "mcpServers": {
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {
        "PERPLEXITY_API_KEY": "pplx-your_api_key"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
