---
# === IDENTITY ===
slug: "git-mcp"
name: "Git MCP Server"
description: "Anthropic's reference server for local Git operations — read files, search commits, view diffs, and inspect history without API keys."
verdict: "recommended"
verdict_note: "Simple, useful, zero configuration. Works with any local Git repo. Reference quality from the MCP maintainers."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers"
npm_package: "@modelcontextprotocol/server-git"
pypi_package: null
stars: 15000
last_updated: 2026-02-10

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
  command: "npx -y @modelcontextprotocol/server-git"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-git"
      - "--repository"
      - "C:/path/to/your/repo"
  env_vars: []
  prerequisites:
    - "Node.js 18+"
    - "Git installed locally"

# === TAXONOMY ===
category:
  - "coding"
  - "version-control"
related_slugs:
  - "github-mcp"
  - "gitlab-mcp"
  - "filesystem-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude read access to any local Git repository. Search commits, view diffs, read files at specific revisions, inspect branch history, and navigate the repository structure. Pure local operations — no API keys, no network calls, no authentication.

This is distinct from GitHub MCP (which uses the GitHub API for remote operations) and GitLab MCP (which connects to GitLab's platform). Git MCP works with the repository on your filesystem, regardless of where it's hosted.

## What It Does Well

- **Zero configuration beyond pointing at a repo.** No API keys, no tokens, no environment variables, no accounts. Pass the repository path as an argument and Claude has full read access to the Git history. The simplest MCP server in our database category to set up.
- **Actively maintained reference server.** Unlike several other Anthropic reference servers that have been archived (Puppeteer, Brave Search, Slack), the Git server remains in the active servers repository. It gets updates alongside the MCP specification itself.
- **Complements rather than competes with GitHub/GitLab MCP.** Use Git MCP for local repo inspection (commit history, diffs, file reading) and GitHub/GitLab MCP for platform operations (issues, PRs, CI/CD). They solve different problems and work well together.

## What It Doesn't Do Well

- **Read-only with no write operations.** Claude can inspect your repository but can't create commits, switch branches, or modify files through this server. For write operations you need the Filesystem MCP or a tool like Desktop Commander.
- **Single repository per server instance.** Each MCP config entry points to one repository. If you work across multiple repos, you either reconfigure between projects or run multiple instances with different names. Not a dealbreaker, but less flexible than servers that support dynamic repository switching.

## Setup Notes

Install is one line. The only decision is which repository path to point at. Pass it as the `--repository` argument. Claude will have read access to the entire Git history of that repository — all branches, all commits, all files at any revision.

If you're on Windows, use forward slashes or escaped backslashes in the path.

## Config

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "--repository",
        "C:/Projects/your-repo"
      ]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
