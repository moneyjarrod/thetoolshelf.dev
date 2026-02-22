---
# === IDENTITY ===
slug: "brave-search-mcp"
name: "Brave Search MCP Server"
description: "Gives Claude access to Brave's web search, local business search, image search, video search, news search, and AI-powered summarization — all through one API key."
verdict: "recommended"
verdict_note: "The most full-featured search MCP server available. Six specialized tools, a generous free tier, and active maintenance by Brave themselves. The API key signup is the only friction."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/brave/brave-search-mcp-server"
npm_package: "@brave/brave-search-mcp-server"
pypi_package: null
stars: 800
last_updated: 2025-11-01

# === SETUP ===
setup_difficulty: 2

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "untested"
  vscode: "untested"
  claude_code: "untested"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "npx -y @brave/brave-search-mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@brave/brave-search-mcp-server"
    env:
      BRAVE_API_KEY: "your-api-key-here"
  env_vars:
    - name: "BRAVE_API_KEY"
      description: "API key from brave.com/search/api — free tier gives 2,000 queries/month"
      required: true
    - name: "BRAVE_MCP_ENABLED_TOOLS"
      description: "Whitelist specific tools (comma-separated). Optional — all tools enabled by default."
      required: false
    - name: "BRAVE_MCP_DISABLED_TOOLS"
      description: "Blacklist specific tools (comma-separated). Optional."
      required: false
  prerequisites:
    - "Node.js 18+"
    - "Brave Search API key (free at brave.com/search/api)"

# === TAXONOMY ===
category:
  - "search"
  - "web"
related_slugs:
  - "fetch-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude the ability to search the web through Brave's independent search index. Unlike the Fetch MCP server which retrieves a single URL you already know, Brave Search lets Claude actually go find things — web pages, local businesses, images, videos, and news articles. It's the official server built by Brave, not the older Anthropic reference implementation (which is now archived).

Six tools ship with the server: `brave_web_search` for general queries, `brave_local_search` for businesses and places, `brave_image_search` for images, `brave_video_search` for video results, `brave_news_search` for current events, and `brave_summarizer` which generates AI summaries from search results. The web and news search tools work on the free tier. Local search and the summarizer require a Pro plan.

## What It Does Well

- **Six specialized search tools instead of one.** Most search MCP servers give you a single web search endpoint. Brave splits this into purpose-built tools — web, local, image, video, news, and summarizer. Claude picks the right one based on your question. Ask about a restaurant and it uses local search with ratings and hours. Ask about recent events and it routes to news search. This specialization produces better results than a one-size-fits-all search.
- **Tool whitelist and blacklist.** If six tools is too many for your setup, `BRAVE_MCP_ENABLED_TOOLS` lets you whitelist only the ones you want, and `BRAVE_MCP_DISABLED_TOOLS` lets you block specific tools. This is the same idea as GitHub MCP's toolsets but done through environment variables. Good for keeping the tool count manageable when running multiple MCP servers.
- **v2.x cleaned up the response format.** Version 1.x returned base64-encoded image data alongside URLs, which bloated responses and consumed context window for no reason. Version 2.x strips that out and returns response objects that closely match the raw Brave API output. This makes responses faster and lighter.

## What It Doesn't Do Well

- **Requires an API key even on the free tier.** You can't just install and go. You need to create a Brave Search API account, subscribe to the free plan, and generate a key. The free tier is generous (2,000 queries/month) but it's still a signup wall that servers like Fetch MCP don't have. If you just want Claude to look something up occasionally, the setup cost may not be worth it.
- **Local search and summarizer are Pro-only.** Two of the six tools require a paid plan. The server handles this gracefully — local search falls back to filtered web results if you're on the free tier — but it means the full feature set costs money. The Pro plan pricing varies and Brave's API pricing page should be checked for current rates.
- **No built-in result caching.** Every query hits the Brave API and counts against your quota. If Claude rephrases and re-searches the same topic in a conversation, that's multiple API calls for essentially the same information. There's no deduplication or caching layer. On the free tier's 2,000/month limit, a heavy research session can burn through queries fast.

## Setup Notes

Two things tripped us up. First, there are two Brave Search MCP servers floating around in guides and tutorials. The **old** one is `@modelcontextprotocol/server-brave-search` from Anthropic's archived reference implementations. The **new** one is `@brave/brave-search-mcp-server` from Brave's own GitHub. Use the new one — the old one is archived and won't receive updates. If you followed an older setup guide, check which package you're running.

Second, Brave's API signup flow sends you through a "Data for AI" subscription page. The free tier is under "Subscriptions" in the left menu of the API dashboard. It's not immediately obvious — you need to actively subscribe to the free plan before your key will work. Just generating a key without subscribing to a plan gives you a key that returns authorization errors.

Windows users: Brave's own guide notes that some Windows users have issues with MCP when using a Node.js installer rather than a version manager (nvm-windows). If you get startup failures, this is the first thing to check.

## Config

Standard (npx, all tools enabled):

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Web search only (minimal tool footprint):

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here",
        "BRAVE_MCP_ENABLED_TOOLS": "brave_web_search"
      }
    }
  }
}
```

Docker:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "BRAVE_API_KEY",
        "docker.io/mcp/brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Common mistake:** Don't use `@modelcontextprotocol/server-brave-search` — that's the archived Anthropic version. The correct package is `@brave/brave-search-mcp-server`.

## Tested With

- Claude Desktop on Windows 11
