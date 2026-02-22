---
# === IDENTITY ===
slug: "firecrawl-mcp"
name: "Firecrawl MCP Server"
description: "Official Firecrawl server for AI-powered web scraping, crawling, and structured data extraction — turns websites into clean, LLM-ready content."
verdict: "recommended"
verdict_note: "Best-in-class web scraping for AI workflows. Handles JS rendering, anti-bot friction, and structured extraction. Free tier is generous enough to evaluate."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/firecrawl/firecrawl-mcp-server"
npm_package: "firecrawl-mcp"
pypi_package: null
stars: 2000
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
  command: "npx -y firecrawl-mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "firecrawl-mcp"
    env:
      FIRECRAWL_API_KEY: "YOUR_API_KEY"
  env_vars:
    - name: "FIRECRAWL_API_KEY"
      description: "API key from firecrawl.dev/app/api-keys — free tier available"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Firecrawl API key (free tier: 10 scrapes/min)"

# === TAXONOMY ===
category:
  - "web-scraping"
  - "browser"
related_slugs:
  - "fetch-mcp"
  - "playwright-mcp"
affiliate_links:
  - label: "Firecrawl Plans"
    url: "https://firecrawl.dev/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Turns websites into clean, LLM-ready markdown or structured JSON. Firecrawl handles the hard parts of web scraping — JavaScript rendering, anti-bot detection, retries, rate limiting — so Claude can focus on what to do with the data. Scrape single pages, crawl entire sites, map URLs, search the web, or extract structured data with custom schemas. Also includes browser session management for persistent automation tasks.

The structured extraction feature is worth calling out specifically: you define a JSON schema for what you want (product names, prices, descriptions) and Firecrawl returns clean data matching your schema. No regex, no DOM parsing, no manual cleanup.

## What It Does Well

- **Structured extraction with schemas is the killer feature.** Tell Firecrawl "extract product name, price, and rating from this page" with a schema definition, and you get back clean JSON. This is what separates it from generic scraping — you're not getting raw HTML or hoping the LLM can parse a wall of text. The data arrives structured and ready to use.
- **Handles JavaScript-heavy sites that simpler tools can't.** Fetch MCP returns raw HTML — if the content is rendered by React or loaded dynamically, you get an empty shell. Firecrawl renders the page fully before extracting content. Single-page apps, lazy-loaded content, and interactive sites all work.
- **Full-site crawling with depth and path controls.** The `crawl` tool takes a URL and returns every page on the site, with configurable depth limits and path filters. Combined with `map` (which generates a URL sitemap), you can methodically work through an entire domain. Useful for competitive analysis, documentation indexing, or data collection.

## What It Doesn't Do Well

- **Requires an API key and costs can sneak up.** Free tier gives you 10 scrapes per minute, 5 searches per minute, and 1 crawl per minute. That's enough for evaluation but heavy workflows will hit limits fast. Crawling a 500-page site isn't free. The server has credit usage monitoring with configurable warning thresholds, but you need to set those up proactively.
- **The API backend is closed source.** The MCP server itself is open source, but the scraping engine, parsing pipeline, and crawling infrastructure are proprietary. You're dependent on Firecrawl's hosted service. The self-hosted option exists but requires running their infrastructure locally.
- **Browser session tools are newer and more experimental.** The `browser_create_session`, `browser_execute`, and related tools for persistent browser automation are less battle-tested than the core scraping tools. For browser automation, Playwright MCP is more mature.

## Setup Notes

Get an API key from firecrawl.dev (sign up, free tier available), add it to the config, and you're running. The setup is genuinely simple — one environment variable and an npx command.

A remote server option exists at `mcp.firecrawl.dev/v2/mcp` that uses bearer token auth in headers. If your client supports remote HTTP servers, this avoids the local install entirely.

Windows users may need the `cmd /c` wrapper pattern with inline environment variable setting. Check Firecrawl's docs for Windows-specific configs. There's also a known VS Code JSON schema validation bug that can block MCP server registration — the workaround is disabling JSON validation in VS Code settings.

## Config

Local (recommended):

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-your_key_here"
      }
    }
  }
}
```

Remote (no local install):

```json
{
  "mcpServers": {
    "firecrawl": {
      "url": "https://mcp.firecrawl.dev/v2/mcp",
      "headers": {
        "Authorization": "Bearer fc-your_key_here"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
