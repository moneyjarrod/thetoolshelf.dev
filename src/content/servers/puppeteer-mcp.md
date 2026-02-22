---
# === IDENTITY ===
slug: "puppeteer-mcp"
name: "Puppeteer MCP Server"
description: "Anthropic's reference browser automation server — functional but archived. Playwright MCP is the maintained alternative."
verdict: "skip"
verdict_note: "Archived by Anthropic — no future updates or bug fixes. Playwright MCP is the actively maintained alternative. Only consider if you have existing Puppeteer automation you can't migrate."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer"
npm_package: "@modelcontextprotocol/server-puppeteer"
pypi_package: null
stars: 218
last_updated: 2025-10-01

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
  command: "npx -y @modelcontextprotocol/server-puppeteer"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-puppeteer"
  env_vars:
    - name: "PUPPETEER_LAUNCH_OPTIONS"
      description: "JSON string with Puppeteer launch configuration (optional)"
      required: false
    - name: "ALLOW_DANGEROUS"
      description: "Enable custom Chrome executable paths (optional)"
      required: false
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "browser-automation"
related_slugs:
  - "playwright-mcp"
  - "browserbase-mcp"
  - "firecrawl-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Browser automation through Puppeteer — navigate pages, click elements, fill forms, select options, hover, evaluate JavaScript, and take screenshots. Claude controls a Chromium browser instance to interact with web pages programmatically.

This is Anthropic's reference implementation for browser automation via MCP. It has been moved to the servers-archived repository, meaning it still works but receives no updates.

## What It Does Well

- **Familiar Puppeteer API mapped to clean MCP tools.** Seven tools cover the core browser automation workflow: navigate, click, fill, select, hover, evaluate, and screenshot. If you know Puppeteer, the MCP tool names map directly to what you'd expect.
- **Customizable launch options via environment variable.** Pass PUPPETEER_LAUNCH_OPTIONS as a JSON string to configure headless mode, viewport size, custom args, and other Puppeteer launch parameters. Docker support is included for containerized environments.
- **Still works and still installs from npm.** Despite being archived, the package is still published and functional. If you have existing automation workflows built on this server, they'll continue to work.

## What It Doesn't Do Well

- **Archived by Anthropic — no future updates or bug fixes.** This server has been moved to the servers-archived repository. If Chromium updates break something, or if a new MCP spec feature would improve the server, nobody's maintaining it. Playwright MCP is the actively maintained alternative from the same team.
- **Downloads Chromium on first run, which can surprise users.** The first `npx` invocation triggers a Chromium download (100+ MB). On slow connections or in CI environments, this can cause timeout issues. Subsequent runs use the cached browser.

## Setup Notes

First run downloads Chromium — expect a delay. After that, the server launches a browser instance that Claude controls. Headless mode is default. Set PUPPETEER_LAUNCH_OPTIONS to `{"headless": false}` if you want to watch Claude interact with pages.

Docker is supported for isolated environments. The ALLOW_DANGEROUS flag enables custom Chrome executable paths if you need to use an existing Chrome installation instead of downloaded Chromium.

For new projects, we recommend Playwright MCP instead. It's actively maintained, supports more browsers, and has a larger feature set.

## Config

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

Headless off (watch Claude browse):

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "env": {
        "PUPPETEER_LAUNCH_OPTIONS": "{\"headless\": false}"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
