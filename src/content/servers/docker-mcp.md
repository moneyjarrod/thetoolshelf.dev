---
# === IDENTITY ===
slug: "docker-mcp"
name: "Docker MCP (mcp_docker)"
description: "Manage Docker containers, images, networks, and volumes through natural language — the best community server for container operations."
verdict: "conditional"
verdict_note: "Best available Docker container management MCP, but community-maintained with Docker socket security implications. Use with awareness."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
  - "http"
license: "MIT"
github_url: "https://github.com/williajm/mcp_docker"
npm_package: null
pypi_package: "mcp-docker"
stars: 200
last_updated: 2026-02-01

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
  command: "uvx mcp-docker@latest"
  config_json:
    command: "uvx"
    args:
      - "mcp-docker@latest"
  env_vars: []
  prerequisites:
    - "Python 3.10+ with uv/uvx"
    - "Docker Desktop running with socket access"

# === TAXONOMY ===
category:
  - "devops"
  - "docker"
related_slugs:
  - "github-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude control over Docker containers, images, networks, and volumes. You can list running containers, inspect their state, pull images, start and stop services, view logs, exec into containers, manage networks, and prune unused resources — all through conversation. It's the most complete community-built Docker MCP server available, with 33 tools, 5 AI prompts, and 2 resource templates.

Important distinction: this is not Docker's "MCP Toolkit," which is about running other MCP servers inside containers. This server manages Docker itself — your containers, your images, your infrastructure.

## What It Does Well

- **The three-tier safety system is genuinely thoughtful.** Every tool is classified as SAFE (read-only: list, inspect, logs), MODERATE (reversible: start, stop, pull), or DESTRUCTIVE (irreversible: remove, prune, push). Each tier can be enabled or disabled independently. This is better safety design than most official MCP servers ship with. You can run in read-only mode by enabling only SAFE tools.
- **33 tools cover the full Docker surface area.** Container lifecycle, image management, network operations, volume management, and system commands. You're not going to hit a wall where you need to drop to the terminal because a tool is missing. The coverage is comprehensive.
- **Rate limiting and audit logging are production-grade features.** For teams using this in shared environments, the built-in rate limiting prevents runaway operations and the audit logging creates a paper trail. These aren't afterthoughts — there's a dedicated SECURITY.md with a threat model.

## What It Doesn't Do Well

- **Docker socket access means root-equivalent on Linux.** The server connects to Docker's Unix socket, which on most Linux systems gives effective root access to the host. This isn't a bug in the server — it's how Docker works — but it means you need to understand the security implications before connecting an LLM to your Docker daemon. On Docker Desktop (Mac/Windows) this is sandboxed better.
- **Community-maintained with no official backing.** No major company stands behind this. If the maintainer moves on, there's no guarantee of continued updates or security patches. For a tool with root-equivalent access, that matters.
- **Container logs can be a prompt injection vector.** If a container outputs crafted text in its logs, and Claude reads those logs via the `docker_container_logs` tool, the text could influence Claude's behavior. The server's SECURITY.md acknowledges this risk but mitigation is on you.

## Setup Notes

Install is clean if you already have Python and uv: `uvx mcp-docker@latest` and you're running. Docker Desktop needs to be installed and running — the server connects to the Docker socket automatically.

On Linux, the default socket is at `/var/run/docker.sock`. If you're running Docker rootless or with a non-standard socket path, you'll need to configure the Docker host. On Mac and Windows with Docker Desktop, it works out of the box.

The server also supports HTTP transport for remote access, but for most users the stdio config is simpler and more secure.

## Config

Standard setup:

```json
{
  "mcpServers": {
    "docker": {
      "command": "uvx",
      "args": ["mcp-docker@latest"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
