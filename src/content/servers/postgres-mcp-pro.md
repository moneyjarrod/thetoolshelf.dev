---
# === IDENTITY ===
slug: "postgres-mcp-pro"
name: "Postgres MCP Pro"
description: "Goes beyond SQL execution — provides index tuning with industrial-strength algorithms, database health checks, explain plans, and configurable read/write access control for PostgreSQL."
verdict: "recommended"
verdict_note: "The best Postgres MCP server by a wide margin. Index tuning alone justifies installation, and the restricted/unrestricted access modes show real thought about production safety."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
  - "sse"
license: "MIT"
github_url: "https://github.com/crystaldba/postgres-mcp"
npm_package: null
pypi_package: "postgres-mcp"
stars: 2000
last_updated: 2025-12-01

# === SETUP ===
setup_difficulty: 3

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
  command: "docker pull crystaldba/postgres-mcp"
  config_json:
    command: "docker"
    args:
      - "run"
      - "-i"
      - "--rm"
      - "-e"
      - "DATABASE_URI"
      - "crystaldba/postgres-mcp"
      - "--access-mode=unrestricted"
    env:
      DATABASE_URI: "postgresql://username:password@localhost:5432/dbname"
  env_vars:
    - name: "DATABASE_URI"
      description: "PostgreSQL connection string — postgresql://user:pass@host:port/dbname"
      required: true
    - name: "OPENAI_API_KEY"
      description: "Required only for experimental LLM-based index tuning. Not needed for standard features."
      required: false
  prerequisites:
    - "Docker Desktop (recommended) or Python 3.12+ with uv/pipx"
    - "A running PostgreSQL database with valid credentials"
    - "pg_stat_statements extension (for query analysis)"
    - "hypopg extension (for index simulation — optional but recommended)"

# === TAXONOMY ===
category:
  - "database"
related_slugs:
  - "sqlite-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to a PostgreSQL database with tools that go far beyond running queries. Nine tools ship with the server: schema exploration (`list_schemas`, `list_objects`, `get_object_details`), SQL execution (`execute_sql`), performance analysis (`explain_query`, `get_top_queries`), index tuning (`analyze_workload_indexes`, `analyze_query_indexes`), and health monitoring (`analyze_db_health`).

The headline feature is index tuning. Rather than having Claude guess at what indexes might help, Postgres MCP Pro implements an adaptation of Microsoft's Anytime Algorithm — a proven approach that explores thousands of possible index configurations using hypothetical indexes (via the `hypopg` extension) to find the optimal set. It shows the work at each step, including before/after query plans, so Claude can explain why each recommendation matters.

Two access modes control what Claude can do: **unrestricted** allows full read/write for development environments, and **restricted** enforces read-only transactions with execution time limits for production databases.

Built and maintained by Crystal DBA. 2K+ stars, active development, MIT licensed.

## What It Does Well

- **Index tuning is the killer feature.** This isn't Claude guessing "maybe add an index on created_at." The server parses your SQL, identifies filter/join/sort columns, generates candidate indexes (including multicolumn), then uses `hypopg` to simulate each combination against the actual Postgres cost model. It performs cost-benefit analysis along the Pareto front — balancing performance gains against storage costs. No other Postgres MCP server does anything close to this.
- **Restricted mode actually works.** The server doesn't just wrap queries in a read-only transaction and call it safe. It also parses SQL with `pglast` to reject statements containing `COMMIT` or `ROLLBACK` that could break out of the read-only transaction. The README is transparent about the remaining attack surface (unsafe stored procedure languages), which is refreshingly honest for a security feature.
- **Health checks are deterministic, not LLM-generated.** When you ask "is my database healthy?", most approaches have Claude generate SQL to check various metrics — different every time, potentially missing things. Postgres MCP Pro runs a fixed set of validated checks adapted from PgHero: buffer cache hit rates, connection health, index health (unused/duplicate/bloated), vacuum health, sequence limits, replication lag, and constraint validation. Same checks every time, reliable results.
- **Docker auto-remaps localhost.** A common gotcha with database MCP servers in Docker: your database is at `localhost:5432` on the host, but the container can't reach `localhost`. Postgres MCP Pro automatically remaps to `host.docker.internal` on Mac/Windows and `172.17.0.1` on Linux. Small detail, saves real debugging time.

## What It Doesn't Do Well

- **Requires PostgreSQL extensions for full value.** The index tuning features need `pg_stat_statements` and `hypopg` installed on your database. On managed services (RDS, Cloud SQL, Azure) these are usually available via `CREATE EXTENSION`. On self-managed Postgres, `pg_stat_statements` needs to be in `shared_preload_libraries` (requires a restart), and `hypopg` may need to be installed from your package manager. Without these extensions, you lose the best features and are left with a competent but unremarkable SQL execution server.
- **Setup difficulty is real.** Between Docker, database credentials, connection URIs, access mode flags, and optional extension installation, there are more moving parts than most MCP servers. The documentation is thorough, but this isn't a five-minute install if you're starting from scratch. Python users can hit environment-specific issues (the README acknowledges this and recommends Docker).
- **Connection is fixed at startup.** You configure one database URI when the server starts, and that's the database for the session. If you work across multiple databases, you need to reconfigure and restart. Other Postgres MCP servers like PG-MCP allow switching connections via tool calls at runtime. Both approaches have security tradeoffs — the README discusses this honestly.
- **Last release was v0.3.0 in May 2025.** Active repo with commits, but the release cadence is slow. The feature set is solid as-is, but if you need a fix, you may be waiting or building from source.

## Setup Notes

Docker is the recommended path. The connection URI format is standard PostgreSQL: `postgresql://username:password@host:port/dbname`. If your database is on the same machine, use `localhost` — the Docker image handles the host remapping automatically.

The `--access-mode` flag is required. For development databases where you want Claude to create tables, insert data, etc., use `--access-mode=unrestricted`. For production databases where you want Claude to analyze but not modify, use `--access-mode=restricted`. There's no default — you must choose explicitly, which is good design.

For the full index tuning experience, run these on your database before connecting:

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE EXTENSION IF NOT EXISTS hypopg;
```

The `pg_stat_statements` extension needs some query history to be useful. If you just installed it, let your application run for a while before asking for workload analysis.

## Config

Docker with unrestricted access (development):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "DATABASE_URI",
        "crystaldba/postgres-mcp",
        "--access-mode=unrestricted"
      ],
      "env": {
        "DATABASE_URI": "postgresql://username:password@localhost:5432/dbname"
      }
    }
  }
}
```

Docker with restricted access (production):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "DATABASE_URI",
        "crystaldba/postgres-mcp",
        "--access-mode=restricted"
      ],
      "env": {
        "DATABASE_URI": "postgresql://username:password@localhost:5432/dbname"
      }
    }
  }
}
```

Python with uvx (no Docker):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "uvx",
      "args": [
        "postgres-mcp",
        "--access-mode=unrestricted"
      ],
      "env": {
        "DATABASE_URI": "postgresql://username:password@localhost:5432/dbname"
      }
    }
  }
}
```

**Note:** Don't confuse this with the archived Anthropic reference server (`@modelcontextprotocol/server-postgres`). That one is read-only with no performance tools. This is `postgres-mcp` from `crystaldba` — a completely different and far more capable server.

## Tested With

- Claude Desktop on Windows 11
