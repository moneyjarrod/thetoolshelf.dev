---
# === IDENTITY ===
slug: "google-workspace-mcp"
name: "Google Workspace MCP Server"
description: "Community-built integration covering Gmail, Drive, Calendar, Docs, Sheets, and 6 more Google services — 100+ tools with OAuth 2.1."
verdict: "conditional"
verdict_note: "No official Google Workspace MCP exists. taylorwilsdon's community server covers 12 services with 100+ tools, but requires OAuth setup via a GCP project. Google's official MCP efforts focus on GCP services, not Workspace."

# === TECHNICAL ===
language: "Python"
transport:
  - "streamable-http"
  - "stdio"
license: "MIT"
github_url: "https://github.com/taylorwilsdon/google_workspace_mcp"
npm_package: null
pypi_package: "workspace-mcp"
stars: 800
last_updated: 2026-02-10

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
  command: "uvx workspace-mcp --transport streamable-http"
  config_json:
    command: "uvx"
    args:
      - "workspace-mcp"
    env:
      GOOGLE_OAUTH_CLIENT_ID: "your_client_id"
      GOOGLE_OAUTH_CLIENT_SECRET: "your_client_secret"
  env_vars:
    - name: "GOOGLE_OAUTH_CLIENT_ID"
      description: "OAuth Client ID from GCP Console"
      required: true
    - name: "GOOGLE_OAUTH_CLIENT_SECRET"
      description: "OAuth Client Secret from GCP Console"
      required: true
  prerequisites:
    - "Python 3.10+"
    - "Google Cloud Platform project with APIs enabled"
    - "OAuth 2.0 credentials (client_secret.json)"

# === TAXONOMY ===
category:
  - "productivity"
  - "email"
  - "documents"
related_slugs:
  - "google-drive-mcp"
  - "notion-mcp"
  - "slack-mcp"
affiliate_links:
  - label: "Google Workspace Pricing"
    url: "https://workspace.google.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Google Workspace account across 12 services: Gmail, Drive, Calendar, Docs, Sheets, Slides, Forms, Tasks, Contacts, Chat, Apps Script, and Search. Over 100 tools covering reading, composing, and managing content across the Google ecosystem.

This is the community standard — taylorwilsdon's server is the most complete Google Workspace MCP integration available. Google's own official MCP servers focus on GCP infrastructure services, not Workspace productivity tools.

## What It Does Well

- **12 services in one server is comprehensive coverage.** Instead of installing separate MCP servers for Gmail, Drive, Calendar, and Docs, one server covers everything. The tool tiers (core/extended/full) let you control scope — start with core Gmail and Calendar, expand to Sheets and Slides when needed.
- **Desktop Extension (.dxt) offers one-click install.** Download the .dxt file and double-click to install in Claude Desktop. This bypasses the OAuth configuration complexity for the default setup path. CLI mode is available for Claude Code and Codex.
- **Read-only mode for safety-conscious users.** Enable read-only mode to let Claude search and read across all 12 services without write access. Good for research workflows where you want Gmail and Drive access but don't want Claude composing emails.

## What It Doesn't Do Well

- **OAuth setup requires creating a GCP project and enabling APIs.** You need to create a Google Cloud Platform project, enable individual APIs for each service, create OAuth credentials, and configure consent screens. This is 15-20 minutes of GCP Console navigation that most MCP servers don't require.
- **No official Google backing means uncertain long-term maintenance.** Google could ship an official Workspace MCP at any time, which would likely supersede this community server. Your investment in OAuth setup and workflow integration would need to be redone. Google's official MCP announcements have covered Maps, BigQuery, and GKE — Workspace hasn't been mentioned.

## Setup Notes

The OAuth setup is the main hurdle. Create a GCP project, enable the APIs for the services you want (Gmail, Drive, Calendar, etc.), create OAuth 2.0 credentials, and download the client_secret.json file. The .dxt Desktop Extension simplifies the final installation step, but the GCP project setup is unavoidable.

Alternative community servers exist: aaronsb/google-workspace-mcp (Docker, multi-account) and ngs/google-mcp-server (Go, Homebrew) if the taylorwilsdon version doesn't fit your stack.

## Config

```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "uvx",
      "args": ["workspace-mcp"],
      "env": {
        "GOOGLE_OAUTH_CLIENT_ID": "your_client_id.apps.googleusercontent.com",
        "GOOGLE_OAUTH_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
