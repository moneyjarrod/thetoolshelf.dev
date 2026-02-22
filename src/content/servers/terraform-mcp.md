---
# === IDENTITY ===
slug: "terraform-mcp"
name: "Terraform MCP Server"
description: "Official HashiCorp server for Terraform Registry discovery, provider documentation, and HCP Terraform workspace management with destructive-ops gating."
verdict: "recommended"
verdict_note: "HashiCorp official with dual transport, security-conscious defaults (destructive ops disabled), and GitHub Copilot partnership. Beta status but production-quality architecture."

# === TECHNICAL ===
language: "Go"
transport:
  - "stdio"
  - "streamable-http"
license: "MPL-2.0"
github_url: "https://github.com/hashicorp/terraform-mcp-server"
npm_package: null
pypi_package: null
stars: 800
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
  command: "docker run -i --rm hashicorp/terraform-mcp-server"
  config_json:
    command: "docker"
    args:
      - "run"
      - "-i"
      - "--rm"
      - "hashicorp/terraform-mcp-server"
  env_vars:
    - name: "TFE_TOKEN"
      description: "HCP Terraform or Terraform Enterprise authentication token (optional — only for workspace management)"
      required: false
    - name: "TFE_HOSTNAME"
      description: "Terraform Enterprise hostname (optional — defaults to HCP Terraform)"
      required: false
    - name: "ENABLE_TF_OPERATIONS"
      description: "Enable destructive Terraform operations (default: false)"
      required: false
  prerequisites:
    - "Docker (recommended) or Go 1.21+"

# === TAXONOMY ===
category:
  - "infrastructure"
  - "devops"
  - "IaC"
related_slugs:
  - "aws-mcp"
  - "cloudflare-mcp"
  - "docker-mcp"
affiliate_links:
  - label: "HashiCorp Cloud Platform"
    url: "https://cloud.hashicorp.com/products/terraform"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Two tool categories: Registry tools for discovering providers, modules, and policies from the Terraform Registry, and HCP Terraform/Enterprise tools for managing workspaces, variables, runs, and organizations. Claude can search the Registry for the right provider, read its documentation, and then manage your infrastructure workspaces — all through one server.

HashiCorp official. Supports both STDIO (local) and StreamableHTTP (remote/HA) transports. Stateful mode for session-aware workflows and stateless mode for load-balanced deployments.

## What It Does Well

- **Destructive operations disabled by default is the right security posture for infrastructure tools.** Terraform can destroy resources. The server requires explicitly setting ENABLE_TF_OPERATIONS=true to unlock destructive commands. This is exactly how infrastructure MCP servers should handle the "Claude accidentally deletes my production cluster" scenario.
- **Registry tools make Terraform discovery conversational.** Instead of browsing the Terraform Registry website, ask Claude to find providers for a specific use case, read their documentation, and recommend the right one. This is genuinely useful for evaluating Terraform modules.
- **One-click install badges for VS Code, VS Code Insiders, and Cursor.** The GitHub README has install badges that configure the MCP server in a single click. Combined with Docker for the runtime, setup is fast.

## What It Doesn't Do Well

- **Beta status means the API surface may change.** HashiCorp labels this as beta. Tool names, parameters, or behaviors could change between versions. Pin your Docker image tag if stability matters.
- **Docker or Go required — no npx path.** Most MCP servers offer npx for JavaScript developers. Terraform MCP requires Docker (recommended) or building from Go source. Not a problem for infrastructure engineers who already have Docker, but it's a higher bar than the npx ecosystem.

## Setup Notes

Docker is the recommended path: `docker run -i --rm hashicorp/terraform-mcp-server`. For HCP Terraform workspace management, add TFE_TOKEN for authentication. For Terraform Enterprise, set TFE_HOSTNAME to your instance URL.

Go install is also available: `go install github.com/hashicorp/terraform-mcp-server/cmd/terraform-mcp-server@latest`.

Prebuilt binaries available at releases.hashicorp.com for air-gapped environments.

Security features include CORS strict mode, rate limiting, and TLS support for the HTTP transport mode.

## Config

Docker (Registry tools only):

```json
{
  "mcpServers": {
    "terraform": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "hashicorp/terraform-mcp-server"]
    }
  }
}
```

Docker (with HCP Terraform):

```json
{
  "mcpServers": {
    "terraform": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "TFE_TOKEN=your_token",
        "hashicorp/terraform-mcp-server"
      ]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- VS Code
