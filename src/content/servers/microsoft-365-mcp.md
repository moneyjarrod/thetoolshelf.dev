---
# === IDENTITY ===
slug: "microsoft-365-mcp"
name: "Microsoft 365 MCP Server"
description: "Fragmented landscape — Microsoft's official Agent 365 requires Copilot license, while community servers offer Graph API integration for Mail, Calendar, Teams, and Files."
verdict: "conditional"
verdict_note: "No single standalone M365 MCP from Microsoft for general use. Official Agent 365 is gated behind Copilot license. Softeria's community server is the most accessible option but requires Azure AD setup."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
  - "http"
license: "MIT"
github_url: "https://github.com/nicholasball/ms-365-mcp-server"
npm_package: "@softeria/ms-365-mcp-server"
pypi_package: null
stars: 470
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
  command: "npx -y @softeria/ms-365-mcp-server --org-mode"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@softeria/ms-365-mcp-server"
      - "--org-mode"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Azure AD app registration"
    - "Microsoft 365 account"

# === TAXONOMY ===
category:
  - "productivity"
  - "email"
  - "enterprise"
related_slugs:
  - "google-workspace-mcp"
  - "slack-mcp"
  - "notion-mcp"
affiliate_links:
  - label: "Microsoft 365 Plans"
    url: "https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to Microsoft 365 services — Mail, Calendar, Files, Teams, and SharePoint — via the Microsoft Graph API. The Softeria community server is the most accessible option, offering OAuth 2.1 with PKCE, read-only mode, and organization-mode for enterprise environments.

Microsoft's own Agent 365 MCP servers cover Copilot Search, SharePoint, Outlook, Teams, Word, and more — but are gated behind the M365 Copilot license through the Frontier program.

## What It Does Well

- **Graph API integration gives broad M365 access through one server.** Mail, Calendar, Files, Teams, SharePoint — the core Microsoft 365 services a developer interacts with daily. One MCP server replaces manually switching between Outlook, Teams, and OneDrive.
- **Read-only mode and OAuth 2.1 + PKCE prioritize security.** Enterprise environments can deploy in read-only mode to prevent Claude from sending emails or modifying calendar events. PKCE flow means no client secrets stored in config files.
- **Organization mode supports enterprise multi-tenant deployments.** The `--org-mode` flag configures the server for organizational consent, enabling IT-managed deployment across teams instead of per-user OAuth approval.

## What It Doesn't Do Well

- **Azure AD app registration is required and non-trivial.** You need to create an app registration in Azure AD, configure API permissions, set up redirect URIs, and potentially get admin consent for organizational access. This is 20+ minutes of Azure portal navigation that requires understanding of Microsoft's identity platform.
- **The official Microsoft MCP ecosystem is fragmented and enterprise-gated.** Microsoft has MCP servers scattered across multiple repos (microsoft/mcp monorepo, Agent 365, CLI for M365, merill/lokka) with different auth requirements and capabilities. Agent 365 — the most capable option — requires a full M365 Copilot license, putting it out of reach for individual developers.

## Setup Notes

Start with the Softeria community server. Create an Azure AD app registration with the Graph API permissions you need (Mail.Read, Calendar.Read, Files.Read, etc.). Configure redirect URIs for the OAuth flow. Run with `--org-mode` for organizational consent or without for personal use.

Alternative community options: pnp/cli-microsoft365-mcp-server (wraps the CLI for M365 with natural language), merill/lokka (Graph API + Azure RM with multiple auth methods), DynamicEndpoints/m365-core-mcp (29 tools, security/compliance focus).

China cloud (21Vianet) is supported by the Softeria server.

## Config

```json
{
  "mcpServers": {
    "microsoft-365": {
      "command": "npx",
      "args": ["-y", "@softeria/ms-365-mcp-server", "--org-mode"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
