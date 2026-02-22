---
# === IDENTITY ===
slug: "prisma-mcp"
name: "Prisma MCP Server"
description: "Official dual-mode MCP — local CLI for development workflows and remote server for Prisma Postgres infrastructure management."
verdict: "recommended"
verdict_note: "Built into the Prisma CLI with zero extra install for Prisma users. Local for dev, remote for infrastructure. Clean architecture with AI safety guardrails for destructive commands."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "streamable-http"
license: "Apache-2.0"
github_url: "https://github.com/prisma/mcp"
npm_package: "prisma"
pypi_package: null
stars: 41900
last_updated: 2026-02-15

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
  command: "npx prisma mcp"
  config_json:
    command: "npx"
    args:
      - "prisma"
      - "mcp"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Prisma CLI v6.6.0+"
    - "Supported database (PostgreSQL, MySQL, SQLite, etc.)"

# === TAXONOMY ===
category:
  - "database"
  - "orm"
related_slugs:
  - "postgres-mcp-pro"
  - "supabase-mcp"
  - "neon-mcp"
affiliate_links:
  - label: "Prisma Postgres Pricing"
    url: "https://www.prisma.io/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Two servers in one package. The local MCP server (`npx prisma mcp`) gives Claude access to your development workflow — migration status, schema management, query execution, and Prisma Studio. The remote server (`https://mcp.prisma.io/mcp`) manages Prisma Postgres infrastructure — provisioning databases, creating backups, managing connection strings.

If you use Prisma as your ORM, the local server is immediately useful. If you use Prisma Postgres for hosting, the remote server adds infrastructure management.

## What It Does Well

- **Zero-install for existing Prisma users.** The MCP server is built into the Prisma CLI starting at v6.6.0. If you already have Prisma, you already have the MCP server. `npx prisma mcp` and you're connected. No separate package, no version management, no configuration beyond what you already have.
- **Dual-mode architecture separates concerns correctly.** Local handles development (migrations, schema, queries). Remote handles infrastructure (provisioning, backups, credentials). You can use one without the other. Most developers will start with local and add remote only if they use Prisma Postgres hosting.
- **One-click installs for VS Code and Cursor.** Official install badges mean setup in supported editors is literally a single click. The friction-to-value ratio is as low as it gets in the MCP ecosystem.

## What It Doesn't Do Well

- **The remote server only works with Prisma Postgres, not any Postgres.** If you host your own PostgreSQL or use another provider (Neon, Supabase, RDS), the remote server's infrastructure tools are irrelevant. The local server works with any Prisma-supported database, but the remote is vendor-locked.
- **Requires Prisma CLI v6.6.0+ which may not be your current version.** If your project pins an older Prisma version, upgrading the CLI to get MCP access could introduce breaking changes in your schema or migrations. Check your Prisma changelog before upgrading just for MCP.

## Setup Notes

If you have Prisma CLI v6.6.0+, there's nothing to install. Run `npx prisma mcp` in your project directory and Claude picks up your schema, migrations, and database connection from your existing prisma configuration.

For the remote server, you need a Prisma Postgres account (free tier available). Configure the remote URL in your MCP client and authenticate through the browser.

The AI safety guardrails for destructive commands are documented and worth reading before giving Claude migration access in a production-adjacent environment.

## Config

Local:

```json
{
  "mcpServers": {
    "prisma": {
      "command": "npx",
      "args": ["prisma", "mcp"]
    }
  }
}
```

Remote (Prisma Postgres):

```json
{
  "mcpServers": {
    "prisma-postgres": {
      "url": "https://mcp.prisma.io/mcp"
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- Cursor
