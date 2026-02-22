---
# === IDENTITY ===
slug: "tavily-mcp"
name: "Tavily MCP Server"
description: "AI-optimized search engine with extract, map, and crawl tools — returns results designed for LLM consumption, not human browsing."
verdict: "recommended"
verdict_note: "Best free-tier search MCP for AI workflows. 1,000 free credits/month with no credit card, clean tool set, and results formatted specifically for LLM consumption."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/tavily-ai/tavily-mcp"
npm_package: null
pypi_package: null
stars: 1207
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
  command: "npx -y mcp-remote https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "mcp-remote"
      - "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"
  env_vars:
    - name: "tavilyApiKey"
      description: "API key from tavily.com — free tier available (1,000 credits/month, no credit card)"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Tavily API key (free tier: 1,000 credits/month)"

# === TAXONOMY ===
category:
  - "search"
  - "research"
related_slugs:
  - "brave-search-mcp"
  - "exa-mcp"
affiliate_links:
  - label: "Tavily Plans"
    url: "https://tavily.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Tavily is a search API built specifically for AI agents and LLMs. Unlike traditional search engines that return HTML pages designed for humans, Tavily returns clean, structured content optimized for language model consumption. The MCP server exposes four tools: search (web queries), extract (pull content from specific URLs), map (generate URL sitemaps), and crawl (traverse entire sites). It's widely used in the LangChain and LlamaIndex ecosystems as the default search provider.

The core value proposition: you get search results that Claude can actually use without needing to parse HTML, filter ads, or extract content from noisy web pages.

## What It Does Well

- **Free tier is genuinely usable.** 1,000 credits per month, no credit card required. One basic search costs one credit, an advanced search costs two. For personal projects and testing, the free tier covers a lot of ground. This is the easiest search MCP to evaluate without financial commitment.
- **Results are pre-processed for LLM consumption.** Tavily strips out navigation, ads, and irrelevant page elements before returning results. Claude gets clean content it can reason about immediately. With other search tools, you often need a follow-up step to extract useful text from raw HTML. Tavily skips that step.
- **Extract, map, and crawl go beyond simple search.** Extract pulls structured content from specific URLs. Map generates a sitemap for a domain. Crawl traverses a site systematically. These tools together cover the full spectrum from quick lookups to comprehensive site analysis.

## What It Doesn't Do Well

- **Credits don't roll over.** Unused free credits expire at month end. If you're on a paid plan and have a slow month, those credits are gone. This is standard for API platforms but worth knowing — you can't stockpile credits for a big research sprint.
- **API key goes in the URL for remote setup.** The remote MCP server takes your API key as a URL parameter: `https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY`. This works but means your key is visible in your MCP config file. The OAuth flow is an alternative but adds setup complexity. Not a security disaster — your config file is local — but it's less clean than environment variable patterns.
- **Search depth and quality depend on your credit tier.** Basic search (1 credit) returns fewer and shallower results than advanced search (2 credits). The difference is noticeable for complex queries. If you're on the free tier and doing serious research, you'll burn through credits fast switching to advanced mode.

## Setup Notes

Remote server via mcp-remote is the recommended path. Your API key goes directly in the URL. Sign up at tavily.com for a free key — no credit card, instant activation.

You can set default parameters via a DEFAULT_PARAMETERS header on the remote connection, controlling things like include_images, search_depth, and max_results. This lets you tune behavior globally rather than per-query.

Multiple deprecated community implementations exist (RamXX/mcp-tavily, altinakseven/tavily-mcp-server) — the official remote server supersedes all of them.

## Config

Remote (recommended):

```json
{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.tavily.com/mcp/?tavilyApiKey=tvly-your_key_here"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
