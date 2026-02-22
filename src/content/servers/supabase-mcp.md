---
# === IDENTITY ===
slug: "supabase-mcp"
name: "Supabase MCP Server"
description: "Official Supabase server for managing tables, running SQL, handling migrations, edge functions, and project configuration through natural language."
verdict: "recommended"
verdict_note: "Official, well-maintained, excellent security defaults. OAuth makes setup painless. The remote HTTP version is the future — use it."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "http"
  - "stdio"
license: "MIT"
github_url: "https://github.com/supabase-community/supabase-mcp"
npm_package: "@supabase-community/supabase-mcp"
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
  windsurf: "full"
  cline: "full"

# === INSTALL ===
install:
  command: "Remote: https://mcp.supabase.com/mcp (recommended) or npx -y @supabase-community/supabase-mcp"
  config_json:
    type: "http"
    url: "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true"
  env_vars:
    - name: "SUPABASE_ACCESS_TOKEN"
      description: "Personal Access Token from supabase.com/dashboard/account/tokens (only for local install)"
      required: false
    - name: "SUPABASE_PROJECT_REF"
      description: "Your project reference ID from Supabase dashboard URL"
      required: false
  prerequisites:
    - "Supabase Cloud account (free tier works)"
    - "Node.js 18+ (for local install only)"

# === TAXONOMY ===
category:
  - "database"
  - "postgres"
  - "cloud"
related_slugs:
  - "postgres-mcp-pro"
  - "neon-mcp"
affiliate_links:
  - label: "Supabase Pro Plan"
    url: "https://supabase.com/pricing"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your Supabase Cloud projects. You can manage tables, run SQL queries, apply migrations, deploy edge functions, manage storage buckets, search Supabase documentation, and configure project settings. This is not a generic Postgres server — it wraps both the database and the Supabase Management API, so you get platform-level operations (create projects, manage branches, view logs) alongside database access.

Two deployment paths: a **remote HTTP server** at `mcp.supabase.com/mcp` that authenticates via OAuth (recommended), and a **local npm package** that uses a Personal Access Token. Supabase is investing in the remote version — it's where new features land first.

## What It Does Well

- **Security defaults are best-in-class.** Read-only mode via `read_only=true` query parameter, project scoping via `project_ref` to limit access to a single project, and feature groups to restrict which tool categories load. SQL results are wrapped in untrusted-data tags to mitigate prompt injection. These aren't buried options — they're the recommended defaults.
- **OAuth dynamic client registration removes the friction.** For the remote server, you don't need to create a PAT or manage tokens. Click through the browser OAuth flow and you're connected. This is how MCP setup should work — the credential management is invisible.
- **Feature groups give you granular control.** The server organizes tools into groups: Account, Docs, Database, Edge Functions, Branching, Storage, and Development/Debug. You can enable only what you need via `features=database,docs` in the URL. Storage is disabled by default because it's the most sensitive. This is thoughtful defaults.

## What It Doesn't Do Well

- **Supabase Cloud only.** This server talks to Supabase's hosted platform. It doesn't connect to self-hosted Supabase instances or vanilla Postgres databases. If you're running Postgres locally or on another host, this isn't your tool — look at Postgres MCP Pro instead.
- **Branching requires a paid plan.** The branch-based development workflow (create branch, test changes, merge to main) is one of Supabase's best features, but it's gated behind paid tiers. Free tier users get database access and edge functions but miss the safer migration workflow.
- **Two servers with similar names cause confusion.** The official server is `supabase-community/supabase-mcp`. A separate community package on PyPI called `supabase-mcp-server` by thequery.dev exists and requires an API key from their site. They're different tools. The official one is what you want.

## Setup Notes

For the remote server: paste the URL into your client's MCP config and open the OAuth page when prompted. Add `project_ref=YOUR_PROJECT_ID` to scope it to one project and `read_only=true` if you want to prevent writes. That's it — no token management, no environment variables.

For the local server: create a Personal Access Token at supabase.com/dashboard/account/tokens, add it as `SUPABASE_ACCESS_TOKEN` in your environment, and run via npx. The local server works but the docs explicitly say it may be sunsetted in favor of the remote version.

Supabase's own docs say "never connect to production data." Take that seriously — use a development project.

## Config

Remote server (recommended):

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true"
    }
  }
}
```

Local with PAT:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase-community/supabase-mcp"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_your_token_here",
        "SUPABASE_PROJECT_REF": "your-project-ref"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
