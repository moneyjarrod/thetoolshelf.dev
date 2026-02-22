---
# === IDENTITY ===
slug: "mysql-mcp"
name: "MySQL MCP Server"
description: "Community-built MySQL integration with SSH tunnel support and safety-first read-only defaults — the best option in a fragmented landscape."
verdict: "conditional"
verdict_note: "No official MySQL MCP server exists. @benborla29 is the safest community pick, but fragmentation means no single maintained standard."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/benborla/mcp-server-mysql"
npm_package: "@benborla29/mcp-server-mysql"
pypi_package: null
stars: 700
last_updated: 2026-01-15

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
  command: "npx -y @benborla29/mcp-server-mysql"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@benborla29/mcp-server-mysql"
    env:
      MYSQL_HOST: "127.0.0.1"
      MYSQL_PORT: "3306"
      MYSQL_USER: "root"
      MYSQL_PASS: "your_password"
      MYSQL_DB: "your_database"
  env_vars:
    - name: "MYSQL_HOST"
      description: "MySQL server hostname"
      required: true
    - name: "MYSQL_PORT"
      description: "MySQL server port (default 3306)"
      required: true
    - name: "MYSQL_USER"
      description: "Database username"
      required: true
    - name: "MYSQL_PASS"
      description: "Database password"
      required: true
    - name: "MYSQL_DB"
      description: "Default database name"
      required: true
    - name: "ALLOW_INSERT_OPERATION"
      description: "Enable INSERT queries (default false)"
      required: false
    - name: "ALLOW_UPDATE_OPERATION"
      description: "Enable UPDATE queries (default false)"
      required: false
    - name: "ALLOW_DELETE_OPERATION"
      description: "Enable DELETE queries (default false)"
      required: false
  prerequisites:
    - "Node.js 18+"
    - "Running MySQL server"

# === TAXONOMY ===
category:
  - "database"
  - "mysql"
related_slugs:
  - "postgres-mcp-pro"
  - "supabase-mcp"
  - "sqlite-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to a MySQL database for querying, schema inspection, and optional write operations. The server is read-only by default — INSERT, UPDATE, and DELETE require explicit opt-in via environment variables. Supports SSH tunneling for remote databases.

## What It Does Well

- **Read-only by default is the correct security posture for database MCP servers.** Write operations require setting ALLOW_INSERT_OPERATION, ALLOW_UPDATE_OPERATION, or ALLOW_DELETE_OPERATION to true. You won't accidentally give Claude write access to production data by forgetting a flag.
- **SSH tunnel support makes remote databases accessible without exposing ports.** Configure SSH_HOST, SSH_PORT, SSH_USER, and SSH_PRIVATE_KEY_PATH to tunnel through a bastion host. Most database MCP servers assume localhost — this one handles the real-world scenario of databases behind firewalls.
- **Claude Code optimized with one-line install.** The npx setup just works without configuration gymnastics. Point it at your database, start querying.

## What It Doesn't Do Well

- **No official MySQL MCP server exists, and this is a community project.** Oracle hasn't shipped an official MCP integration. The community has fragmented across at least four competing implementations (@benborla29, designcomputer, @neverinfamous, awslabs). If one maintainer walks away, you're switching servers.
- **The competing implementations create confusion about which to install.** @neverinfamous/mysql-mcp has 192 tools and OAuth 2.1. designcomputer/mysql_mcp_server is Python-based. awslabs focuses on Aurora MySQL. None are obviously "the" MySQL MCP server. We recommend @benborla29 as the most balanced option, but the fragmentation itself is the con.

## Setup Notes

You need a running MySQL server. The server connects via standard MySQL credentials — no API keys, no OAuth, just host/port/user/pass. If your MySQL is remote, the SSH tunnel feature saves you from exposing database ports. Setup took under 5 minutes with a local MySQL instance.

The read-only default means your first test will only let you SELECT. That's intentional and correct. Enable write operations only after you've verified the server works with your schema.

## Config

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": ["-y", "@benborla29/mcp-server-mysql"],
      "env": {
        "MYSQL_HOST": "127.0.0.1",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "root",
        "MYSQL_PASS": "your_password",
        "MYSQL_DB": "your_database"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
