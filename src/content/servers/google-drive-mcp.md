---
# === IDENTITY ===
slug: "google-drive-mcp"
name: "Google Drive MCP (mcp-gdrive)"
description: "Community server for searching and reading Google Drive files — the most referenced option in a fragmented ecosystem awaiting Google's official remote MCP."
verdict: "conditional"
verdict_note: "Useful once configured, but Google Cloud Console OAuth setup is painful. Fragmented ecosystem with no clear winner. Google's official remote MCP (announced Dec 2025) may obsolete community servers."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/isaacphi/mcp-gdrive"
npm_package: "@isaacphi/mcp-gdrive"
pypi_package: null
stars: 500
last_updated: 2026-01-01

# === SETUP ===
setup_difficulty: 3

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
  command: "npx -y @isaacphi/mcp-gdrive"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@isaacphi/mcp-gdrive"
    env:
      CLIENT_ID: "<YOUR_CLIENT_ID>"
      CLIENT_SECRET: "<YOUR_CLIENT_SECRET>"
  env_vars:
    - name: "CLIENT_ID"
      description: "OAuth Client ID from Google Cloud Console"
      required: true
    - name: "CLIENT_SECRET"
      description: "OAuth Client Secret from Google Cloud Console"
      required: true
    - name: "GDRIVE_CREDS_DIR"
      description: "Directory to store OAuth credentials (optional)"
      required: false
  prerequisites:
    - "Google Cloud Console project with Drive API enabled"
    - "OAuth 2.0 credentials (Client ID + Secret)"
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "productivity"
  - "cloud"
related_slugs:
  - "notion-mcp"
  - "filesystem-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to Google Drive for searching files, reading documents, and working with Google Sheets. The most referenced community implementation (isaacphi/mcp-gdrive) provides focused read-heavy access: search Drive, read file contents by ID, and read/write spreadsheet data. Broader alternatives exist that add support for Docs, Slides, and full file CRUD, but they come with more complexity.

Important context: Google announced an official remote MCP server in December 2025 covering all Google services. That server is still rolling out incrementally, but it will likely become the definitive answer for Google Drive integration. This listing covers the best available community option while we wait.

## What It Does Well

- **Search and read workflow covers the core use case.** Most users want to ask Claude about their Drive files — "find the Q4 budget spreadsheet" or "what does our project spec say about authentication." The search tool finds files, the read tools pull content. For read-heavy workflows, the focused tool set is actually an advantage — less tool clutter.
- **Google Sheets support goes beyond basic read.** The `read_spreadsheet` tool accepts range and sheet parameters, so you can target specific data within large workbooks. The `write_spreadsheet` tool enables updating cells. For spreadsheet-centric workflows, this is more useful than generic file access.
- **Once configured, authentication persists.** After the initial OAuth browser flow, credentials are cached locally. You don't need to re-authenticate every session. The token refresh happens automatically until you revoke access.

## What It Doesn't Do Well

- **Google Cloud Console setup is the worst onboarding in the MCP ecosystem.** Create a Google Cloud project, enable the Drive API, configure the OAuth consent screen, create OAuth credentials, download the client ID and secret, set up the redirect URI — all before you can even try the MCP server. This multi-step process through Google's notoriously complex console is the primary reason for the Conditional verdict.
- **Fragmented ecosystem with no community standard.** At least four Google Drive MCP servers exist: isaacphi/mcp-gdrive (focused, most referenced), piotr-agier/google-drive-mcp (broader with Docs/Sheets/Slides), taylorwilsdon/google_workspace_mcp (all-in-one including Gmail/Calendar), and the Anthropic reference implementation. Each has different capabilities and trade-offs. There's no clear winner.
- **Google's official remote MCP will likely make this obsolete.** Announced December 2025, Google's managed remote MCP server handles Drive and other services with OAuth built in — no Cloud Console setup, no local install. As it rolls out to more clients, community servers lose their reason to exist. Investing heavily in configuring a community server that may be replaced soon is a tough sell.

## Setup Notes

The hardest part is the Google Cloud Console setup. Here's the abbreviated path: go to console.cloud.google.com, create a new project, navigate to "APIs & Services" → "Library," search for "Google Drive API" and enable it. Then go to "Credentials" → "Create Credentials" → "OAuth client ID." You'll need to configure the consent screen first (set it to "External" for personal use, add your email as a test user). Create a "Desktop app" credential type and copy the Client ID and Client Secret.

First run of the MCP server will open a browser window for Google authentication. Approve the permissions and the server caches the credentials locally.

If you're waiting for Google's official remote MCP, that's a reasonable choice. If you need Drive integration today, this server works once you get past the setup.

## Config

```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@isaacphi/mcp-gdrive"],
      "env": {
        "CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
