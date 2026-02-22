---
# === IDENTITY ===
slug: "turso-mcp"
name: "Turso MCP Server"
description: "SQLite-compatible edge database with MCP built directly into the Turso CLI — plus community options for cloud-hosted LibSQL."
verdict: "conditional"
verdict_note: "Elegant CLI-integrated MCP, but Turso itself is beta software. Great if you're already in the LibSQL/SQLite ecosystem, premature if you're not."

# === TECHNICAL ===
language: "Rust"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/tursodatabase/turso"
npm_package: null
pypi_package: null
stars: 3000
last_updated: 2026-01-20

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
  command: "tursodb your_database.db --mcp"
  config_json:
    command: "tursodb"
    args:
      - "your_database.db"
      - "--mcp"
  env_vars: []
  prerequisites:
    - "Turso CLI (tursodb binary) installed"

# === TAXONOMY ===
category:
  - "database"
  - "sqlite"
related_slugs:
  - "sqlite-mcp"
  - "neon-mcp"
  - "planetscale-mcp"
affiliate_links:
  - label: "Turso Pricing"
    url: "https://turso.tech/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Turso is an in-process SQL database compatible with SQLite, written in Rust. The MCP integration is built directly into the Turso CLI — run `tursodb your_database.db --mcp` and Claude gets 9 tools for database operations including read queries, writes, table management, and schema inspection.

Community alternatives exist for connecting to Turso Cloud (hosted LibSQL). nbbaier/mcp-turso uses npx with TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for remote databases.

## What It Does Well

- **MCP built into the CLI is the cleanest possible integration.** No separate server to install, no npm package to manage, no version mismatches. One binary does everything. This is the pattern more database vendors should follow — PlanetScale and Prisma are heading the same direction.
- **Full CRUD out of the box.** Unlike many database MCP servers that default to read-only, Turso's MCP includes insert_data, update_data, delete_data, and create_table alongside read operations. Nine tools covering the complete database lifecycle.
- **SQLite compatibility means zero-friction local development.** If you already work with SQLite files, Turso's MCP reads them directly. No server to spin up, no credentials to manage, no network configuration. Point it at a .db file and go.

## What It Doesn't Do Well

- **Turso itself is beta software.** The database engine is still maturing. Using a beta database engine in production workflows introduces risk that has nothing to do with MCP quality. The MCP integration is solid — it's the underlying product that carries the beta caveat.
- **Requires installing a separate binary.** Unlike npx-based MCP servers that just work with Node.js, Turso requires downloading and installing the tursodb binary. It's not hard, but it's an extra step that other database MCP servers don't require.

## Setup Notes

Install the Turso CLI binary, then point it at any SQLite-compatible database file with the `--mcp` flag. That's it. The CLI handles MCP server registration and tool exposure.

For Turso Cloud databases, use the community npx option (nbbaier/mcp-turso) with your database URL and auth token. That path is more familiar if you're used to typical MCP server setup patterns.

## Config

Local database:

```json
{
  "mcpServers": {
    "turso": {
      "command": "tursodb",
      "args": ["your_database.db", "--mcp"]
    }
  }
}
```

Cloud database (community):

```json
{
  "mcpServers": {
    "turso-cloud": {
      "command": "npx",
      "args": ["-y", "mcp-turso"],
      "env": {
        "TURSO_DATABASE_URL": "libsql://your-db.turso.io",
        "TURSO_AUTH_TOKEN": "your_token"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
