---
# === IDENTITY ===
slug: "sqlite-mcp"
name: "SQLite MCP"
description: "Lets Claude run SQL queries against a SQLite database file, create tables, and generate business insight memos from query results."
verdict: "conditional"
verdict_note: "Still works and installs fine, but the project is archived with no future updates. Good for learning MCP or quick database exploration — not for production workflows."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/sqlite"
npm_package: null
pypi_package: "mcp-server-sqlite"
stars: 76000
last_updated: 2025-04-25

# === SETUP ===
setup_difficulty: 2

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
  command: "uvx mcp-server-sqlite --db-path ~/test.db"
  config_json:
    command: "uvx"
    args:
      - "mcp-server-sqlite"
      - "--db-path"
      - "/path/to/your/database.db"
  env_vars: []
  prerequisites:
    - "Python 3.10+"
    - "uv (recommended) or pip"

# === TAXONOMY ===
category:
  - "databases"
  - "local-tools"
related_slugs:
  - "memory-mcp"
  - "filesystem-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to a SQLite database file on your machine. Claude can read the schema, run SELECT queries, write data with INSERT/UPDATE/DELETE, create new tables, and build up a running memo of business insights as it analyzes your data. You point it at a `.db` file and Claude becomes a conversational SQL interface.

The server provides six tools: `read_query` for SELECT statements, `write_query` for data modifications, `create_table` for DDL, `list_tables` and `describe_table` for schema introspection, and `append_insight` which adds findings to a persistent memo resource (`memo://insights`) that accumulates during your session. It also ships with a demo prompt (`mcp-demo`) that walks you through a guided business analysis scenario.

## Important: This Server Is Archived

As of early 2025, the SQLite MCP server was moved from the active reference servers repository to `servers-archived`. The PyPI package is marked archived with the note "no new releases are expected." The package still installs and runs — nothing is broken — but there will be no bug fixes, security patches, or feature updates. If you need a production database MCP server, look at community alternatives like `@berthojoris/mcp-sqlite-server` (TypeScript, 28 tools, granular permissions) or `sqlite-mcp-server-enhanced` (Python, 73 tools).

## What It Does Well

- **Schema introspection is genuinely useful.** `list_tables` and `describe_table` let Claude understand your database before querying it. In practice, Claude reads the schema first, understands the relationships, then writes accurate queries without you describing the table structure. This pattern — discover then query — works better than you'd expect.
- **The insight memo is a clever design.** As Claude runs queries and finds interesting patterns, it can append findings to the `memo://insights` resource. By the end of an analysis session, you have an accumulated document of everything Claude discovered. It's a small feature that demonstrates how MCP resources and tools can work together.
- **Good entry point for learning MCP.** The demo prompt walks you through prompts, tools, and resources in one guided session. If you're trying to understand what MCP actually does in practice, this is the most educational server to start with. The code itself is clean reference-quality Python.

## What It Doesn't Do Well

- **No query safety guardrails.** Claude can run any SQL you allow — including DROP TABLE, DELETE without WHERE clauses, or any destructive operation through `write_query`. There are no permission levels, no read-only mode toggle, no confirmation step for dangerous operations. Point this at a database you care about and you're trusting Claude not to make mistakes.
- **Single database file only.** You configure one `--db-path` at startup and that's what Claude sees. No switching databases mid-session, no connecting to multiple files. If you work with several databases, you'd need multiple server entries in your config.
- **Archived with no maintenance.** The last release was April 2025. Any bugs, security issues, or compatibility problems with newer MCP SDK versions will not be addressed. The server works today, but it's on borrowed time as the ecosystem evolves.

## Setup Notes

Like Fetch MCP, this is Python-based and uses `uvx`. The key difference is the required `--db-path` argument — you must point it at an existing SQLite file or a path where you want one created. This is where most setup friction comes from: getting the path right in JSON config, especially on Windows where backslashes need escaping.

If you just want to try it, point it at a new file and let the demo prompt create sample tables for you. For real use, point it at an existing `.db` file and start asking Claude questions about your data.

## Config

Standard config:

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": [
        "mcp-server-sqlite",
        "--db-path",
        "/Users/you/data/myproject.db"
      ]
    }
  }
}
```

Windows config (note the forward slashes or escaped backslashes):

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": [
        "mcp-server-sqlite",
        "--db-path",
        "C:/Users/you/data/myproject.db"
      ]
    }
  }
}
```

Docker config (isolates database access):

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-v", "mcp-test:/mcp",
        "mcp/sqlite",
        "--db-path", "/mcp/test.db"
      ]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
