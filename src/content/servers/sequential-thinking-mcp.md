---
# === IDENTITY ===
slug: "sequential-thinking-mcp"
name: "Sequential Thinking MCP"
description: "Structured reasoning scratchpad that lets Claude break complex problems into numbered, revisable thought steps."
verdict: "conditional"
verdict_note: "Genuinely helps on complex multi-step reasoning, but adds overhead on tasks where Claude already thinks clearly without it."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking"
npm_package: "@modelcontextprotocol/server-sequential-thinking"
pypi_package: null
stars: 76000
last_updated: 2025-12-18

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
  command: "npx -y @modelcontextprotocol/server-sequential-thinking"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-sequential-thinking"
  env_vars:
    - name: "DISABLE_THOUGHT_LOGGING"
      description: "Set to 'true' to suppress thought logging in server output. Default: false."
      required: false
  prerequisites:
    - "Node.js 18+"

# === TAXONOMY ===
category:
  - "local-tools"
  - "reasoning"
  - "problem-solving"
related_slugs:
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

Provides Claude with a single tool — `sequentialthinking` — that creates a structured scratchpad for step-by-step reasoning. Claude writes numbered thoughts, estimates how many steps it needs, and can revise earlier thoughts or branch into alternative approaches. It's a thinking-out-loud framework that lives inside tool calls rather than in the regular response.

## What It Does Well

- **Forces decomposition on hard problems.** When Claude uses this on genuinely complex tasks — architecture decisions, multi-variable tradeoffs, debugging with several possible causes — the numbered-step format prevents it from jumping to conclusions. Each thought builds on the last, and the revision mechanism lets it say "actually, thought 3 was wrong" and correct course mid-stream.
- **Branching is the standout feature.** Claude can fork from any thought into an alternative path, maintaining the original chain while exploring a different direction. For problems with genuinely competing approaches, this produces better analysis than a single linear response.
- **Zero config, zero friction.** Same story as the other reference servers — paste the config, restart, done. No API keys, no env vars required. The only optional setting is disabling thought logging.

## What It Doesn't Do Well

- **No persistence between conversations.** Every thought chain vanishes when the conversation ends. If Claude spent 15 thoughts analyzing your system architecture, that work is gone next session. Pair it with Memory MCP or manual note-taking if you need to keep the output.
- **Claude already thinks step-by-step without this.** For straightforward questions or tasks with obvious approaches, this server adds tool-call overhead without meaningfully improving the answer. You'll see Claude use 8 numbered thoughts to reach a conclusion it would've reached in one paragraph. The value is narrow — complex, ambiguous problems only.
- **Thought output lives in tool calls, not the response.** The structured reasoning happens inside the tool call. What you see in the chat is Claude's summary after thinking. If you want to inspect the actual thought chain, you need to expand the tool call details in the UI. This isn't a bug, but it means the thinking process is somewhat hidden from the user by default.
- **No way to guide the thinking.** You can't tell the server "focus on security implications" or "consider cost constraints." It's Claude deciding what to think about. The server provides the structure but not the direction — that's still on your prompt.

## Setup Notes

Nothing to report. Paste config, restart, working. Fastest possible install — no configuration decisions to make at all.

The one env var (`DISABLE_THOUGHT_LOGGING`) controls whether the server logs thought content to stderr. Leave it at default unless the logs are noisy in your setup.

Tip: if you want Claude to use this tool, ask explicitly. "Use sequential thinking to analyze X" works. Otherwise Claude may or may not reach for it depending on how complex it judges the task to be. In my experience, Claude underestimates when it needs structured thinking — prompting it directly produces better results than waiting for it to self-select.

## Config

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11 (daily driver, 100+ sessions)
