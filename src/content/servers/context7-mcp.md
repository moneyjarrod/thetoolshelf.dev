---
# === IDENTITY ===
slug: "context7-mcp"
name: "Context7 MCP Server"
description: "Injects up-to-date, version-specific library documentation directly into LLM prompts — solves the hallucinated API problem."
verdict: "recommended"
verdict_note: "Solves a real, common pain point. Dead simple to use, free, and the 'use context7' trigger is elegant. Only as good as the indexed libraries, but coverage is growing fast."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "http"
license: "Apache-2.0"
github_url: "https://github.com/upstash/context7"
npm_package: "@upstash/context7-mcp"
pypi_package: null
stars: 3000
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 1

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "full"
  vscode: "full"
  claude_code: "full"
  windsurf: "full"
  cline: "full"

# === INSTALL ===
install:
  command: "npx -y @upstash/context7-mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@upstash/context7-mcp"
  env_vars:
    - name: "CONTEXT7_API_KEY"
      description: "Optional API key from context7.com/dashboard for higher rate limits"
      required: false
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "search"
  - "knowledge"
  - "coding"
related_slugs:
  - "brave-search-mcp"
  - "fetch-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Fetches current, version-specific documentation and code examples for programming libraries and frameworks, then injects them directly into your LLM's context. The problem it solves: Claude was trained on documentation that may be outdated, leading to generated code that uses APIs that have been renamed, deprecated, or never existed. Context7 gives Claude the actual current docs for the library version you're using.

Two tools, one workflow: `resolve-library-id` takes a library name and returns a Context7 identifier, then `query-docs` takes that identifier plus your question and returns relevant documentation snippets with code examples. In practice, adding "use context7" to your prompt triggers the whole flow automatically.

## What It Does Well

- **The "use context7" trigger pattern is elegant UX.** Instead of manually calling tools, you just append "use context7" to any coding question and the server handles library resolution and doc fetching automatically. Most MCP servers require the LLM to decide when to use them — this one gives the user a simple trigger phrase that works consistently.
- **Version-specific docs prevent the most common LLM coding failure.** "How do I set up middleware in Next.js 14" gets you Next.js 14 docs, not Next.js 12 patterns. You can also use slash syntax for direct targeting: `/supabase/supabase` goes straight to Supabase docs without the resolution step. This is the core value — specificity over generality.
- **Free and frictionless.** Works without an API key at basic rate limits. Add a free API key from context7.com/dashboard for higher limits. No credit card, no account approval. Remote server option at `mcp.context7.com/mcp` means you don't even need Node.js locally.

## What It Doesn't Do Well

- **Only 2 tools means zero flexibility.** You get resolve and query. There's no way to browse available libraries, suggest related frameworks, check when docs were last indexed, or contribute corrections. If the indexed docs for your library are wrong or stale, there's no feedback mechanism through the MCP server itself.
- **Community-contributed library index means coverage varies.** Popular frameworks (React, Next.js, Supabase) are well-indexed. Niche libraries or very new releases may not be in the index yet. There's no guarantee any given library is available, and no way to check from within the MCP server without trying.
- **The backend is closed source.** The MCP server code is open, but the parsing engine, crawling infrastructure, and library index are proprietary. If Upstash changes pricing, rate limits, or shuts down the service, there's no self-hosted fallback for the backend. You're dependent on their continued operation.

## Setup Notes

One npx command, optionally with an API key for higher rate limits. That's the whole setup. No accounts required for basic usage.

The remote option at `mcp.context7.com/mcp` supports OAuth and works with clients that handle remote MCP servers natively. For everything else, the stdio/npx path is more universal.

Windows users may need the `cmd /c npx -y @upstash/context7-mcp` wrapper pattern.

## Config

Local (recommended):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

With API key for higher rate limits:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

Remote:

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
