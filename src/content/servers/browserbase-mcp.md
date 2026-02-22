---
# === IDENTITY ===
slug: "browserbase-mcp"
name: "Browserbase MCP Server"
description: "Cloud browser automation with Stagehand AI SDK — stealth mode, anti-bot bypass, and session persistence for complex interactive workflows."
verdict: "conditional"
verdict_note: "Powerful cloud browser automation with AI-driven page understanding, but requires both a Browserbase paid account and a separate LLM API key for Stagehand. Overkill for simple scraping."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "Apache-2.0"
github_url: "https://github.com/browserbase/mcp-server-browserbase"
npm_package: "@browserbasehq/mcp-server-browserbase"
pypi_package: null
stars: 500
last_updated: 2026-02-01

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
  command: "npx @browserbasehq/mcp-server-browserbase"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@browserbasehq/mcp-server-browserbase"
    env:
      BROWSERBASE_API_KEY: "your_browserbase_key"
      BROWSERBASE_PROJECT_ID: "your_project_id"
  env_vars:
    - name: "BROWSERBASE_API_KEY"
      description: "API key from browserbase.com dashboard"
      required: true
    - name: "BROWSERBASE_PROJECT_ID"
      description: "Project ID from browserbase.com dashboard"
      required: true
  prerequisites:
    - "Node.js 18+"
    - "Browserbase account (paid)"
    - "LLM API key for Stagehand (Gemini default, supports Anthropic/OpenAI)"

# === TAXONOMY ===
category:
  - "browser-automation"
  - "scraping"
related_slugs:
  - "playwright-mcp"
  - "puppeteer-mcp"
  - "firecrawl-mcp"
affiliate_links:
  - label: "Browserbase Pricing"
    url: "https://www.browserbase.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Cloud-hosted browser automation that runs in Browserbase's infrastructure instead of your local machine. The Stagehand AI SDK powers high-level browser interactions — act, extract, observe — using an LLM internally to understand page structure. Features include stealth mode, proxy support, anti-bot bypass, session persistence across requests, and Shadow DOM/iframe support.

This is for complex interactive automation where local Playwright or Puppeteer would be blocked or insufficient. Simple page fetching or scraping doesn't need this.

## What It Does Well

- **Stealth mode and anti-bot bypass handle sites that block automation.** If your target pages detect headless browsers, require CAPTCHA solving, or use aggressive bot detection, Browserbase's cloud infrastructure handles the evasion. Local Playwright and Puppeteer get blocked on these sites.
- **Session persistence lets Claude maintain state across interactions.** Browser contexts persist between MCP calls, so Claude can log into a site in one request and continue interacting as a logged-in user in subsequent requests. Local MCP browser servers lose state when the tool call ends.
- **Stagehand's AI-driven page understanding reduces brittle selectors.** Instead of writing CSS selectors that break when a site redesigns, Stagehand uses an LLM to understand page structure semantically. "Click the login button" works even when the button's class name changes.

## What It Doesn't Do Well

- **Nested LLM dependency adds cost and complexity.** Stagehand uses its own LLM (Gemini by default) internally to understand pages. You're paying for Claude's API calls plus a second model's API calls plus Browserbase's service fee. Three cost layers for browser automation.
- **Overkill for most scraping tasks.** If you just need to extract text from a page, Firecrawl or Fetch MCP do it faster and cheaper. Browserbase's value is in interactive automation with anti-bot requirements — a minority of MCP browser use cases.

## Setup Notes

Three credentials needed: Browserbase API key, project ID, and an LLM API key for Stagehand. The LLM defaults to Gemini but supports Anthropic and OpenAI. Setup is advanced — rated 3/3 — because of the multi-credential requirement and the conceptual overhead of understanding what Stagehand does with its internal LLM.

Docker is also supported if you prefer containerized setup.

## Config

```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["-y", "@browserbasehq/mcp-server-browserbase"],
      "env": {
        "BROWSERBASE_API_KEY": "your_browserbase_key",
        "BROWSERBASE_PROJECT_ID": "your_project_id"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
