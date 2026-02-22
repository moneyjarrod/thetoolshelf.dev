---
# === IDENTITY ===
slug: "jira-mcp"
name: "Jira MCP Server (Atlassian)"
description: "Official Atlassian remote server covering Jira, Confluence, and Compass — OAuth 2.1 authorization with admin-controllable access, plus a strong community alternative for Server/Data Center."
verdict: "conditional"
verdict_note: "Official remote server is clean for Atlassian Cloud users, but Cloud-only. Server/Data Center teams need the community alternative. The ecosystem is fragmented — know which version you need before installing."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "sse"
  - "streamable-http"
license: "Proprietary"
github_url: "https://github.com/atlassian/atlassian-mcp-server"
npm_package: null
pypi_package: null
stars: 2000
last_updated: 2026-02-01

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
  command: "npx -y mcp-remote https://mcp.atlassian.com/v1/mcp"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "mcp-remote"
      - "https://mcp.atlassian.com/v1/mcp"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Atlassian Cloud account (for official server)"

# === TAXONOMY ===
category:
  - "productivity"
  - "project-management"
related_slugs:
  - "linear-mcp"
  - "github-mcp"
affiliate_links:
  - label: "Atlassian Plans"
    url: "https://www.atlassian.com/software/jira/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Atlassian's official MCP server — branded under Rovo — covers Jira, Confluence, and Compass from a single remote endpoint. Search and manage Jira issues, access Confluence pages, and query Compass service catalogs. Authentication is OAuth 2.1 with browser-based authorization, and it respects your existing Atlassian permissions — Claude can only access what you can access.

For Server/Data Center environments, the best community alternative is sooperset/mcp-atlassian, which supports both Cloud and self-hosted deployments with API token authentication.

## What It Does Well

- **Three products from one server is efficient.** Jira, Confluence, and Compass through a single MCP connection. Most teams using Jira also use Confluence for documentation, and having both accessible in the same Claude session avoids switching between separate MCP servers. The server exposes 25+ tools across all three products.
- **Admin controls for enterprise governance.** Site and organization admins can manage and revoke MCP app access from the Atlassian admin panel. Domain and IP controls are available for restricting where the MCP server can be used from. For enterprise teams that need to control AI tool access, this is the governance layer they require.
- **OAuth respects existing permissions — no permission escalation.** Claude gets exactly the access your Atlassian account has. If you can't view a project in Jira, Claude can't either. No separate permission model to manage, no risk of accidentally granting broader access than intended.

## What It Doesn't Do Well

- **Cloud only for the official server.** If your organization runs Jira Server or Data Center (self-hosted), the official Atlassian MCP server doesn't work. You need the community alternative (sooperset/mcp-atlassian) which supports both Cloud and Server/DC. This splits the ecosystem and means the "official" answer doesn't work for a significant portion of Atlassian's user base.
- **The community ecosystem is fragmented and confusing.** At least six community implementations exist, each with different strengths: aashari's version uses TOON format for token savings, b1ff covers Bitbucket alongside Jira and Confluence, nguyenvanduocit adds opinionated dev workflow tools, phuc-nt includes sprint and Agile support. Choosing the right one requires research. The official server doesn't cover all these use cases, so community versions remain relevant.
- **Confluence and Compass coverage is less mature than Jira.** The server started as Jira-focused and expanded. Jira tools are the most complete, while Confluence and Compass operations are more limited. If Confluence is your primary use case, evaluate the tool coverage carefully before committing.

## Setup Notes

For Cloud users: `npx -y mcp-remote https://mcp.atlassian.com/v1/mcp` opens browser for OAuth. Authorize, and all three products are available. The SSE endpoint (`/v1/sse`) is available for clients that prefer that transport.

For Server/Data Center: install sooperset/mcp-atlassian via uvx. You'll need your Jira URL, username, and API token (for Cloud) or Personal Access Token (for Server/DC). This version also supports Confluence with separate URL and credentials.

The community version (sooperset) has an llms.txt available for AI consumption and active development including OAuth multi-cloud support, Markdown-to-Jira conversion, and comment editing.

## Config

Official (Atlassian Cloud):

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/mcp"]
    }
  }
}
```

Community — sooperset (Cloud):

```json
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://your-company.atlassian.net",
        "JIRA_USERNAME": "your.email@company.com",
        "JIRA_API_TOKEN": "your_api_token",
        "CONFLUENCE_URL": "https://your-company.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "your.email@company.com",
        "CONFLUENCE_API_TOKEN": "your_api_token"
      }
    }
  }
}
```

Community — sooperset (Server/Data Center):

```json
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://jira.your-company.com",
        "JIRA_PERSONAL_TOKEN": "your_personal_access_token"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
