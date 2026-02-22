---
# === IDENTITY ===
slug: "obsidian-mcp"
name: "Obsidian MCP (mcp-obsidian)"
description: "Community server that connects Claude to local Obsidian vaults — search, read, and modify notes through the Obsidian REST API plugin."
verdict: "conditional"
verdict_note: "Best-known Obsidian MCP but requires a two-step dependency chain (Obsidian REST API plugin + Python server). Works well once running. Fragmented ecosystem — multiple alternatives exist."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/MarkusPfundstein/mcp-obsidian"
npm_package: null
pypi_package: "mcp-obsidian"
stars: 800
last_updated: 2026-02-01

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
  command: "uvx mcp-obsidian"
  config_json:
    command: "uvx"
    args:
      - "mcp-obsidian"
    env:
      OBSIDIAN_API_KEY: "<your_api_key>"
      OBSIDIAN_HOST: "127.0.0.1"
      OBSIDIAN_PORT: "27124"
  env_vars:
    - name: "OBSIDIAN_API_KEY"
      description: "API key from Obsidian REST API plugin settings"
      required: true
    - name: "OBSIDIAN_HOST"
      description: "Host for REST API (default: 127.0.0.1)"
      required: false
    - name: "OBSIDIAN_PORT"
      description: "Port for REST API (default: 27124)"
      required: false
  prerequisites:
    - "Obsidian desktop app (running)"
    - "Obsidian Local REST API community plugin (installed and enabled)"
    - "Python 3.10+ with uv/uvx"

# === TAXONOMY ===
category:
  - "productivity"
  - "knowledge"
related_slugs:
  - "notion-mcp"
  - "memory-mcp"
  - "filesystem-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to your local Obsidian vault through the Obsidian Local REST API community plugin. You can list files, read note contents, search across your vault, patch content relative to headings or block references, append to files, and delete files. Everything stays local — no cloud sync, no data leaving your machine.

The architecture is a chain: Claude talks to the MCP server, which talks to the REST API plugin, which talks to Obsidian's internal APIs. Obsidian must be running for any of this to work.

## What It Does Well

- **Full-text search that also matches filenames.** The v0.7.5 search tool checks both content and file names, which is more useful than it sounds. Obsidian users tend to put meaningful information in both places — note titles are often keywords, and content search alone misses the organizational structure.
- **Heading-relative content patching is vault-aware.** The `patch_content` tool can insert content relative to a specific heading, block reference, or frontmatter section. This is more precise than "append to file" — you can target exactly where new content goes in a structured note. For workflows like daily notes or project logs, this means Claude can add entries under the right heading without rewriting the whole file.
- **Fully local, fully private.** Your vault never touches a remote server. For users who chose Obsidian specifically because it's local-first and file-based, this matters. The MCP server inherits that philosophy — it reads from your local filesystem through the REST API, nothing more.

## What It Doesn't Do Well

- **Two-step dependency chain creates fragility.** You need: (1) the Obsidian Local REST API community plugin installed and enabled, and (2) the Python MCP server installed separately. If either breaks, the whole chain breaks. Plugin updates can change the API, Obsidian updates can break the plugin, and Python environment issues can break the server. That's three potential failure points.
- **Obsidian must be running.** Unlike Filesystem MCP which reads files directly, this server depends on the REST API plugin which runs inside the Obsidian app. If Obsidian isn't open, the MCP server has nothing to connect to. This means you can't use it in headless environments or CI pipelines.
- **Fragmented ecosystem makes it hard to pick the right server.** At least four Obsidian MCP servers exist with different approaches: this one (REST API), jacksteamdev/obsidian-mcp-tools (Obsidian plugin with semantic search), StevenStavrakis/obsidian-mcp (direct filesystem, Obsidian doesn't need to be running), and cyanheads/obsidian-mcp-server (NetworkX graph analysis). There's no clear "official" option. We're listing the most established one, but it may not be the best fit for your use case.

## Setup Notes

Step 1: In Obsidian, go to Settings → Community Plugins → Browse, search for "Local REST API," install it, and enable it. Copy the API key from the plugin's settings page.

Step 2: Install the MCP server with `uvx mcp-obsidian` and add the config below with your API key.

Step 3: Make sure Obsidian is running before you start your MCP client.

If `uvx` isn't in your PATH, you may need to specify the full path to the binary. On some systems, the uv installer puts it in `~/.local/bin/uvx` or similar. Check `which uvx` (Mac/Linux) or `where uvx` (Windows) if the MCP client can't find it.

## Config

Standard setup:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "uvx",
      "args": ["mcp-obsidian"],
      "env": {
        "OBSIDIAN_API_KEY": "your_api_key_here",
        "OBSIDIAN_HOST": "127.0.0.1",
        "OBSIDIAN_PORT": "27124"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
