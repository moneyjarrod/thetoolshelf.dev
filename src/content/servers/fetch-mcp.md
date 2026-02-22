---
# === IDENTITY ===
slug: "fetch-mcp"
name: "Fetch MCP"
description: "Fetches web pages and converts HTML to markdown so Claude can read website content in conversation."
verdict: "recommended"
verdict_note: "Does one thing well with zero config. The only web-fetching MCP server most people will ever need."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch"
npm_package: null
pypi_package: "mcp-server-fetch"
stars: 76000
last_updated: 2025-12-18

# === SETUP ===
setup_difficulty: 1

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
  command: "uvx mcp-server-fetch"
  config_json:
    command: "uvx"
    args:
      - "mcp-server-fetch"
  env_vars:
    - name: "PYTHONIOENCODING"
      description: "Set to 'utf-8' on Windows to prevent timeout issues from character encoding. Not needed on macOS/Linux."
      required: false
  prerequisites:
    - "Python 3.10+"
    - "uv (recommended) or pip"

# === TAXONOMY ===
category:
  - "local-tools"
  - "web-scraping"
  - "browser"
related_slugs:
  - "filesystem-mcp"
  - "memory-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude the ability to fetch any URL and read the content as clean markdown. You paste a link in conversation or Claude decides it needs to read a page, and Fetch grabs it, strips the HTML, and returns readable text. That's it — one tool, one job.

## What It Does Well

- **HTML-to-markdown conversion is solid.** The output is genuinely readable. Navigation chrome, ads, and sidebar junk get stripped. What's left is the actual content in clean markdown with headers and links preserved. If you have Node.js installed alongside Python, it uses a more robust HTML simplifier automatically.
- **Chunked reading for long pages.** The `start_index` parameter lets Claude read a page in pieces rather than dumping the whole thing into context. Claude fetches the first chunk, decides it needs more, and grabs the next section. Smart approach for large documentation pages or long articles.
- **Respects robots.txt by default.** When Claude initiates a fetch (tool call), the server checks robots.txt first. User-initiated fetches via prompts bypass this. The distinction is thoughtful — autonomous agent behavior respects site rules, but explicit user requests don't get blocked. You can override either direction with `--ignore-robots-txt`.
- **Proxy and user-agent support.** For environments behind corporate proxies or sites that block default user agents, both are configurable via command-line args. Not something most people need, but essential when you do.

## What It Doesn't Do Well

- **No JavaScript rendering.** Single-page apps, dynamically loaded content, anything that requires a browser to execute JS — Fetch returns an empty or incomplete page. If the site relies on client-side rendering, you need Playwright or Puppeteer MCP instead. This is the biggest limitation and the reason it's not a replacement for a real browser automation server.
- **Can access internal network addresses.** The README explicitly warns about this. If Claude fetches `http://localhost:8080` or an internal IP, it'll try. On a dev machine this is low-risk, but in a shared or corporate environment it's a security consideration. There's no built-in allowlist for domains.
- **Windows requires an env var workaround.** Without `PYTHONIOENCODING=utf-8` in your config, the server can timeout silently on Windows due to character encoding issues. The README documents this, but you'll waste time debugging if you miss it. Every Windows config should include this env var by default.

## Setup Notes

Slightly different from the TypeScript reference servers because it's Python-based. You need `uv` (or `pip`) installed instead of Node.js. If you already have `uv` from other Python tooling, setup is instant — `uvx` handles everything. If you don't have `uv`, that's an extra install step, but it's a one-liner.

On Windows, add the `PYTHONIOENCODING` env var to your config immediately. Don't wait to debug a timeout. The README buries this in a troubleshooting section — it should be in the default config example.

Optionally install Node.js alongside Python for a better HTML simplifier. The server detects Node.js automatically and uses it if available. Not required, but the markdown output quality improves noticeably on complex pages.

## Config

Standard config (macOS/Linux):

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```

Windows config (always include the encoding fix):

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"],
      "env": {
        "PYTHONIOENCODING": "utf-8"
      }
    }
  }
}
```

With custom user agent and robots.txt disabled:

```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch", "--ignore-robots-txt", "--user-agent=MyBot/1.0"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
