---
# === IDENTITY ===
slug: "grafana-mcp"
name: "Grafana MCP Server"
description: "Official Grafana server for searching dashboards, running PromQL and LogQL queries, managing OnCall, and working with Tempo traces — all from your AI client."
verdict: "conditional"
verdict_note: "Excellent for teams already running Grafana with established dashboards and alerting. Requires Go install or Docker plus a running Grafana instance — not a quick evaluation."

# === TECHNICAL ===
language: "Go"
transport:
  - "stdio"
license: "Apache-2.0"
github_url: "https://github.com/grafana/mcp-grafana"
npm_package: null
pypi_package: null
stars: 1500
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
  command: "go install github.com/grafana/mcp-grafana/cmd/mcp-grafana@latest"
  config_json:
    command: "mcp-grafana"
    env:
      GRAFANA_URL: "http://localhost:3000"
      GRAFANA_API_KEY: "your-service-account-token"
  env_vars:
    - name: "GRAFANA_URL"
      description: "URL of your Grafana instance"
      required: true
    - name: "GRAFANA_API_KEY"
      description: "Service account token from Grafana (Administration > Service Accounts)"
      required: true
  prerequisites:
    - "Go 1.21+ (for go install) OR Docker"
    - "Running Grafana 9.0+ instance"
    - "Grafana service account token"

# === TAXONOMY ===
category:
  - "devops"
  - "monitoring"
related_slugs:
  - "sentry-mcp"
affiliate_links:
  - label: "Grafana Cloud"
    url: "https://grafana.com/pricing/"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude direct access to your Grafana observability stack. Search and inspect dashboards, run PromQL queries against Prometheus, run LogQL queries against Loki, manage OnCall schedules, query Tempo traces, and create annotations. The server covers the full Grafana surface — not just dashboards, but the query layer underneath them.

This is a power tool for teams that already have Grafana as their observability platform. You're not setting up monitoring from scratch — you're giving Claude a window into the monitoring you already have.

## What It Does Well

- **Direct PromQL and LogQL from Claude is a genuine workflow improvement.** Instead of switching to Grafana, writing a query, reading the results, then explaining them to Claude for analysis — just ask Claude to run the query directly. For incident response and debugging, this cuts the feedback loop significantly.
- **Category-based tool disabling keeps things focused.** The `--disable-<category>` flags let you turn off entire feature areas (oncall, navigation, tempo). If your team doesn't use OnCall, those tools don't clutter Claude's tool list. The `--disable-write` flag gives you a read-only mode for safety-conscious setups.
- **TLS client certificate auth for enterprise environments.** Many observability tools assume simple API key auth. Grafana's MCP server supports mutual TLS with client certificates, which enterprise security teams require. This is the kind of detail that determines whether a tool gets approved for production use.

## What It Doesn't Do Well

- **Go binary means a different install path from most MCP servers.** No `npx` one-liner. You need Go installed to build from source, or Docker to run the container image. For teams that don't have Go in their toolchain, this is an extra dependency that adds friction. The Docker path is easier but still heavier than npm-based servers.
- **Requires an existing Grafana instance with data.** This isn't a tool you can evaluate in five minutes. You need a running Grafana instance (self-hosted or Cloud), configured data sources, and a service account token. If you're evaluating MCP servers and don't already use Grafana, this isn't the place to start.
- **Dashboard-level queries can overwhelm context windows.** A large Grafana dashboard with dozens of panels generates substantial data when queried. The dashboard summary tool helps, but complex dashboards with many time series can produce responses that eat into Claude's context budget fast.

## Setup Notes

Install via `go install` or pull the Docker image. Create a service account in Grafana (Administration > Service Accounts), generate a token, and set it as GRAFANA_API_KEY. Point GRAFANA_URL at your instance.

For Docker: `docker run --rm -i -e GRAFANA_URL=http://host.docker.internal:3000 -e GRAFANA_API_KEY=your-token mcp/grafana`. Note the `host.docker.internal` for reaching a Grafana instance on the host machine.

Related servers exist for Loki-specific (grafana/loki-mcp) and Tempo-specific (grafana/tempo-mcp-server) use cases if you want narrower tool surfaces.

## Config

Go install:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "mcp-grafana",
      "env": {
        "GRAFANA_URL": "http://localhost:3000",
        "GRAFANA_API_KEY": "glsa_your_service_account_token"
      }
    }
  }
}
```

Docker:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "docker",
      "args": ["run", "--rm", "-i",
        "-e", "GRAFANA_URL=http://host.docker.internal:3000",
        "-e", "GRAFANA_API_KEY=glsa_your_token"],
      "env": {}
    }
  }
}
```

Read-only mode:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "mcp-grafana",
      "args": ["--disable-write"],
      "env": {
        "GRAFANA_URL": "http://localhost:3000",
        "GRAFANA_API_KEY": "glsa_your_token"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
