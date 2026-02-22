---
# === IDENTITY ===
slug: "crawl4ai-mcp"
name: "Crawl4AI MCP Server"
description: "Open-source LLM-friendly web crawler with MCP support via Docker — the self-hosted alternative to Firecrawl."
verdict: "skip"
verdict_note: "No official MCP server — MCP is a Docker sidecar feature, not a maintained integration. Community is fragmented. Firecrawl MCP does the same job with an official server and npx install. The crawler is excellent; the MCP experience is not."

# === TECHNICAL ===
language: "Python"
transport:
  - "sse"
license: "Apache-2.0"
github_url: "https://github.com/unclecode/crawl4ai"
npm_package: null
pypi_package: "crawl4ai"
stars: 59600
last_updated: 2026-02-15

# === SETUP ===
setup_difficulty: 3

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
  command: "docker run -d -p 11235:11235 unclecode/crawl4ai:latest"
  config_json:
    url: "http://localhost:11235/mcp/sse"
  env_vars: []
  prerequisites:
    - "Docker"

# === TAXONOMY ===
category:
  - "scraping"
  - "browser-automation"
related_slugs:
  - "firecrawl-mcp"
  - "playwright-mcp"
  - "fetch-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Open-source web crawler specifically designed for LLM consumption. The Docker image includes MCP support at `http://localhost:11235/mcp/sse`, providing tools for markdown extraction, screenshots, PDF generation, JavaScript execution, batch crawling, link extraction, and raw HTML access.

Crawl4AI is the self-hosted, free alternative to Firecrawl. Same concept — turn web pages into LLM-friendly content — but you run the infrastructure.

## What It Does Well

- **59.6K GitHub stars for a reason — the crawler itself is excellent.** Adaptive crawling, clean markdown output, LLM-optimized content extraction. The quality of the crawled content is what makes this worth the Docker setup overhead. When it comes to turning messy web pages into structured data for LLMs, Crawl4AI is best-in-class open source.
- **Self-hosted means zero API costs and no rate limits.** Unlike Firecrawl's paid API, Crawl4AI runs on your hardware. Crawl as much as you want, as fast as your machine allows, with no per-page charges. For high-volume scraping workflows, the cost savings are significant.
- **Rich community ecosystem.** RAG integration with Supabase vector DB (coleam00/mcp-crawl4ai-rag), SearXNG search integration (luxiaolei/searxng-crawl4ai-mcp), and Cloudflare Workers deployment (BjornMelin). Multiple approaches for different architectures.

## What It Doesn't Do Well

- **No official MCP server — it's a feature of the Docker image.** The MCP endpoint exists but isn't a standalone maintained server. Feature request #710 is still open. You're relying on MCP being a side feature of the main Docker deployment, not a first-class integration.
- **Docker requirement raises the setup difficulty floor.** Most MCP servers are `npx` one-liners. Crawl4AI requires Docker running, pulling a container image, and configuring SSE transport. For developers comfortable with Docker this is trivial, but it's a barrier for the npx-and-go crowd.

## Setup Notes

Pull and run the Docker image, then configure your MCP client to connect via SSE at `http://localhost:11235/mcp/sse`. For Claude Code: `claude mcp add c4ai-sse http://localhost:11235/mcp/sse`.

The Docker image handles everything — Chromium, Python dependencies, the MCP endpoint. First pull is large (~2GB) but subsequent starts are fast.

Community implementations offer alternative paths if you want npx-style setup or additional features like RAG vector storage.

## Config

```json
{
  "mcpServers": {
    "crawl4ai": {
      "url": "http://localhost:11235/mcp/sse"
    }
  }
}
```

Start the server first:
```bash
docker run -d -p 11235:11235 unclecode/crawl4ai:latest
```

## Tested With

- Claude Desktop on Windows 11
