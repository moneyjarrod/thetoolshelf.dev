---
# === IDENTITY ===
slug: "github-mcp"
name: "GitHub MCP Server"
description: "Connects Claude to GitHub's API — browse repos, manage issues and PRs, monitor Actions workflows, and analyze code security findings through natural language."
verdict: "recommended"
verdict_note: "The gold standard for platform MCP servers. Actively maintained by GitHub, feature-rich, and the toolset system solves the tool-overwhelm problem nobody else has addressed."

# === TECHNICAL ===
language: "Go"
transport:
  - "stdio"
  - "streamable-http"
license: "MIT"
github_url: "https://github.com/github/github-mcp-server"
npm_package: null
pypi_package: null
stars: 20000
last_updated: 2025-12-01

# === SETUP ===
setup_difficulty: 2

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
  command: "docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server"
  config_json:
    command: "docker"
    args:
      - "run"
      - "-i"
      - "--rm"
      - "-e"
      - "GITHUB_PERSONAL_ACCESS_TOKEN"
      - "ghcr.io/github/github-mcp-server"
  env_vars:
    - name: "GITHUB_PERSONAL_ACCESS_TOKEN"
      description: "Personal Access Token from github.com/settings/tokens — scope determines which tools are available"
      required: true
  prerequisites:
    - "Docker Desktop (or compatible container runtime)"
    - "GitHub Personal Access Token (classic or fine-grained)"

# === TAXONOMY ===
category:
  - "devops"
  - "version-control"
related_slugs:
  - "filesystem-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude direct access to the GitHub API. Claude can browse repository contents, read files, search code, create and manage issues, open and review pull requests, monitor GitHub Actions workflows, check Dependabot alerts, and manage releases. It's the official server built and maintained by GitHub themselves, not a community wrapper.

The server ships with 50+ tools organized into toolsets: repos, issues, pull_requests, actions, code_security, users, notifications, context, experiments, and stargazers. By default only five toolsets load (context, issues, pull_requests, repos, users), which keeps the tool count manageable. You can expand or restrict from there.

Two deployment modes exist: a **local** server that runs via Docker with a Personal Access Token, and a **remote** server hosted by GitHub at `api.githubcopilot.com/mcp/` that uses OAuth. The remote version is the fastest path if your client supports HTTP transport. The local Docker version works everywhere.

## What It Does Well

- **The toolset system is the real innovation.** With 50+ tools, most LLMs would drown in options. GitHub solved this with `--toolsets` — you pick which groups of tools to expose (e.g., just `repos,issues`) and Claude only sees those. There's also a `--dynamic-toolsets` beta where Claude starts with just three discovery tools and enables toolsets on demand as the conversation requires them. Nobody else in the MCP ecosystem has built tool management this thoughtfully.
- **Read-only mode is a first-class feature.** Pass `--read-only` and every write tool disappears — no creating issues, no pushing commits, no merging PRs. This is the right way to let Claude explore your repos without risk. Read-only takes priority over everything else, so even if you explicitly request write tools alongside it, they won't load. That's defense-in-depth.
- **Scope-aware token filtering.** When you use a classic PAT, the server reads your token's scopes at startup and hides tools you don't have permission for. You never see a tool that will fail when called. With OAuth on the remote server, it uses scope challenges — if Claude tries to use a tool you haven't authorized, you get prompted to grant it. Both approaches are smarter than "show everything and let it error."

## What It Doesn't Do Well

- **Docker is the only clean local install path.** There's no `npx` one-liner. You either run via Docker or build the Go binary yourself. For developers who already have Docker Desktop, this is invisible. For those who don't, installing Docker just for one MCP server is a heavyweight ask. The remote server avoids this entirely but requires HTTP transport support in your client.
- **PAT scope management is on you.** The server itself is well-designed, but GitHub's token permission system is complex. Classic PATs have coarse scopes. Fine-grained PATs have granular repo-level permissions but are newer and less documented. If you grant too much, Claude can modify repos you didn't intend. If you grant too little, tools silently disappear. There's no guided setup — you need to understand GitHub's token system before configuring.
- **Tool count can still overwhelm despite toolsets.** Even with the default five toolsets, you're looking at 30+ tools. In conversations where Claude has other MCP servers loaded too, the combined tool count can push past what models handle gracefully. The dynamic toolsets feature addresses this but it's still in beta and not available on the remote server.

## Setup Notes

The Docker path is straightforward once you have Docker Desktop running: pull the image, set your token as an environment variable, and add the config block. The image is hosted on GitHub Container Registry (`ghcr.io`), not Docker Hub, so if your network blocks GHCR you'll need to work around that.

For the PAT, start with a classic token with `repo` scope if you want full read/write on your repositories, or just `public_repo` if you only need read access to public repos. You can always create a new token with more scopes later. The server logs which tools were filtered out due to missing scopes, so check your MCP client's server logs if tools seem missing.

If your client supports HTTP transport, the remote server at `https://api.githubcopilot.com/mcp/` is genuinely easier — no Docker, no PAT management, just OAuth in the browser. VS Code 1.101+ and Claude Desktop both support this.

## Config

Local with Docker (most common):

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

Read-only mode (recommended for exploration):

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e", "GITHUB_READ_ONLY=1",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

Restricted toolsets (just repos and issues):

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "-e", "GITHUB_TOOLSETS=repos,issues",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

Remote server (no Docker needed, requires HTTP transport support):

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
