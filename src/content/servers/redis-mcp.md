---
# === IDENTITY ===
slug: "redis-mcp"
name: "Redis MCP Server"
description: "Official Redis server for key-value operations, hash/list/set/sorted-set manipulation, pub/sub messaging, streams, and vector embedding storage."
verdict: "conditional"
verdict_note: "Comprehensive Redis coverage with cluster and enterprise auth support, but requires Python/uv or Docker plus a running Redis instance. Great if Redis is already in your stack."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/redis/mcp-redis"
npm_package: null
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
  command: "docker run --rm -i -e REDIS_HOST=localhost mcp/redis"
  config_json:
    command: "docker"
    args:
      - "run"
      - "--rm"
      - "-i"
      - "-e"
      - "REDIS_HOST=localhost"
      - "-e"
      - "REDIS_PORT=6379"
      - "mcp/redis"
  env_vars:
    - name: "REDIS_HOST"
      description: "Redis server hostname"
      required: true
    - name: "REDIS_PORT"
      description: "Redis server port (default: 6379)"
      required: false
    - name: "REDIS_PWD"
      description: "Redis password (if authentication is enabled)"
      required: false
    - name: "REDIS_SSL"
      description: "Enable SSL connection (true/false)"
      required: false
    - name: "REDIS_CLUSTER_MODE"
      description: "Enable cluster mode support"
      required: false
  prerequisites:
    - "Docker OR Python 3.10+ with uv"
    - "Running Redis instance"

# === TAXONOMY ===
category:
  - "database"
  - "cache"
related_slugs:
  - "postgres-mcp-pro"
  - "mongodb-mcp"
affiliate_links:
  - label: "Redis Cloud"
    url: "https://redis.io/pricing/"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude full access to Redis data operations. Covers the major Redis data types: strings (get/set with expiration), hashes (including vector embedding storage), lists (append/pop), sets, sorted sets, pub/sub messaging, and streams. Also includes key scanning for discovery and management. The server works with standalone Redis instances, Redis Cluster deployments, and Azure Managed Redis with EntraID authentication.

This is the official Redis server — built and maintained by the Redis team, not a community wrapper.

## What It Does Well

- **Full data type coverage means Claude can work with Redis idiomatically.** Not just get/set on strings — Claude can manipulate hashes, push to lists, manage sorted sets with scores, publish to channels, and read from streams. If you're using Redis for more than simple caching, having the full type system available matters.
- **Vector embedding support in hash operations opens search workflows.** Hash operations include vector storage, which means Claude can store and retrieve embeddings directly in Redis. For teams using Redis as a vector store alongside its caching role, this bridges the gap between data operations and AI workflows.
- **Enterprise auth and cluster mode are production-ready features.** EntraID authentication for Azure Managed Redis, SSL support, and cluster mode aren't afterthoughts — they're first-class configuration options. Most MCP database servers assume a local dev instance. This one is built for production environments.

## What It Doesn't Do Well

- **Python/uv install path is unfamiliar for many MCP users.** Most MCP servers are TypeScript with npx. This one requires Python with uv, or Docker. For developers who don't have Python in their daily workflow, this adds a dependency they might not want. The Docker option simplifies things but adds its own overhead.
- **Running Redis is a hard prerequisite.** Unlike Neon or Supabase which offer cloud instances with no local setup, Redis MCP needs a Redis server to connect to. If you don't already have Redis running, you need to set that up first. This makes evaluation significantly harder than API-key-only servers.
- **Community TypeScript alternative has broader tool coverage.** The GongRzhe community server offers 62 tools compared to the official server's more focused set. If you want exhaustive Redis command coverage, the community version covers more ground. The tradeoff is maintenance and reliability — the official server is backed by Redis, the community one by an individual.

## Setup Notes

Docker is the easiest path: `docker run --rm -i -e REDIS_HOST=localhost mcp/redis`. Note that if Redis is running on the host machine, you'll need `host.docker.internal` instead of `localhost` on Mac/Windows.

For uv: clone the repo, `uv run src/main.py` with environment variables set. This gives you more control but requires Python environment management.

A companion server exists: redis/mcp-redis-cloud for Redis Cloud API management (creating databases, managing clusters). That's separate from data operations — this server handles the data, the Cloud server handles infrastructure.

## Config

Docker (recommended):

```json
{
  "mcpServers": {
    "redis": {
      "command": "docker",
      "args": ["run", "--rm", "-i",
        "-e", "REDIS_HOST=host.docker.internal",
        "-e", "REDIS_PORT=6379",
        "mcp/redis"]
    }
  }
}
```

uv (local):

```json
{
  "mcpServers": {
    "redis": {
      "command": "uv",
      "args": ["run", "src/main.py"],
      "env": {
        "REDIS_HOST": "localhost",
        "REDIS_PORT": "6379"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
