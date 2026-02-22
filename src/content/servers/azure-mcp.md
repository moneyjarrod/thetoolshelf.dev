---
# === IDENTITY ===
slug: "azure-mcp"
name: "Azure MCP Server"
description: "Official Microsoft server — 40+ Azure services in one MCP integration with Entra ID auth and RBAC-based permissions. GA status."
verdict: "recommended"
verdict_note: "GA release (1.0), 40+ Azure services, Entra ID authentication respecting existing RBAC. The most comprehensive cloud MCP server available. VS Code extension for one-click install."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/microsoft/mcp"
npm_package: "@azure/mcp"
pypi_package: null
stars: 2000
last_updated: 2026-02-15

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
  command: "npx -y @azure/mcp@latest"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@azure/mcp@latest"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Azure account with Entra ID"
    - "Azure Identity SDK credentials configured"

# === TAXONOMY ===
category:
  - "cloud"
  - "infrastructure"
  - "devops"
  - "enterprise"
related_slugs:
  - "aws-mcp"
  - "cloudflare-mcp"
  - "terraform-mcp"
affiliate_links:
  - label: "Azure Pricing"
    url: "https://azure.microsoft.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

All Azure MCP tools in a single server. Covers 40+ Azure services: Storage, Compute, Networking, Databases (SQL, Cosmos DB, MySQL), Key Vault, Container Apps, AKS, ACR, Functions, App Service, Service Health, Sentinel, Resource Graph, and more. Authentication uses Entra ID via the Azure Identity SDK, and permissions follow your existing Azure RBAC roles.

GA release (1.0). Part of Microsoft's broader MCP monorepo that also houses Azure DevOps, Microsoft Foundry, Sentinel, and NuGet MCP servers.

## What It Does Well

- **40+ services in one server is unmatched cloud coverage.** No other cloud MCP server covers this many services in a single integration. AWS MCP focuses on specific services (S3, EC2, CloudWatch). Azure MCP wraps the entire platform. For teams deeply invested in Azure, this is the only MCP server you need for cloud operations.
- **RBAC-based permissions mean no separate credential management.** The server authenticates via Entra ID and respects your existing Azure role assignments. If your Azure account can't delete resources, Claude can't delete resources. No separate API keys, no elevated permissions, no shadow access.
- **VS Code extension for one-click install.** The `ms-azuretools.vscode-azure-mcp-server` extension installs and configures everything from within VS Code. For the VS Code + Azure development workflow, setup is one click.

## What It Doesn't Do Well

- **Autonomous MCP clients can invoke operations based on your RBAC.** If your Azure account has Contributor role, Claude can create, modify, and delete resources. The server doesn't add its own permission layer on top of RBAC — it trusts your Azure permissions entirely. Be deliberate about which Azure account you authenticate with.
- **Slow startup with @latest tag.** npm resolution of `@azure/mcp@latest` adds latency on every cold start. Pin to a specific version (`@azure/mcp@1.0.0`) for faster startup. The documentation mentions this as a known issue.

## Setup Notes

Install via npx or the VS Code extension. Authentication happens through the Azure Identity SDK — if you're already authenticated via `az login`, the server picks up your credentials automatically. No additional configuration needed for most setups.

Prompt templates set tenant and subscription context once per session, so Claude knows which Azure environment to operate in without specifying it on every request.

Related Microsoft MCP servers in the same monorepo: Azure DevOps (work items, PRs, builds), Microsoft Learn (free docs search), Microsoft Foundry, and Sentinel (security data exploration). These are separate servers, not bundled with Azure MCP.

Telemetry is collected by default — disable with environment variable if needed.

## Config

```json
{
  "mcpServers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp@latest"]
    }
  }
}
```

Pinned version (faster startup):

```json
{
  "mcpServers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp@1.0.0"]
    }
  }
}
```

Global install (fastest startup):

```json
{
  "mcpServers": {
    "azure": {
      "command": "azure-mcp"
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
- VS Code
