---
# === IDENTITY ===
slug: "gpt-researcher-mcp"
name: "GPT Researcher MCP Server"
description: "Autonomous deep research agent that produces comprehensive reports with citations — multi-step web research with a STORM-inspired architecture."
verdict: "skip"
verdict_note: "Requires cloning a repo, pip install, and configuring multiple API keys (OpenAI + search provider) with nested LLM costs. Perplexity MCP delivers deep research with one API key and npx install. The research quality is good; the setup cost isn't justified."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
  - "sse"
license: "MIT"
github_url: "https://github.com/assafelovic/gptr-mcp"
npm_package: null
pypi_package: null
stars: 25400
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
  command: "pip install -r requirements.txt && python server.py"
  config_json:
    command: "python"
    args:
      - "server.py"
    env:
      OPENAI_API_KEY: "your_openai_key"
      TAVILY_API_KEY: "your_tavily_key"
  env_vars:
    - name: "OPENAI_API_KEY"
      description: "OpenAI API key for the research agent's LLM"
      required: true
    - name: "TAVILY_API_KEY"
      description: "Tavily API key for web search (or other supported search provider)"
      required: true
  prerequisites:
    - "Python 3.10+"
    - "OpenAI API key"
    - "Tavily API key (or alternative search provider)"

# === TAXONOMY ===
category:
  - "research"
  - "search"
  - "agents"
related_slugs:
  - "perplexity-mcp"
  - "tavily-mcp"
  - "exa-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Autonomous deep research agent that takes a query, runs multi-step web research, and produces factual reports with citations. Five MCP tools: deep research (comprehensive, ~30 seconds), quick search (optimized for speed), write report (generate from research results), get research sources (citations), and get research context (full context).

Built on a STORM-inspired multi-agent architecture with 25.4K GitHub stars. The agent conducts research independently — planning searches, synthesizing findings, and generating structured reports.

## What It Does Well

- **Deep research quality exceeds simple search aggregation.** The multi-agent architecture plans research strategies, runs multiple searches, cross-references sources, and synthesizes findings into coherent reports with proper citations. The output reads like research performed by a competent analyst, not a search results summary.
- **Can act as both MCP server and MCP client.** Configure RETRIEVER=tavily,mcp and the research agent connects to external MCP servers as data sources. This composability means GPT Researcher can pull from your company's internal MCP servers alongside web search.
- **Docker support with automatic transport detection.** Runs STDIO locally and SSE in Docker. `docker-compose up -d` gives you an SSE endpoint at `http://localhost:8000/sse` with no transport configuration needed.

## What It Doesn't Do Well

- **Nested LLM dependency means you're paying for two AI models.** GPT Researcher uses OpenAI internally for research planning and synthesis. Running it through Claude means you're paying for Claude's API (or subscription) plus OpenAI's API for the research agent. Two LLM bills for one workflow.
- **30+ second latency for deep research doesn't fit interactive workflows.** The deep_research tool is thorough but slow. If you need a quick answer, the quick_search tool exists, but the main value proposition — comprehensive research — requires patience. Some MCP clients may time out before results arrive.
- **Setup is heavier than most MCP servers.** Clone a repo, install Python dependencies, configure multiple API keys in a .env file, then run the server. No npx one-liner. The Docker path simplifies runtime but still requires API key configuration.

## Setup Notes

Clone the gptr-mcp repo, install requirements, create a .env file with your OpenAI and Tavily API keys, and run `python server.py`. Docker alternative: `docker-compose up -d` for SSE at port 8000.

The main GPT Researcher repo (assafelovic/gpt-researcher) has the full documentation. The MCP server is a separate lightweight repo that wraps the research agent.

For deep research, extend your MCP client timeout to at least 60 seconds — 180 seconds recommended for complex queries.

## Config

Local:

```json
{
  "mcpServers": {
    "gpt-researcher": {
      "command": "python",
      "args": ["path/to/gptr-mcp/server.py"],
      "env": {
        "OPENAI_API_KEY": "your_openai_key",
        "TAVILY_API_KEY": "your_tavily_key"
      }
    }
  }
}
```

Docker (SSE):

```json
{
  "mcpServers": {
    "gpt-researcher": {
      "url": "http://localhost:8000/sse"
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
