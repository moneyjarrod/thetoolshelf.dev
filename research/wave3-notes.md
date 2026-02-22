# Wave 3 Research Notes — Servers 21-30

Research session S145. Web search per server, compiled for writing session.

---

## 21. Exa MCP

**Official:** github.com/exa-labs/exa-mcp-server
- npm: exa-mcp-server (2,887 downloads, v3.1.8)
- Remote MCP: https://mcp.exa.ai/mcp (no local install needed)
- Local: `npx -y exa-mcp-server` with EXA_API_KEY env

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.exa.ai/mcp"]
    }
  }
}
```

**Setup (Local):**
```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "your-key-from-dashboard.exa.ai"
      }
    }
  }
}
```

**Tools:** web_search_exa, web_search_advanced_exa, get_code_context_exa, crawling_exa, company_research_exa, people_search_exa, deep_researcher_start, deep_researcher_check

**Selective tool enabling:** URL params on remote: `?tools=web_search_exa,get_code_context_exa`

**API key:** Required. dashboard.exa.ai/api-keys

**Pricing:** Credit-based. Starter $49/mo (8K credits), Pro $449/mo (100K credits), Enterprise custom. Exa Instant: $5/1,000 requests. Free credits (~$10-20) on signup for testing.

**Community forks:** egoist/exa-mcp, 199-mcp/mcp-exa (SSE support), it-beard/exa-server
**Companion:** exa-knowledge-mcp (docs server, separate from live API)

**Affiliate potential:** YES — Exa API paid tiers. Multiple pricing tiers.

**Notes for listing:**
- Dual-mode (remote vs local) is nice
- Selective tool enabling is a differentiator
- Semantic/neural search, not keyword — key value prop
- Deep researcher feature (async start/check pattern)
- Setup difficulty: 2 (API key required)

---

## 22. Tavily MCP

**Official:** github.com/tavily-ai/tavily-mcp (1,207 stars)
- Remote MCP: https://mcp.tavily.com/mcp/?tavilyApiKey=<key>
- Also supports OAuth flow (alternative to API key in URL)

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY"]
    }
  }
}
```

**Tools:** tavily-search, tavily-extract, tavily-map, tavily-crawl

**API key:** Required. tavily.com — free tier available (1,000 credits/month, no credit card)

**Pricing:**
- Free: 1,000 credits/month (1 credit = 1 basic search, 2 = advanced search)
- Project: $30/mo (4,000 credits)
- Bootstrap: $100/mo (15,000 credits)
- Startup: $220/mo (38,000 credits)
- Growth: $500/mo (100,000 credits)
- PAYG: $0.008/credit
- Enterprise: custom
- Credits don't roll over

**DEFAULT_PARAMETERS header:** Can set defaults for include_images, search_depth, max_results

**Docs:** docs.tavily.com/documentation/mcp

**Community:** RamXX/mcp-tavily (deprecated in favor of official), altinakseven/tavily-mcp-server, apappascs/tavily-search-mcp-server, NoeSamaille/tavily-mcp-sse

**Affiliate potential:** YES — multiple paid tiers, clear upgrade path from free.

**Notes for listing:**
- Free tier is a big selling point for testing
- AI-optimized search results (designed for LLM consumption)
- Popular in LangChain/LlamaIndex ecosystems
- Extract + Map + Crawl beyond just search
- Credits don't roll over — watch usage
- Setup difficulty: 2 (API key, but free tier available)

---

## 23. Sentry MCP

**Official:** github.com/getsentry/sentry-mcp
- npm: @sentry/mcp-server (11,891 downloads, v0.29.0)
- Remote MCP: https://mcp.sentry.dev/mcp (OAuth, hosted by Sentry)

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.sentry.dev/mcp"]
    }
  }
}
```

**Setup (Local):**
```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Tools:** search_events, search_issues, get_issue, create_issue, update_issue, + more

**Special requirement:** LLM provider for AI-powered search features. EMBEDDED_AGENT_PROVIDER (openai/anthropic) + API key. This is unusual — an MCP server that itself calls an LLM.

**Seer integration:** AI-generated fix recommendations via MCP

**Self-hosted support:** --host flag for custom Sentry instances

**Skills can be disabled:** --disable-skills=seer

**Docs:** docs.sentry.io/product/sentry-mcp/

**Community:** MCP-100/mcp-sentry, elliottlawson/mcp-sentry, ddfourtwo/sentry-selfhosted-mcp, zereight/sentry-mcp

**Affiliate potential:** YES — Sentry paid plans (Team, Business, Enterprise)

**Notes for listing:**
- The embedded LLM requirement is a gotcha — needs its own API key for AI features
- Remote OAuth version is cleaner
- Self-hosted support is a differentiator for enterprise users
- Seer AI fix suggestions are unique
- Setup difficulty: 2 (token needed), possibly 3 if configuring embedded agent

---

## 24. Grafana MCP

**Official:** github.com/grafana/mcp-grafana (Go-based, v0.7.7+)

**Setup:**
```json
{
  "mcpServers": {
    "grafana": {
      "command": "mcp-grafana",
      "env": {
        "GRAFANA_URL": "http://localhost:3000",
        "GRAFANA_API_KEY": "your-service-account-token"
      }
    }
  }
}
```

**Install:** `go install github.com/grafana/mcp-grafana/cmd/mcp-grafana@latest` OR Docker

**Requires:** Grafana 9.0+ for full functionality. Service account token.

**Tools:** search dashboards, get dashboard by UID, get dashboard summary, run PromQL queries, run LogQL queries, OnCall tools, Tempo integration, annotation tools

**Configurable categories:** --disable-<category> (e.g. --disable-oncall, --disable-navigation)
**Read-only mode:** --disable-write flag
**TLS support:** client cert auth

**Related servers:**
- grafana/loki-mcp (Loki-specific)
- grafana/tempo-mcp-server (Tempo traces)
- DrDroidLab/grafana-mcp-server (Python, HTTP/SSE)
- christian-schlichtherle/grafana-mcp (multi-cluster, label-based protection)

**Affiliate potential:** YES — Grafana Cloud paid tiers

**Notes for listing:**
- Go binary — no Node/Python needed, but requires Go install or Docker
- Running Grafana instance is prerequisite
- Rich tool set across dashboards + PromQL + LogQL + OnCall + Tempo
- Category disabling is nice for reducing tool surface
- Setup difficulty: 3 (needs Go + running Grafana + service account)

---

## 25. shadcn/ui MCP

**Official shadcn MCP:** ui.shadcn.com/docs/mcp (built into shadcn CLI, registry-based)

**Setup (Official — project-based):**
Add to `.mcp.json`, `.cursor/mcp.json`, or `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@latest", "mcp"]
    }
  }
}
```

**Tools (official):** browse components, search registries, install components via natural language. Supports multiple registries (shadcn/ui, private, third-party, namespaced).

**Community implementations (component docs/source access):**
- Jpisnice/shadcn-ui-mcp-server (npm: @jpisnice/shadcn-ui-mcp-server) — multi-framework: React, Svelte, Vue, React Native. SSE support, port 7423. GitHub token for rate limits.
- heilgar/shadcn-ui-mcp-server (npm: @heilgar/shadcn-ui-mcp-server)
- mamba-mental/shadcn-ui-mcp-server (scrapes docs + GitHub)
- MCPBro/shadcn-mcp (SSE mode for VS Code Agent)

**GitHub token note:** 5000 req/hr with token vs 60 req/hr without for community servers

**Affiliate potential:** NONE — open source library, no paid tiers

**Notes for listing:**
- Two distinct use cases: official CLI (install components) vs community (access docs/source)
- Official server is project-scoped (needs existing project)
- Community servers give AI access to component docs for reference
- Multi-framework support in Jpisnice version is impressive
- Rate limiting without GitHub token is a real pain point
- Setup difficulty: 1 (official, npx), 2 (community with token)

---

## 26. Redis MCP

**Official:** github.com/redis/mcp-redis (Python, uv-based)
- Docker: mcp/redis (official Docker Hub image)

**Setup (Docker — easiest):**
```json
{
  "mcpServers": {
    "redis": {
      "command": "docker",
      "args": ["run", "--rm", "-i",
        "-e", "REDIS_HOST=localhost",
        "-e", "REDIS_PORT=6379",
        "mcp/redis"]
    }
  }
}
```

**Setup (uv):**
```json
{
  "mcpServers": {
    "redis": {
      "command": "uv",
      "args": ["run", "src/main.py"],
      "env": {
        "REDIS_HOST": "localhost",
        "REDIS_PORT": "6379"
      }
    }
  }
}
```

**Env vars:** REDIS_HOST, REDIS_PORT, REDIS_PWD, REDIS_SSL, REDIS_CA_PATH, REDIS_CLUSTER_MODE

**Tools:** string ops (set/get with expiration), hash ops (with vector embeddings), list ops (append/pop), set ops, sorted set ops, pub/sub, streams, scan_keys, scan_all_keys

**Redis cluster support:** Yes
**EntraID auth:** For Azure Managed Redis

**Companion:** redis/mcp-redis-cloud (Redis Cloud API management, separate from data ops)

**Community:** GongRzhe/REDIS-MCP-Server (62 tools, npm: @gongrzhe/server-redis-mcp, TypeScript)

**Docs:** redis.io/docs/latest/integrate/redis-mcp/

**Affiliate potential:** YES — Redis Cloud paid tiers, Redis Enterprise

**Notes for listing:**
- Python/uv-based (not npm) — different install path
- Docker option simplifies things
- Running Redis instance is prerequisite
- Vector embedding support in hash ops is interesting
- Community TypeScript version has 62 tools (vs official which is more focused)
- Cluster mode + EntraID for enterprise
- Setup difficulty: 2-3 (needs Redis running + Python/uv or Docker)

---

## 27. MongoDB MCP

**Official:** github.com/mongodb-js/mongodb-mcp-server
- npm: @mongodb-js/mongodb-mcp-server

**Setup:**
```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mongodb-mcp-server"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017"
      }
    }
  }
}
```

**Atlas-specific env vars:** MDB_MCP_ATLAS_CLIENT_ID, MDB_MCP_ATLAS_CLIENT_SECRET

**Tools (local DB):** connect, find, insert, update, delete, aggregate, create-index, drop-index, collection-schema, export-data

**Tools (Atlas):** atlas-connect-cluster, atlas-create-free-cluster, atlas-create-project, atlas-create-db-user, atlas-create-access-list, atlas-get-performance-advisor, atlas-inspect-cluster

**Configurable:** --readOnly mode, --disabledTools, --confirmationRequiredTools

**Temporary DB users:** Auto-delete after configurable lifetime
**Export cleanup:** Configurable intervals for temp files

**Transports:** stdio (default) OR http

**Logs:** ~/.mongodb/mongodb-mcp/.app-logs (macOS), %LOCALAPPDATA%\mongodb\mongodb-mcp\.app-logs (Windows)

**VS Code extension:** Includes MCP server with auto-setup

**Community:** mongodb-developer/mongodb-mcp-server (read-only), QuantGeekDev/mongo-mcp, kiliczsh/mcp-mongo-server, 1RB/mongo-mcp, mongodb-developer/mcp-mongodb-atlas

**Docs:** mongodb.com/products/tools/mcp-server, mongodb.com/docs/mcp-server/

**Affiliate potential:** YES — MongoDB Atlas paid tiers

**Notes for listing:**
- Clean npx install — straightforward
- Dual personality: local MongoDB vs Atlas cloud management
- Atlas tools can CREATE free clusters and projects — powerful for onboarding
- Read-only mode + confirmation-required tools = safety features
- VS Code extension auto-setup is nice
- Setup difficulty: 2 (MongoDB connection needed, npx is easy though)

---

## 28. Stripe MCP

**Official:** github.com/stripe/ai → @stripe/mcp (npm)
- Remote MCP: https://mcp.stripe.com (OAuth, hosted by Stripe)

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.stripe.com"]
    }
  }
}
```

**Setup (Local):**
```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp", "--api-key=YOUR_STRIPE_SECRET_KEY"]
    }
  }
}
```

**Tool permissions:** Controlled by Restricted API Key (RAK). Create at dashboard.stripe.com/apikeys. Only tools matching the RAK's permissions are exposed.

**Tools:** See docs.stripe.com/mcp for full list. Covers customers, products, payments, subscriptions, invoices, and Stripe documentation search.

**Agent Toolkit:** Broader ecosystem — @stripe/agent-toolkit (Python + TypeScript), @stripe/ai-sdk (Vercel), @stripe/token-meter (metering). MCP server is one piece.

**Skills:** Integration best practices, API upgrade guidance. Framework-specific setups for LangChain, CrewAI, Vercel AI SDK.

**OAuth for remote:** Managed via Stripe Dashboard settings.

**Docs:** docs.stripe.com/mcp, docs.stripe.com/building-with-llms

**Community:** atharvagupta2003/mcp-stripe (Python, basic), hideokamoto/stripe-testing-mcp-tools (test helpers — clocks, bulk customers, subscription testing), CDataSoftware/stripe-mcp-server-by-cdata (JDBC read-only)

**Affiliate potential:** YES — Stripe developer program. Major platform.

**Notes for listing:**
- Remote OAuth version is the clean path
- RAK-based tool permissions is smart security
- Part of a larger AI toolkit ecosystem (not just MCP)
- Testing MCP tools (hideokamoto) are interesting for dev workflows
- NEVER use production keys — always test/restricted keys
- API key goes in args (--api-key=), not env — unusual pattern
- Setup difficulty: 2 (API key needed, but straightforward)

---

## 29. Linear MCP

**Official:** linear.app/docs/mcp — Remote MCP server hosted by Linear
- Remote: https://mcp.linear.app/mcp (OAuth 2.1 with dynamic client registration)
- Also supports SSE: https://mcp.linear.app/sse

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/mcp"]
    }
  }
}
```

**Auth:** OAuth 2.1 flow (browser-based) OR API key via Authorization: Bearer header

**Tools:** Finding, creating, and updating issues, projects, comments. More functionality coming.

**Clients with specific support:** Claude Desktop, Claude Code (`claude mcp add --transport http linear-server https://mcp.linear.app/mcp`), Cursor (install link available), Codex, v0, Windsurf, Zed

**Community implementations (pre-official, still used):**
- jerhadf/linear-mcp-server (npm: @jerhadf/linear-mcp-server, Smithery install)
- dvcrn/mcp-server-linear (npm: mcp-server-linear, multi-workspace support via TOOL_PREFIX)
- tacticlaunch/mcp-linear (npm: @tacticlaunch/mcp-linear)
- geropl/linear-mcp-go (Go, binary releases, read-only by default, --write-access flag)
- mkusaka/mcp-server-linear (npm: @mkusaka/mcp-server-linear, OAuth + API key)
- cline/linear-mcp (Cline-specific)

**Troubleshooting:** `rm -rf ~/.mcp-auth` to clear saved auth. WSL needs special SSE config.

**Affiliate potential:** YES — Linear paid tiers (Standard, Plus, Enterprise)

**Notes for listing:**
- Official remote server is the recommended path now — supersedes all community versions
- OAuth flow is smooth but requires browser interaction
- Multi-workspace support in dvcrn/mcp-server-linear is unique to community version
- Go version (geropl) offers read-only default with explicit write opt-in — nice safety feature
- Many community implementations because official remote MCP came later
- Setup difficulty: 1-2 (remote npx with OAuth is easy, API key also supported)

---

## 30. Jira MCP (Atlassian)

**Official:** github.com/atlassian/atlassian-mcp-server — Remote MCP, Rovo-branded
- Remote: https://mcp.atlassian.com/v1/sse (SSE) OR /mcp (Streamable HTTP, recommended)
- OAuth 2.1 authorization, respects user's existing Jira/Confluence permissions

**Setup (Remote — preferred):**
```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/mcp"]
    }
  }
}
```

**Covers:** Jira + Confluence + Compass (not just Jira)

**25 tools as of June 2025** for Jira and Confluence operations

**Admin controls:** Site/org admins can manage/revoke MCP app access. Domain + IP controls available.

**Best community alternative:** sooperset/mcp-atlassian (pip/uvx)
- Supports BOTH Cloud AND Server/Data Center
- Cloud: JIRA_URL + JIRA_USERNAME + JIRA_API_TOKEN
- Server/DC: JIRA_PERSONAL_TOKEN
- Also covers Confluence
- Active development (OAuth multi-cloud, edit comments, Markdown-to-Jira conversion)
- FastMCP based

**Setup (sooperset — for Server/DC or more control):**
```json
{
  "mcpServers": {
    "mcp-atlassian": {
      "command": "uvx",
      "args": ["mcp-atlassian"],
      "env": {
        "JIRA_URL": "https://your-company.atlassian.net",
        "JIRA_USERNAME": "your.email@company.com",
        "JIRA_API_TOKEN": "your_api_token",
        "CONFLUENCE_URL": "https://your-company.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "your.email@company.com",
        "CONFLUENCE_API_TOKEN": "your_api_token"
      }
    }
  }
}
```

**Other community:**
- aashari/mcp-server-atlassian-jira (TypeScript, 5 generic HTTP tools, TOON format for token savings)
- b1ff/atlassian-dc-mcp (Data Center: Jira + Confluence + Bitbucket, npm packages)
- nguyenvanduocit/jira-mcp (Go, Docker, opinionated dev workflow tools)
- phuc-nt/mcp-atlassian-server (48 features, Agile/sprint support)
- samwang0723/mcp-atlassian (TypeScript, Confluence v2 API, PII filtering)

**Docs:** llms.txt available for AI consumption. Full docs at personal-1d37018d.mintlify.app (sooperset)

**Affiliate potential:** YES — Atlassian paid plans (Standard, Premium, Enterprise)

**Notes for listing:**
- Official = Rovo remote server, Cloud only, OAuth
- sooperset/mcp-atlassian = best community option, supports Server/DC + Cloud
- For Cloud users: official remote is simplest
- For Server/Data Center: sooperset or b1ff
- The Atlassian ecosystem is fragmented — multiple community servers with different strengths
- TOON format in aashari version for token savings is clever
- Sprint/Agile tools vary by implementation
- Setup difficulty: 2 (Cloud + OAuth), 3 (Server/DC + PAT + multiple products)

---

## Summary — Wave 3 Research Complete

| # | Server | Official? | Remote MCP? | Affiliate? | Setup Difficulty |
|---|--------|-----------|-------------|------------|-----------------|
| 21 | Exa | Yes (exa-labs) | Yes | Yes ($49-449/mo) | 2 |
| 22 | Tavily | Yes (tavily-ai) | Yes | Yes (free-$500/mo) | 2 |
| 23 | Sentry | Yes (getsentry) | Yes | Yes (Team/Business) | 2-3 |
| 24 | Grafana | Yes (grafana) | No | Yes (Cloud tiers) | 3 |
| 25 | shadcn/ui | Yes (official CLI) | No | No (open source) | 1-2 |
| 26 | Redis | Yes (redis) | No | Yes (Cloud/Enterprise) | 2-3 |
| 27 | MongoDB | Yes (mongodb-js) | No | Yes (Atlas tiers) | 2 |
| 28 | Stripe | Yes (stripe) | Yes | Yes (dev program) | 2 |
| 29 | Linear | Yes (linear.app) | Yes | Yes (Standard/Plus) | 1-2 |
| 30 | Jira | Yes (atlassian) | Yes | Yes (Standard/Premium) | 2-3 |

**Patterns observed:**
- 7 of 10 have official remote MCP servers (trend toward hosted/OAuth)
- 9 of 10 have affiliate potential (Wave 3 focus on revenue is working)
- All 10 are official or have official implementations
- Community alternatives still matter for: Server/DC support (Jira), multi-workspace (Linear), read-only modes (Linear/Go), broader tool coverage
