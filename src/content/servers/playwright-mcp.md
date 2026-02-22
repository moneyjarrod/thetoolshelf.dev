---
# === IDENTITY ===
slug: "playwright-mcp"
name: "Playwright MCP Server"
description: "Microsoft's official browser automation server — lets Claude control web browsers through accessibility snapshots, not screenshots."
verdict: "recommended"
verdict_note: "The standard for AI browser automation. Microsoft-backed, free, no API key, built into GitHub Copilot. The CLI+SKILLS mode shows active investment in the AI-agent use case."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "http"
license: "Apache-2.0"
github_url: "https://github.com/microsoft/playwright-mcp"
npm_package: "@playwright/mcp"
pypi_package: null
stars: 8000
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "npx @playwright/mcp@latest"
  config_json:
    command: "npx"
    args:
      - "@playwright/mcp@latest"
  env_vars: []
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "web-scraping"
  - "browser"
  - "testing"
related_slugs:
  - "firecrawl-mcp"
  - "fetch-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude full control of a web browser through Microsoft's Playwright automation framework. Navigate pages, click buttons, fill forms, read content, manage tabs, upload and download files, capture screenshots, and generate Playwright test scripts. Supports Chromium, Firefox, and WebKit. Built into GitHub Copilot's Coding Agent, which tells you where Microsoft sees AI-browser interaction heading.

The key design choice: Playwright MCP uses **accessibility snapshots** by default, not screenshots. Claude reads the page through the same accessibility tree that screen readers use — fast, deterministic, and doesn't require a vision model. A vision mode exists as fallback for pages where the accessibility tree is insufficient.

## What It Does Well

- **Zero configuration, zero cost.** `npx @playwright/mcp@latest` — that's the entire setup. No API key, no account, no environment variables. The browser launches locally, everything runs on your machine. This is the lowest barrier to entry of any MCP server in the scraping/browser category.
- **Accessibility-first architecture is faster and more reliable than screenshots.** Most browser automation for LLMs uses screenshots and vision models. Playwright MCP reads the accessibility tree instead — structured, deterministic, no token-heavy image processing. Claude gets elements with their roles, labels, and states. Clicking a button means targeting an element by its accessibility properties, not guessing at pixel coordinates.
- **The CLI+SKILLS mode is purpose-built for coding agents.** Newer than the MCP mode, this alternative reduces token consumption by avoiding large tool schemas. For coding agents that need to balance browser automation with large codebases in context, CLI+SKILLS is more efficient. MCP mode remains better for exploratory automation and long-running workflows.

## What It Doesn't Do Well

- **Shadow DOM is a known pain point.** Web components that use shadow DOM can hide their internal elements from the accessibility tree. If a site heavily uses shadow DOM (common in modern web apps built with Lit, Stencil, or custom elements), Playwright MCP may miss interactive elements. The vision mode fallback helps but defeats the accessibility-first advantage.
- **Authentication persistence across sessions is a common frustration.** Each MCP session starts a fresh browser context by default. If a workflow requires logging into a site, you'll need to re-authenticate every session. The `--extension` flag (connect to an existing Chrome with your logged-in sessions) helps, but it's an extra setup step most users don't discover immediately.
- **Headed mode requires a display.** For local development this is fine — you see the browser doing its thing. For CI/CD or headless servers, you need `--headless`. Docker mode is headless Chromium only. Not a real limitation for most developers, but worth knowing if you're deploying this in a pipeline.

## Setup Notes

Run `npx @playwright/mcp@latest` and a Chromium browser opens. That's it. The first run downloads the browser binary, which takes a minute. Subsequent runs are instant.

For browser choice, pass `--browser firefox` or `--browser webkit`. For additional capabilities like PDF generation or DevTools access, use `--caps vision,pdf,devtools`. To connect to an existing Chrome installation (useful for logged-in sessions), use `--extension`.

The Docker option (`mcr.microsoft.com/playwright/mcp`) is available for containerized environments but is limited to headless Chromium.

## Config

Standard (Chromium, headed):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Headless mode:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}
```

Docker:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "--pull=always", "mcr.microsoft.com/playwright/mcp"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
