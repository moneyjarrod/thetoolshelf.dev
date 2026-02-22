# Wave 4B Research Notes — Servers 39-50
# Fieldstone Project: MCP Server Research
# Date: 2026-02-22

---

## 39. Crawl4AI MCP
- **Verdict**: Conditional
- **Official?**: NO official MCP server. Community implementations. Crawl4AI itself = open-source LLM-friendly web crawler by unclecode (59.6k stars).
- **Docker MCP**: Official Docker image includes MCP support: `docker run -d -p 11235:11235 unclecode/crawl4ai:latest` → MCP at `http://localhost:11235/mcp/sse`
- **Tools (Docker)**: md (markdown extraction), screenshot, pdf, execute_js, crawl (batch), links, html
- **Top Community Implementations**:
  - sadiuysal/crawl4ai-mcp-server: 4 tools (scrape, crawl, crawl_site, crawl_sitemap). Docker published image. Adaptive crawling, safety guards.
  - coleam00/mcp-crawl4ai-rag: RAG-focused — Crawl4AI + Supabase vector DB + optional Neo4j knowledge graph. Advanced RAG strategies.
  - luxiaolei/searxng-crawl4ai-mcp: SearXNG + Crawl4AI + Redis stack. 3x faster, 100% scraping reliability.
  - BjornMelin/crawl4ai-mcp-server: Cloudflare Workers deployment, OAuth.
- **Setup**: `claude mcp add c4ai-sse http://localhost:11235/mcp/sse` (after Docker start)
- **Gotcha**: No official MCP server yet (feature request #710). Community fragmentation. Docker image includes MCP but requires separate server running.
- **Affiliate**: None (open source)
- **Category**: scraping, browser-automation

---

## 40. Google Workspace MCP
- **Verdict**: Conditional
- **Official?**: NO official Workspace MCP. Google announced official remote MCPs for GCP services (Dec 2025), but Workspace NOT included.
- **Community Leader**: taylorwilsdon/google_workspace_mcp
  - 12 services: Gmail, Drive, Calendar, Docs, Sheets, Slides, Forms, Tasks, Contacts, Chat, Apps Script, Search
  - 100+ tools
  - OAuth 2.1 multi-user, read-only mode, tool tiers (core/extended/full)
  - CLI mode for Claude Code/Codex
  - Desktop Extensions (.dxt) one-click install
- **Setup**: Download .dxt file and double-click, or `uvx workspace-mcp --transport streamable-http`
- **Env**: GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET (or client_secret.json)
- **Other**: aaronsb/google-workspace-mcp (Gmail, Calendar, Drive, Contacts, Docker, multi-account), ngs/google-mcp-server (Go, Homebrew)
- **Google Official (GCP only)**: Maps Grounding Lite, BigQuery, GKE. Future: Cloud Run, Storage, AlloyDB, Cloud SQL, Spanner, Looker, Pub/Sub.
- **Gotcha**: No official Workspace MCP. Community servers require OAuth setup (create GCP project, enable APIs, generate credentials).
- **Affiliate**: Google Workspace pricing, GCP pricing
- **Category**: productivity, email, documents

---

## 41. Perplexity MCP
- **Verdict**: Recommended
- **Official?**: YES — `@perplexity-ai/mcp-server` by Perplexity AI (github: perplexityai/modelcontextprotocol)
- **Tools (4)**:
  1. search_web — Direct web search via Perplexity Search API
  2. chat — Conversational AI with real-time web search (sonar-pro model)
  3. deep_research — Comprehensive research (sonar-deep-research model)
  4. reason — Advanced reasoning (sonar-reasoning-pro model)
- **Features**: Real-time web search, citations, recency filters (day/week/month/year), domain filtering, academic mode, showThinking parameter
- **Setup**: `npx -y @perplexity-ai/mcp-server`
- **Env**: PERPLEXITY_API_KEY (required)
- **Claude Code**: `claude mcp add perplexity --env PERPLEXITY_API_KEY="your_key" -- npx -y @perplexity-ai/mcp-server`
- **HTTP mode**: `npm run start:http` → `http://localhost:8080/mcp`
- **Community**: jsonallen/perplexity-mcp (Python), DaInfernalCoder/perplexity-mcp (won 1st @ Cline Hackathon), daniel-lxs/mcp-perplexity (persistent chat history)
- **Gotcha**: Requires Perplexity API key (paid). deep_research needs longer timeout (180s recommended).
- **Affiliate**: Perplexity API pricing
- **Category**: search, research, reasoning

---

## 42. Microsoft 365 MCP
- **Verdict**: Conditional
- **Official?**: PARTIAL — Microsoft has official Agent 365 MCP servers (Frontier program, requires M365 Copilot license), plus microsoft/mcp monorepo with multiple servers. No single standalone "M365 MCP server" from Microsoft for general use.
- **Microsoft Official Ecosystem**:
  - microsoft/mcp monorepo: Azure MCP Server, Azure DevOps MCP, Microsoft Foundry MCP, Sentinel MCP, NuGet MCP, Playwright MCP, Markdown MCP, M365 Agents Toolkit MCP
  - Agent 365 MCP Servers (Copilot Studio, Frontier program): Copilot Search, SharePoint/OneDrive, Outlook Mail, Outlook Calendar, Teams, Word, User Profile, Dataverse. Requires full M365 Copilot license.
- **Community Leader**: Softeria/ms-365-mcp-server
  - Graph API integration: Mail, Calendar, Files, Teams, SharePoint
  - OAuth 2.1 + PKCE, read-only mode, HTTP + stdio transport
  - `npx -y @softeria/ms-365-mcp-server --org-mode`
  - China cloud support (21Vianet)
- **Other Community**:
  - pnp/cli-microsoft365-mcp-server: Wraps CLI for Microsoft 365. Natural language → CLI commands. Manages SharePoint, Teams, Entra ID, Power Platform, etc.
  - merill/lokka: Microsoft Graph + Azure RM APIs. Interactive auth, client credentials, certificate auth.
  - DynamicEndpoints/m365-core-mcp: 29 tools, 44 resources, security/compliance/governance. Universal Graph API gateway.
- **Setup (Softeria)**: `npx -y @softeria/ms-365-mcp-server --org-mode` + Azure AD app registration
- **Gotcha**: Fragmented landscape. Official Agent 365 requires Copilot license + Frontier program. Community servers require Azure AD setup.
- **Affiliate**: Microsoft 365 pricing, Azure pricing
- **Category**: productivity, email, documents, enterprise

---

## 43. GPT Researcher MCP
- **Verdict**: Conditional
- **Official?**: YES — dedicated repo `assafelovic/gptr-mcp` by GPT Researcher creator
- **Tools (5)**:
  1. deep_research — Comprehensive web research (~30s, high quality)
  2. quick_search — Fast web search optimized for speed
  3. write_report — Generate report from research results
  4. get_research_sources — Get sources used in research
  5. get_research_context — Get full research context
- **What it is**: Autonomous deep research agent (25.4k stars main repo). Produces factual reports with citations. Multi-agent (STORM-inspired).
- **Requires**: Python 3.10+, OpenAI API key, Tavily API key (or other search provider)
- **Transport**: Auto-detects — STDIO locally, SSE in Docker
- **Setup**: Clone repo → pip install → configure .env → python server.py
- **Docker**: `docker-compose up -d` → SSE at `http://localhost:8000/sse`
- **MCP Client support**: GPTR also acts as MCP CLIENT — can connect to external MCP servers for data sources (`RETRIEVER=tavily,mcp`)
- **Gotcha**: Requires multiple API keys (OpenAI + search provider). ~30s latency for deep research. Nested LLM dependency.
- **Affiliate**: None (OSS), but requires paid API keys
- **Category**: research, search, agents

---

## 44. Desktop Commander MCP
- **Verdict**: Recommended
- **Official?**: Community — wonderwhy-er/DesktopCommanderMCP (5.3k stars). Popular MCP server #34 on PulseMCP.
- **What it does**: Terminal control + filesystem + diff editing. Built on top of MCP Filesystem Server.
- **Key Features**:
  - Execute long-running terminal commands with interactive process control
  - Execute code in memory (Python, Node.js, R) without saving files
  - Native Excel support (read, write, edit, search .xlsx/.xls/.xlsm)
  - PDF support (read, create from markdown, modify)
  - Interact with running processes (SSH, databases, dev servers)
  - Fuzzy search with logging/analytics
  - Docker sandboxing option (zero risk to host)
  - Remote AI Control — use from ChatGPT, Claude web via Remote MCP
- **Install**: `npx @wonderwhy-er/desktop-commander@latest setup`
- **Config**: `{ "mcpServers": { "desktop-commander": { "command": "npx", "args": ["-y", "@wonderwhy-er/desktop-commander@latest"] } } }`
- **Claude Code**: `claude mcp add-json "desktop-commander" '{"command":"npx","args":["-y","@wonderwhy-er/desktop-commander"]}'`
- **Docker**: `bash <(curl -fsSL https://raw.githubusercontent.com/.../install-docker.sh)`
- **Also**: Smithery integration, VS Code extension (MCPB/DXT), debug mode
- **Gotcha**: Community server (not official Anthropic). Windows npx issues resolved in recent updates. ES module compatibility issues reported.
- **Affiliate**: None (open source, donation-supported)
- **Category**: terminal, filesystem, developer-tools

---

## 45. Terraform MCP
- **Verdict**: Recommended
- **Official?**: YES — hashicorp/terraform-mcp-server by HashiCorp. Beta status.
- **What it does**: Integration with Terraform Registry APIs + HCP Terraform/TFE workspace management
- **Tool Categories**:
  - Registry tools: Provider docs, module discovery, policy search
  - HCP TF/TFE tools: Workspace CRUD, variable sets, run management, org/project listing, private registry
  - Destructive tools (disabled by default): Require ENABLE_TF_OPERATIONS=true
- **Transport**: Dual — Stdio + StreamableHTTP
- **Modes**: Stateful (default, session-aware) + Stateless (HA/load balancer)
- **Install Options**:
  - Docker: `docker run -i --rm hashicorp/terraform-mcp-server`
  - Go install: `go install github.com/hashicorp/terraform-mcp-server/cmd/terraform-mcp-server@latest`
  - Prebuilt binaries at releases.hashicorp.com
- **One-click**: VS Code, VS Code Insiders, Cursor badges
- **Security**: CORS strict mode, rate limiting, TLS support, explicit approval for destructive tools
- **Env**: TFE_TOKEN (HCP Terraform auth), TFE_HOSTNAME (Enterprise URL), MCP_ALLOWED_ORIGINS
- **v0.3.0** (Sep 2025): Workspace tools, HCP TF/TFE auth, variable sets, run management, TLS, rate limiting
- **GitHub Copilot integration**: Direct partnership announced at Microsoft Build 2025
- **Gotcha**: Beta status. Destructive ops disabled by default (good). IBM/HashiCorp disclaimers.
- **Affiliate**: HashiCorp Cloud Platform pricing, Terraform Enterprise
- **Category**: infrastructure, devops, IaC

---

## 46. Vercel MCP
- **Verdict**: Recommended
- **Official?**: YES — Vercel official. Remote MCP at https://mcp.vercel.com. Public Beta (Aug 2025).
- **What it does**: Secure OAuth-compliant interface for AI clients to interact with Vercel projects
- **Tool Categories**:
  - Public (no auth): Search Vercel docs
  - Authenticated: Access logs, project metadata, deployment info, environment variables
  - Prompts: Reusable prompt templates
- **Features**: OAuth 2.0, Streamable HTTP, read-only (security-first), allowlisted clients only
- **Supported Clients**: Claude, Claude Desktop, Cursor, VS Code, ChatGPT, Codex
- **Setup (Claude Code)**: `claude mcp add --transport http vercel https://mcp.vercel.com`
- **Setup (Cursor)**: `{ "mcpServers": { "vercel": { "url": "https://mcp.vercel.com" } } }`
- **Vercel also offers**: MCP server HOSTING via `mcp-handler` package (deploy your own MCP servers on Vercel Functions + Fluid compute)
- **Community**: nganiet/mcp-vercel (REST API integration, Docker, full CRUD for deployments/projects)
- **Gotcha**: Read-only for initial launch (security). Allowlisted clients only. Vercel account required for authenticated tools.
- **Affiliate**: Vercel pricing (Pro, Enterprise)
- **Category**: deployment, hosting, developer-tools

---

## 47. Heroku MCP
- **Verdict**: Recommended
- **Official?**: YES — heroku/heroku-mcp-server by Heroku (Salesforce). v1.2.0.
- **Dual modes**:
  1. **STDIO (local)**: `heroku mcp:start` — uses Heroku CLI in REPL mode. Requires CLI v10.8.1+.
  2. **Remote**: https://mcp.heroku.com/mcp — OAuth 2.0 auth. No local install needed.
- **Tool categories**:
  - App lifecycle: deploy, scale, restart, logs, monitoring
  - Database management: Postgres, Redis add-ons
  - Pipeline management
  - One-off dynos: Execute code/commands in sandboxed environment
  - Add-ons management
- **Setup (recommended)**: `heroku mcp:start` (uses existing CLI auth)
- **Config**: `{ "mcpServers": { "heroku": { "command": "heroku", "args": ["mcp:start"] } } }`
- **npx alternative**: `npx -y @heroku/mcp-server` (requires HEROKU_API_KEY env var)
- **Heroku MCP Toolkit**: Deploy your own MCP servers on Heroku. Managed Inference and Agents add-on auto-registers. Scale-to-zero, code isolation, unified URL for multiple servers.
- **Works with**: Claude Desktop, Cursor, Windsurf, Zed, Agentforce (Salesforce)
- **Gotcha**: Early development status noted. Requires Heroku CLI globally installed. Heroku account required.
- **Affiliate**: Heroku pricing
- **Category**: deployment, hosting, PaaS

---

## 48. Postman MCP
- **Verdict**: Recommended
- **Official?**: YES — postmanlabs/postman-mcp-server by Postman. Remote + local.
- **Dual modes**:
  1. **Remote (recommended)**: https://mcp.postman.com — OAuth (MCP spec compliant), no API key needed
  2. **Local**: `npx -y @postmanlabs/postman-mcp-server` — STDIO, requires POSTMAN_API_KEY
- **Tool Configurations**:
  - Minimal (default): Essential tools for basic Postman operations
  - Code: API definition search + client code generation
  - Full: 100+ tools for advanced collaboration and Enterprise features
- **Capabilities**:
  - API Testing: Continuously test API using Postman collections
  - Code synchronization: Keep code in sync with Collections and specs
  - Collection management: Create, tag, document, comment
  - Environment management
  - Workspace management
- **EU Region**: https://mcp.eu.postman.com (API key auth only, no OAuth)
- **MCP Generator**: Generate MCP servers from Postman's 100,000+ public APIs
- **MCP Client**: Postman can also send MCP requests (test/debug MCP servers)
- **Agent Mode (beta)**: Generate MCP servers for internal APIs
- **Setup (Claude Code)**: `claude mcp add --transport http postman https://mcp.postman.com`
- **Gotcha**: Rate limits count toward plan's monthly API calls. EU server doesn't support OAuth.
- **Affiliate**: Postman pricing (Free, Basic, Professional, Enterprise)
- **Category**: api-testing, developer-tools, code-generation

---

## 49. Anthropic MCP (MCP Connector)
- **Verdict**: Recommended (but it's a FEATURE, not a standalone server)
- **What it is**: NOT a standalone MCP server. It's the MCP Connector — a feature in the Anthropic Messages API that lets you connect to ANY remote MCP server without writing client code.
- **API**: `mcp_servers` parameter in Messages API + `mcp_toolset` in tools array
- **Beta header**: `anthropic-beta: mcp-client-2025-11-20`
- **How it works**: Add remote MCP server URL to API request → Anthropic handles connection management, tool discovery, error handling automatically
- **Supports**: OAuth authorization tokens, tool allowlisting/denylisting, per-tool configuration
- **TypeScript SDK helpers**: Convert between MCP types and Claude API types (mcpToolResultToContent, mcpResourceToContent, mcpResourceToFile)
- **Reference servers (maintained by MCP steering group)**:
  - Everything (reference/test), Fetch, Filesystem, Git, Memory, Sequential Thinking, Time
  - Archived: AWS KB Retrieval, Brave Search, Puppeteer, Google Maps, Slack, Postgres, Sentry, GitHub
- **NOTE for Fieldstone**: This entry should probably be about the MCP protocol/SDK/reference servers, not a single "Anthropic MCP server". Consider splitting into: (a) MCP Connector API feature, (b) Reference servers overview.
- **Affiliate**: Anthropic API pricing
- **Category**: protocol, api, meta

---

## 50. Azure MCP
- **Verdict**: Recommended
- **Official?**: YES — Azure MCP Server 1.0 GA. Now lives in microsoft/mcp monorepo (formerly Azure/azure-mcp, archived Aug 2025).
- **What it does**: All Azure MCP tools in a single server. 40+ Azure services. Seamless connection between AI agents and Azure.
- **Install options**:
  - VS Code Extension: ms-azuretools.vscode-azure-mcp-server (one-click)
  - npm: `npx -y @azure/mcp@latest`
  - Docker: available
  - Global: `npm install -g @azure/mcp@latest` (faster startup)
- **Auth**: Entra ID via Azure Identity SDK. RBAC-based permissions.
- **Services covered**: Storage, Compute, Networking, Databases (SQL, Cosmos DB, MySQL), Key Vault, Container Apps, AKS, ACR, Functions, App Service, Service Health, Sentinel, Resource Graph, and many more
- **Prompt Templates**: Set tenant/subscription context once per session
- **Remote hosting**: Azure Container Apps deployment templates for Microsoft Foundry/Copilot Studio
- **Related Microsoft MCP servers**:
  - Azure DevOps MCP (@azure-devops/mcp) — GA, domain scoping, work items/PRs/builds/wiki
  - Microsoft Learn MCP (MicrosoftDocs/mcp) — Free, no auth, docs search + code samples
  - Microsoft Foundry MCP
  - Sentinel MCP (data exploration)
  - NuGet MCP
- **Plugin system**: Azure skills plugin for Copilot CLI and Claude Code
- **Gotcha**: MCP clients can invoke operations based on user's Azure RBAC — autonomous clients may perform destructive actions. Telemetry collection (can disable). Slow startup tip: pin version instead of @latest.
- **Affiliate**: Azure pricing
- **Category**: cloud, infrastructure, devops, enterprise

---

## Wave 4B Patterns

### Vendor-hosted remote MCPs are the new standard
- Vercel: https://mcp.vercel.com
- Heroku: https://mcp.heroku.com/mcp
- Postman: https://mcp.postman.com
- All use OAuth 2.0 + Streamable HTTP

### Microsoft's MCP mono-repo strategy
- microsoft/mcp houses Azure, Azure DevOps, Foundry, Sentinel, NuGet, Playwright, and more
- Azure/azure-mcp archived → consolidated into monorepo
- Agent 365 MCP servers require M365 Copilot license (enterprise gating)

### CLI-integrated MCPs continue
- Heroku: `heroku mcp:start` (CLI-native)
- Terraform: Binary or Docker (HashiCorp official)
- Azure: npm package + VS Code extension

### Nested LLM dependencies
- GPT Researcher requires OpenAI + search provider API keys
- Pattern continues from Browserbase, Sentry in earlier batches

### Platform MCP servers vs Tool MCP servers
- Platform servers (Vercel, Heroku, Azure): Manage YOUR infrastructure
- Tool servers (Postman, Desktop Commander): Augment YOUR workflow
- Research servers (Perplexity, GPT Researcher): Augment YOUR knowledge

### "Anthropic MCP" is a meta-entry
- Not a server — it's the MCP Connector API feature + reference server catalog
- Should be reframed in Fieldstone content

---

## Wave 4 Complete Summary (Servers 31-50)

### Recommended (8):
- 34. Prisma MCP — Official dual-mode, vibe coding
- 35. GitLab MCP — Built-in 18.6+, cleanest path
- 36. Git MCP — Simple, useful, no API keys
- 41. Perplexity MCP — Official, 4 specialized tools
- 44. Desktop Commander MCP — Popular, comprehensive
- 45. Terraform MCP — HashiCorp official, beta
- 46. Vercel MCP — Official remote, OAuth
- 47. Heroku MCP — Official dual-mode, CLI-native
- 48. Postman MCP — Official, OAuth, MCP generator
- 50. Azure MCP — GA, 40+ services

### Conditional (9):
- 31. MySQL MCP — No official, fragmented community
- 32. Turso MCP — Official CLI but Turso itself beta
- 33. PlanetScale MCP — Requires paid account
- 37. Puppeteer MCP — ARCHIVED by Anthropic
- 38. Browserbase MCP — Requires paid account + nested LLM
- 39. Crawl4AI MCP — No official, community fragmented
- 40. Google Workspace MCP — No official Workspace MCP
- 42. Microsoft 365 MCP — Fragmented, Agent 365 requires Copilot license
- 43. GPT Researcher MCP — Requires multiple API keys, nested LLM

### Meta/Reframe (1):
- 49. Anthropic MCP — Not a server, it's the MCP Connector feature + reference servers

---

## Affiliate Opportunities (Wave 4)
- Turso Cloud plans
- PlanetScale pricing
- Prisma Postgres plans
- GitLab pricing
- Browserbase pricing
- Perplexity API pricing
- Google Workspace/GCP pricing
- Microsoft 365/Azure pricing
- HashiCorp Cloud Platform / Terraform Enterprise
- Vercel pricing (Pro, Enterprise)
- Heroku pricing
- Postman pricing
- Anthropic API pricing
- Azure pricing
