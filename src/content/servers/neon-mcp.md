---
# === IDENTITY ===
slug: "neon-mcp"
name: "Neon MCP Server"
description: "Official Neon server for managing serverless Postgres — branch-based migrations, query tuning, and project management through natural language."
verdict: "recommended"
verdict_note: "Best serverless Postgres MCP experience. Branch-based migrations are a genuine innovation that makes database changes safer. neonctl init makes setup trivial."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "http"
  - "stdio"
license: "MIT"
github_url: "https://github.com/neondatabase/mcp-server-neon"
npm_package: "@neondatabase/mcp-server-neon"
pypi_package: null
stars: 1200
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
  command: "npx -y mcp-remote@latest https://mcp.neon.tech/mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "mcp-remote@latest"
      - "https://mcp.neon.tech/mcp"
  env_vars:
    - name: "NEON_API_KEY"
      description: "API key from console.neon.tech/app/settings/api-keys (only for local install)"
      required: false
  prerequisites:
    - "Neon account (free tier: 1 project, 0.5 GiB storage)"
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "database"
  - "postgres"
  - "cloud"
related_slugs:
  - "supabase-mcp"
  - "postgres-mcp-pro"
  - "sqlite-mcp"
affiliate_links:
  - label: "Neon Pro Plan"
    url: "https://neon.tech/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to Neon's serverless Postgres platform. You can create and manage projects, run SQL, apply schema migrations with branch-based safety, analyze slow queries, tune performance, and provision authentication — all through conversation. Like Supabase MCP, this is platform-specific: it manages Neon databases, not generic Postgres instances.

The standout feature is the branch-based migration workflow. Instead of running `ALTER TABLE` directly on your main branch, the server creates a temporary branch, applies the migration there, lets you verify it worked, then commits to main. It's database version control with a safety net.

## What It Does Well

- **Branch-based migrations are the killer feature.** `prepare_database_migration` creates a temporary branch and applies your schema change there. You test it, verify the results, then `complete_database_migration` applies it to main. If something goes wrong, the temp branch is disposable. No other database MCP server provides this workflow — it's genuinely safer than direct SQL execution.
- **Query tuning is a complete workflow, not just a single tool.** `get_slow_queries` identifies problems via pg_stat_statements, `explain_sql_statement` shows the execution plan, `prepare_query_tuning` tests optimizations on a temp branch, and `complete_query_tuning` applies the fixes. The whole loop stays inside the MCP server — no switching tools.
- **neonctl init is the easiest MCP setup experience.** One command auto-detects your installed clients (Cursor, VS Code, Claude Code), installs the MCP server, configures agent skills, and sets up the VS Code extension. It's opinionated but it works. You go from zero to connected in under a minute.

## What It Doesn't Do Well

- **Neon Cloud only.** No self-hosted Postgres, no local databases, no other providers. If you're running Postgres on your own hardware or on another cloud, this isn't your tool.
- **The OAuth remote path needs an mcp-remote proxy.** The remote server at `mcp.neon.tech/mcp` uses OAuth, which is great for authentication. But clients that don't natively support remote MCP need the `mcp-remote` npm package as a bridge. It works, but it's an extra dependency between you and the server.
- **neonctl init auto-detects and configures clients.** This is listed as a pro above, but it can also surprise you. If you have multiple IDE clients installed, it may configure more of them than you intended. Check your MCP configs after running it.

## Setup Notes

Three paths, pick one. For the remote server with OAuth: use the `mcp-remote` config below, authenticate in the browser when prompted. For local with an API key: generate one at console.neon.tech, pass it as the startup argument. For the one-command experience: run `neonctl mcp install` and let it handle everything.

The free tier gives you 1 project, 0.5 GiB storage, and 191.9 compute hours per month. That's enough to build real things and test the MCP server thoroughly.

Windows users running the local server may need the `cmd /c npx ...` wrapper pattern — Neon's docs include Windows-specific configs.

## Config

Remote server with OAuth (recommended):

```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.neon.tech/mcp"]
    }
  }
}
```

Local with API key:

```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "@neondatabase/mcp-server-neon", "start", "YOUR_NEON_API_KEY"]
    }
  }
}
```

Windows local (cmd wrapper):

```json
{
  "mcpServers": {
    "neon": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@neondatabase/mcp-server-neon", "start", "YOUR_NEON_API_KEY"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
