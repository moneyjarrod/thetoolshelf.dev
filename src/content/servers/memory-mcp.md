---
# === IDENTITY ===
slug: "memory-mcp"
name: "Memory MCP"
description: "Persistent knowledge graph that lets Claude remember entities, relations, and observations across conversations."
verdict: "conditional"
verdict_note: "Powerful if you design your graph deliberately, but the lack of filtering and export means it requires discipline to keep useful."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory"
npm_package: "@modelcontextprotocol/server-memory"
pypi_package: null
stars: 76000
last_updated: 2026-01-26

# === SETUP ===
setup_difficulty: 1

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
  command: "npx -y @modelcontextprotocol/server-memory"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-memory"
  env_vars:
    - name: "MEMORY_FILE_PATH"
      description: "Custom path for the memory.jsonl storage file. Defaults to memory.jsonl in the server's install directory."
      required: false
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "local-tools"
  - "memory"
  - "knowledge-graph"
related_slugs:
  - "filesystem-mcp"
  - "sequential-thinking-mcp"
  - "sqlite-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude a persistent knowledge graph stored as a local JSONL file. You create entities (people, projects, concepts), connect them with relations, and attach observations. The graph survives across conversations — Claude can read it back next session and pick up where you left off.

## What It Does Well

- **Zero-friction install.** One line in your config, no API keys, no env vars, no services to run. It just works out of the box. Under 30 seconds from config paste to first entity created.
- **The data model is intuitive.** Entities, relations, and observations map naturally to how you'd describe things to another person. "John works_at Acme" is a relation. "John speaks Spanish" is an observation on the John entity. Claude picks up the pattern immediately without heavy prompting.
- **Persistence actually works.** Data written in session 1 is fully readable in session 50. The JSONL file is human-readable — you can open it in a text editor and see exactly what's stored. No opaque database, no binary format.

## What It Doesn't Do Well

- **read_graph returns everything.** There's no pagination, no filtering, no "give me just the entities of type X." Once your graph has 200+ entities, read_graph dumps the entire thing into context. For small personal use this is fine. For anything ambitious, you'll hit context limits fast.
- **search_nodes is basic text matching.** It searches entity names, types, and observation text — but it's substring matching, not semantic search. If you stored "loves Italian food" and search for "cuisine preferences," you get nothing. You need to remember your own vocabulary.
- **No built-in export or backup.** The JSONL file is your only copy. No export command, no versioning, no "undo last delete." If Claude deletes an entity, it's gone. You can back up the file manually, but the server doesn't help you.
- **MEMORY_FILE_PATH has had bugs.** Version 0.6.2 shipped with a hardcoded path that ignored the environment variable entirely. The 2026.1.26 release addressed this, but if you're on an older cached npx version, your custom path may silently not work. Verify by checking where the actual .jsonl file appears.

## Setup Notes

Smoothest install of any MCP server I've tested. Paste the config, restart Claude Desktop, done. No gotchas, no prerequisites beyond Node.js.

One thing the README doesn't emphasize: the default storage location is inside the npx cache directory, which can change between versions. If you care about where your data lives — and you should — set `MEMORY_FILE_PATH` explicitly and verify the file appears where you expect it. The default "it just works" path is fine for experimentation but not for data you want to keep long-term.

The README suggests a "custom instructions" prompt that makes Claude automatically read and write to memory every turn. I'd skip this for most use cases — it burns tokens on graph reads you don't need and creates noisy entities. Better to call the tools deliberately when you have something worth remembering.

## Config

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

To specify a custom storage location:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "C:/Users/yourname/Documents/memory.jsonl"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11 (daily driver, 100+ sessions)
