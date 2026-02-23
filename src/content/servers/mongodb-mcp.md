---
# === IDENTITY ===
slug: "mongodb-mcp"
name: "MongoDB MCP Server"
description: "Official MongoDB server for querying, inserting, aggregating, and managing both local MongoDB instances and Atlas cloud clusters — including creating free clusters from Claude."
verdict: "recommended"
verdict_note: "Clean npx install, dual personality (local DB + Atlas cloud management), and strong safety features. The ability to spin up free Atlas clusters from Claude is a standout."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "http"
license: "Apache-2.0"
github_url: "https://github.com/mongodb-js/mongodb-mcp-server"
npm_package: "@mongodb-js/mongodb-mcp-server"
pypi_package: null
stars: 1500
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 2

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
  command: "npx -y @mongodb-js/mongodb-mcp-server"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@mongodb-js/mongodb-mcp-server"
    env:
      MONGODB_URI: "mongodb://localhost:27017"
  env_vars:
    - name: "MONGODB_URI"
      description: "MongoDB connection string (local or Atlas)"
      required: true
    - name: "MDB_MCP_ATLAS_CLIENT_ID"
      description: "Atlas API OAuth client ID (for cloud management features)"
      required: false
    - name: "MDB_MCP_ATLAS_CLIENT_SECRET"
      description: "Atlas API OAuth client secret"
      required: false
  prerequisites:
    - "Node.js 18+"
    - "MongoDB instance (local) or Atlas connection string"

# === TAXONOMY ===
category:
  - "database"
  - "nosql"
related_slugs:
  - "postgres-mcp-pro"
  - "redis-mcp"
affiliate_links:
  - label: "MongoDB Atlas"
    url: "https://www.mongodb.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Full MongoDB access from Claude — both local database operations and Atlas cloud management. On the database side: connect, find, insert, update, delete, aggregate, create/drop indexes, inspect collection schemas, and export data. On the Atlas side: create free clusters, create projects, manage database users, configure access lists, and get performance advisor recommendations.

The dual personality is the key differentiator. Most database MCP servers give you query access. This one also manages infrastructure.

## What It Does Well

- **Atlas cluster creation from Claude is genuinely powerful for onboarding.** "Create a free MongoDB cluster for my new project" actually works. The server handles project creation, cluster provisioning, user setup, and access list configuration. For developers spinning up new projects, this collapses a multi-step Atlas dashboard workflow into a conversation.
- **Safety features are well thought out.** Read-only mode (`--readOnly`), configurable disabled tools (`--disabledTools`), and confirmation-required tools (`--confirmationRequiredTools`) give you granular control over what Claude can do. Temporary database users with auto-delete and configurable export cleanup prevent credential and data sprawl.
- **VS Code extension includes MCP with auto-setup.** If you're using VS Code, the MongoDB extension bundles the MCP server with automatic configuration. No separate install needed. This is the smoothest zero-config MCP setup for any database server we've reviewed.

## What It Doesn't Do Well

- **Local MongoDB is still a prerequisite for local development.** The server connects to MongoDB — it doesn't run MongoDB. If you don't have a local instance or an Atlas cluster, you need to set one up first. The Atlas free tier is the easy path for evaluation, but local MongoDB requires installing and running the daemon.
- **Aggregation pipeline complexity can exceed what's practical in conversation.** MongoDB's aggregation framework is powerful but verbose. Complex multi-stage pipelines with $lookup, $unwind, and $group stages produce large JSON structures that consume significant context. Simple queries work great, but heavy analytics workflows are better done in a dedicated tool.
- **Atlas management tools require separate OAuth credentials.** Database operations use MONGODB_URI. Atlas management uses MDB_MCP_ATLAS_CLIENT_ID and MDB_MCP_ATLAS_CLIENT_SECRET. Two different auth mechanisms for two different feature sets. Not confusing once you understand it, but the initial setup isn't obvious.

## Setup Notes

Standard npx install. For local MongoDB, set MONGODB_URI to your connection string. For Atlas, use the Atlas connection string (find it in the Atlas dashboard under Connect).

Atlas management features require API OAuth credentials — create these in the Atlas dashboard under Organization Access Manager > API Keys. These are separate from your database connection.

Logs go to `~/.mongodb/mongodb-mcp/.app-logs` on Mac or `%LOCALAPPDATA%\mongodb\mongodb-mcp\.app-logs` on Windows. Useful for debugging connection issues.

## Config

Local MongoDB:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mongodb-mcp-server"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017"
      }
    }
  }
}
```

Atlas (with cloud management):

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mongodb-mcp-server"],
      "env": {
        "MONGODB_URI": "your-atlas-connection-string",
        "MDB_MCP_ATLAS_CLIENT_ID": "your-atlas-client-id",
        "MDB_MCP_ATLAS_CLIENT_SECRET": "your-atlas-client-secret"
      }
    }
  }
}
```

Read-only mode:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mongodb-mcp-server", "--readOnly"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- VS Code (via MongoDB extension auto-setup)
