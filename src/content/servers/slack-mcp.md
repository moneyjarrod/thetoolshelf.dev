---
# === IDENTITY ===
slug: "slack-mcp"
name: "Slack MCP Server"
description: "Lets Claude interact with Slack workspaces — list channels, read message history, post messages, reply to threads, add reactions, and look up user profiles."
verdict: "conditional"
verdict_note: "Functional once you get past the setup wall. Creating a Slack app, configuring bot scopes, and installing it to your workspace is a 15-minute process with multiple gotcha points. Worth it if Slack is central to your workflow."

# === TECHNICAL ===
language: "TypeScript"
transport:
  - "stdio"
license: "MIT"
github_url: "https://github.com/modelcontextprotocol/servers"
npm_package: "@modelcontextprotocol/server-slack"
pypi_package: null
stars: 800
last_updated: 2025-04-01

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
  command: "npx -y @modelcontextprotocol/server-slack"
  config_json:
    command: "npx"
    args:
      - "-y"
      - "@modelcontextprotocol/server-slack"
    env:
      SLACK_BOT_TOKEN: "xoxb-your-bot-token"
      SLACK_TEAM_ID: "T01234567"
  env_vars:
    - name: "SLACK_BOT_TOKEN"
      description: "Bot user OAuth token from your Slack app — starts with xoxb-"
      required: true
    - name: "SLACK_TEAM_ID"
      description: "Your Slack workspace ID — find it in workspace settings or the URL"
      required: true
    - name: "SLACK_CHANNEL_IDS"
      description: "Comma-separated list of channel IDs to restrict access. Optional — if omitted, the bot can access all channels it's been added to."
      required: false
  prerequisites:
    - "Node.js 18+"
    - "A Slack workspace where you have admin or app-install permissions"
    - "A Slack app with bot token scopes configured (see Setup Notes)"

# === TAXONOMY ===
category:
  - "communication"
related_slugs:
  - "github-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Connects Claude to a Slack workspace through a bot token. Claude can list channels, read channel history, read thread replies, post messages, reply to threads, add reactions, and retrieve user profiles. It's the Anthropic reference server from the MCP servers repository — simple, focused, and npm-installable.

Note: Slack also has a newer **official remote MCP server** at `mcp.slack.com` that uses OAuth and is hosted by Slack themselves. That server is designed for enterprise integrations and app developers. This listing covers the reference server (`@modelcontextprotocol/server-slack`), which is the simpler option for individual users who want Claude to interact with their workspace.

## What It Does Well

- **Full read/write on the channels you care about.** Claude can read message history, understand thread conversations, post responses, and add reactions. For workflows like "summarize what happened in #engineering today" or "reply to that thread about the deploy," it's exactly what you need. The `SLACK_CHANNEL_IDS` env var lets you restrict which channels Claude can touch.
- **Simple tool surface.** Seven tools total: `slack_list_channels`, `slack_post_message`, `slack_reply_to_thread`, `slack_add_reaction`, `slack_get_channel_history`, `slack_get_thread_replies`, and `slack_get_users`. That's enough to be useful without overwhelming the model with options. Each tool maps cleanly to one Slack API call.
- **Standard npx install.** Once you have the bot token and team ID, the config block is three lines. No Docker, no Python, no build step.

## What It Doesn't Do Well

- **The setup process is the hard part.** You need to create a Slack app at api.slack.com, add bot token scopes (channels:history, channels:read, chat:write, reactions:write, users:read at minimum), install the app to your workspace, then copy the bot token. If you've never created a Slack app before, this takes 15+ minutes and requires admin-level permissions on the workspace. Most MCP servers need an API key — this one needs you to build the whole app first.
- **Bot must be explicitly added to channels.** A common confusion: even after installing the Slack app to your workspace, the bot can't read or post in a channel until someone invites it with `/invite @YourBotName`. If Claude says a channel is empty when you know it's not, this is why. Every channel you want Claude to access needs an explicit bot invite.
- **No search capability.** The reference server can read channel history (most recent messages) and thread replies, but it cannot search across the workspace. If you want Claude to find a specific message from three weeks ago, it would need to paginate through history manually. The official Slack MCP server at `mcp.slack.com` does support search — this one doesn't.
- **Rate limits can bite on busy channels.** Reading history from high-volume channels generates multiple API calls. Slack's rate limits are per-workspace per-app, and the server doesn't surface rate limit warnings clearly. If Claude starts getting empty results on channels you know have messages, rate limiting is the likely cause.
- **Last npm publish was April 2025.** The reference servers repo is in maintenance mode — it still works, but don't expect new features. For teams that need more, the official Slack MCP server or the community server by korotovsky (which supports DMs, stealth mode, and smart history fetching) may be better options.

## Setup Notes

The multi-step setup is the biggest barrier. Here's the path:

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app "From scratch"
2. Under **OAuth & Permissions**, add these bot token scopes: `channels:history`, `channels:read`, `chat:write`, `reactions:write`, `users:read`. Add `groups:read` and `groups:history` if you need private channels.
3. Click **Install to Workspace** and authorize
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`)
5. Find your **Team ID** — it's the `T` value in your Slack workspace URL, or under workspace settings

Common mistakes: forgetting to add the bot to channels (use `/invite @BotName`), using a user token instead of a bot token, and not adding enough scopes before installing (you'll need to reinstall the app if you add scopes later).

If your workspace requires admin approval for apps, you'll need to submit the app for approval before you can install it. This can add days to the setup process depending on your org.

## Config

Standard:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

Restricted to specific channels:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T01234567",
        "SLACK_CHANNEL_IDS": "C01234567,C76543210"
      }
    }
  }
}
```

Docker:

```json
{
  "mcpServers": {
    "slack": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "SLACK_BOT_TOKEN",
        "-e", "SLACK_TEAM_ID",
        "mcp/slack"
      ],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

**Note:** The official Slack MCP server at `mcp.slack.com` is a different product — remote, OAuth-based, and designed for enterprise use. This is the simpler reference implementation for individual users.

## Tested With

- Claude Desktop on Windows 11
