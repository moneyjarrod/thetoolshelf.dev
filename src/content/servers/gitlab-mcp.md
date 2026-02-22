---
# === IDENTITY ===
slug: "gitlab-mcp"
name: "GitLab MCP Server"
description: "Three integration paths — GitLab's built-in MCP (18.6+), Anthropic's reference server, and feature-rich community options with 60+ tools."
verdict: "recommended"
verdict_note: "GitLab's built-in MCP server (18.6+) is the cleanest path — OAuth 2.0, no external dependencies, works with self-managed instances. The reference server covers older versions."

# === TECHNICAL ===
language: "Ruby"
transport:
  - "http"
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers-archived"
npm_package: "@modelcontextprotocol/server-gitlab"
pypi_package: null
stars: 0
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 1

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
  command: "Configure https://gitlab.com/api/v4/mcp as HTTP MCP server"
  config_json:
    url: "https://gitlab.com/api/v4/mcp"
  env_vars:
    - name: "GITLAB_PERSONAL_ACCESS_TOKEN"
      description: "PAT from gitlab.com/-/user_settings/personal_access_tokens (only needed for reference server)"
      required: false
  prerequisites:
    - "GitLab 18.6+ (for built-in MCP)"
    - "Or Node.js 18+ (for reference server)"

# === TAXONOMY ===
category:
  - "coding"
  - "version-control"
related_slugs:
  - "github-mcp"
  - "git-mcp"
affiliate_links:
  - label: "GitLab Pricing"
    url: "https://about.gitlab.com/pricing/"

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to GitLab for repository management, merge requests, issues, pipelines, and project administration. Three paths exist: GitLab's built-in MCP server (available in GitLab 18.6+), Anthropic's reference server (archived but functional), and community servers with expanded tool sets.

The built-in option is the future — it's part of GitLab itself, uses OAuth 2.0 Dynamic Client Registration, and respects your existing GitLab permissions without any external dependencies.

## What It Does Well

- **Built-in MCP (18.6+) means no server to install or maintain.** GitLab exposes MCP at `https://your-gitlab.com/api/v4/mcp` as a native feature. OAuth handles authentication through the browser, permissions follow your existing GitLab roles, and updates come with GitLab itself. This is the cleanest vendor MCP integration we've reviewed.
- **Self-managed instance support is a differentiator.** Unlike GitHub's MCP which only works with github.com, GitLab's built-in MCP works with self-managed GitLab installations. Point it at your company's GitLab instance and it just works with the same OAuth flow.
- **Community options fill gaps for older versions.** If you're stuck on GitLab < 18.6, zereight/gitlab-mcp offers 60+ tools with multi-user support and read-only mode. mcpland/gitlab-mcp adds a policy engine. You have options regardless of your GitLab version.

## What It Doesn't Do Well

- **The reference server is archived and no longer maintained.** @modelcontextprotocol/server-gitlab was moved to the servers-archived repo. It works today, but bugs won't be fixed. If you're on a GitLab version that supports the built-in MCP, use that instead.
- **Built-in MCP requires GitLab 18.6+ which many organizations haven't upgraded to yet.** Enterprise GitLab upgrades move slowly. If your organization runs GitLab 17.x or earlier, you're stuck with the archived reference server or community options until your admin team upgrades.

## Setup Notes

For GitLab 18.6+: configure `https://gitlab.com/api/v4/mcp` (or your self-managed URL) as an HTTP MCP server in your client. OAuth handles auth through the browser. No tokens in config files.

For older versions: `npx -y @modelcontextprotocol/server-gitlab` with a Personal Access Token. Create the PAT at gitlab.com/-/user_settings/personal_access_tokens with the scopes you need (api, read_repository, etc.).

## Config

Built-in (GitLab 18.6+, recommended):

```json
{
  "mcpServers": {
    "gitlab": {
      "url": "https://gitlab.com/api/v4/mcp"
    }
  }
}
```

Reference server (older versions):

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gitlab"],
      "env": {
        "GITLAB_PERSONAL_ACCESS_TOKEN": "glpat-your_token",
        "GITLAB_API_URL": "https://gitlab.com/api/v4"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
