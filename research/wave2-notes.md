# Wave 2 Research Notes

## Status: BATCH A RESEARCHED

Wave 2 from FIRST_50.md (sessions 11-20): Category fillers + comparison pairs
Plus Docker MCP deferred from Wave 1.

---

## Batch A — RESEARCH COMPLETE

### 1. Docker MCP (williajm/mcp_docker)

#### Identity
- GitHub: https://github.com/williajm/mcp_docker
- Package: `mcp-docker` (uvx)
- Language: Python
- License: MIT
- Stars: ~200 (community, not official)
- Last updated: check on write
- Transport: stdio + HTTP

#### What It Does
Community-built MCP server for Docker container management. No official Docker MCP server exists for managing containers — Docker's "MCP Toolkit" is about running OTHER MCP servers inside containers, not managing Docker itself. williajm/mcp_docker is the best community option with 33 tools, 5 AI prompts, and 2 resource templates.

#### Tools (33 total, individually toggleable)
- Container ops: list, create, start, stop, restart, remove, inspect, logs, stats, exec, rename, top, wait, diff, export, attach
- Image ops: list, pull, build, remove, inspect, tag, push, search, history, prune
- Network ops: list, create, remove, inspect, connect, disconnect
- Volume ops: list, create, remove, inspect, prune
- System: info, prune, events, version

#### Three-Tier Safety System
- SAFE: Read-only operations (list, inspect, logs, stats)
- MODERATE: Reversible operations (start, stop, restart, pull)
- DESTRUCTIVE: Irreversible operations (remove, prune, push)

#### Install Config
```json
{
  "mcpServers": {
    "docker": {
      "command": "uvx",
      "args": ["mcp-docker@latest"]
    }
  }
}
```

#### Gotchas
- Requires Docker socket access → root-equivalent on most Linux systems
- No official backing — community maintained
- RADE risk: container logs could contain prompt injection payloads
- Has SECURITY.md with threat model (good sign)
- Rate limiting + audit logging available for production use
- Also see ckreiling/mcp-server-docker (simpler, remote Docker via SSH) and QuantGeekDev/docker-mcp (basic, limited)

#### Verdict Lean
Conditional ⚠️ — Best available option but community-maintained with Docker socket security implications. Three-tier safety is genuinely good design. Main con: no official server exists.

#### Setup Difficulty: 2
Need Docker installed + understand socket access implications. uvx install is clean.

#### Comparison Notes
- vs Docker MCP Toolkit: Toolkit runs OTHER servers in containers. This manages containers themselves.
- vs ckreiling/mcp-server-docker: Simpler but fewer tools, SSH remote support is unique feature
- vs QuantGeekDev/docker-mcp: Most basic, self-documented limitations

---

### 2. Supabase MCP (supabase-community/supabase-mcp)

#### Identity
- GitHub: https://github.com/supabase-community/supabase-mcp
- Package: Remote HTTP server at https://mcp.supabase.com/mcp (primary) or npm `@supabase-community/supabase-mcp` for local
- Language: TypeScript
- License: MIT
- Stars: check on write (supabase-community org)
- Last updated: actively maintained, docs updated Feb 2026
- Transport: HTTP (remote, primary) / stdio (local CLI)

#### What It Does
Official Supabase MCP server connecting AI assistants to Supabase Cloud projects. Manages tables, runs SQL, handles migrations, branches, edge functions, storage, and project configuration. NOT a generic Postgres server — it's Supabase-specific, wrapping both the database and the Supabase Management API.

#### Tools (20+ organized in feature groups)
Feature groups (all default ON except Storage):
- **Account**: list_projects, get_project, create_project, pause/restore_project, list_organizations, confirm_cost
- **Docs**: search_docs (searches Supabase documentation)
- **Database**: list_tables, list_extensions, list_migrations, apply_migration, execute_sql
- **Edge Functions**: deploy_edge_function, list_edge_functions
- **Branching** (requires paid plan): create/list/delete/merge/reset/rebase_branch
- **Storage** (disabled by default): manage buckets and objects
- **Development/Debug**: get_logs, get_typescript_types

#### Key Features
- **OAuth dynamic client registration**: No manual PAT needed for most clients. Browser-based login flow.
- **Read-only mode**: Restricts to read-only Postgres user via `read_only=true` query param
- **Project scoping**: `project_ref=<id>` limits to single project (recommended)
- **Feature groups**: `features=database,docs` to limit available tools
- **Prompt injection protection**: Wraps SQL results in untrusted-data tags
- **Local CLI**: Available at `http://localhost:54321/mcp` with Supabase CLI (limited tools, no OAuth)

#### Install Config (Remote — recommended)
```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true"
    }
  }
}
```

#### Install Config (Local with PAT)
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase-community/supabase-mcp"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "your-pat-here",
        "SUPABASE_PROJECT_REF": "your-project-ref"
      }
    }
  }
}
```

#### Gotchas
- **Two servers exist**: Official (supabase-community/supabase-mcp) vs community PyPI package (supabase-mcp-server by thequery.dev — requires API key from their site). LISTING SHOULD COVER THE OFFICIAL ONE.
- Cloud-only: Connects to Supabase Cloud, NOT self-hosted or local Postgres. Local CLI mode is limited.
- "Never connect to production data" — explicitly in docs. Dev/test only.
- OAuth flow requires browser — won't work in headless/CI without PAT fallback
- Branching features require paid Supabase plan
- Not a replacement for a generic Postgres MCP — this is Supabase platform management
- Client compatibility: Cursor, Claude Desktop, Claude Code, VS Code, Windsurf, Cline all listed

#### Verdict Lean
Recommended ✅ — Official, well-maintained, excellent security posture (read-only default, project scoping, feature groups). The OAuth flow is smooth for supported clients. Limitation: Supabase Cloud only.

#### Setup Difficulty: 2
Remote server = paste URL and login. Local = PAT + env vars. OAuth makes it easier than most.

#### Comparison Notes
- vs Postgres MCP Pro: Supabase = platform management (projects, branches, edge functions, auth). Postgres Pro = raw database DBA tools (explain plans, index tuning, health checks). Different tools for different jobs.
- vs community supabase-mcp-server (PyPI): Official is remote HTTP + OAuth. Community is stdio + requires third-party API key. Go official.

---

### 3. Neon MCP (neondatabase/mcp-server-neon)

#### Identity
- GitHub: https://github.com/neondatabase/mcp-server-neon
- Package: `@neondatabase/mcp-server-neon` (npm) or remote at https://mcp.neon.tech/mcp
- Language: TypeScript (Bun runtime)
- License: MIT
- Stars: check on write
- Last updated: actively maintained, docs current
- Transport: HTTP (remote) / stdio (local)

#### What It Does
Official Neon MCP server for managing serverless Postgres databases. Handles project/branch management, SQL execution, schema migrations with branch-based safety, query performance analysis, and Neon Auth provisioning. Like Supabase, this is platform-specific — not a generic Postgres tool.

#### Tools (20 total)
- **Project management**: list_projects, get_project, create_project, delete_project, list_shared_projects
- **Database ops**: run_sql, run_sql_transaction, list_tables, describe_table_schema, get_database_tables (tree view)
- **Migrations** (branch-based safety): prepare_database_migration (creates temp branch), complete_database_migration (applies to main)
- **Performance**: get_slow_queries (pg_stat_statements), explain_sql_statement, prepare_query_tuning, complete_query_tuning
- **Connection**: get_connection_string
- **Auth**: provision_neon_auth (Stack Auth integration)
- **Docs**: list_docs_resources, get_doc_resource, load_resource

#### Key Features
- **Branch-based migrations**: Migrations run on temporary branch first. LLM tests, then commits to main. Genuinely safer than direct SQL.
- **Query tuning workflow**: Identifies slow queries, suggests optimizations, tests on temp branch before applying
- **Multiple auth methods**: OAuth (remote, no API key needed), API key (remote or local), neonctl init (auto-configures everything)
- **Read-only mode**: `x-read-only: true` header or OAuth scope selection
- **neonctl init**: One-command setup for Cursor/VS Code/Claude Code — installs MCP server + agent skills + VS Code extension
- **Agent skills**: Bundled prompts that teach LLMs Neon best practices

#### Install Config (Remote — OAuth, recommended)
```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.neon.tech/mcp"]
    }
  }
}
```

#### Install Config (Local — API key)
```json
{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "@neondatabase/mcp-server-neon", "start", "YOUR_NEON_API_KEY"]
    }
  }
}
```

#### Install Config (Windows local — may need cmd wrapper)
```json
{
  "mcpServers": {
    "neon": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@neondatabase/mcp-server-neon", "start", "YOUR_NEON_API_KEY"]
    }
  }
}
```

#### Gotchas
- Neon Cloud only — no self-hosted Postgres or local database support
- API key required for local setup (free tier available from neon.com)
- OAuth remote server uses mcp-remote proxy (extra npx dependency)
- Windows users may need cmd wrapper for local install
- "Development and testing only" — same posture as Supabase
- Free tier: 1 project, 0.5 GiB storage, 191.9 compute hours/month
- neonctl init is slick but auto-detects clients — may configure more than you wanted
- Branch-based migration is a standout feature but adds complexity for simple use cases

#### Verdict Lean
Recommended ✅ — Best serverless Postgres MCP experience. Branch-based migrations are a genuine innovation. neonctl init makes setup trivial. Affiliate potential via Neon's paid plans.

#### Setup Difficulty: 1-2
neonctl init = 1 (one command). Manual local = 2 (API key + config). Remote OAuth = 1.

#### Comparison Notes
- vs Supabase MCP: Both are platform-specific cloud Postgres. Supabase = broader platform (auth, storage, edge functions, real-time). Neon = focused on database excellence (branch migrations, query tuning, performance analysis). Neon is leaner, Supabase is broader.
- vs Postgres MCP Pro: Neon = cloud serverless management + migrations. Postgres Pro = local/any Postgres DBA tools. Different targets.
- vs PlanetScale: PlanetScale MCP doesn't exist yet as official server. Neon wins by default for serverless Postgres MCP.

---

## Batch B — RESEARCH COMPLETE

### 4. Firecrawl MCP (firecrawl/firecrawl-mcp-server)

#### Identity
- GitHub: https://github.com/firecrawl/firecrawl-mcp-server
- Package: `firecrawl-mcp` (npm/npx)
- Language: TypeScript
- License: MIT
- Stars: check on write
- Last updated: actively maintained
- Transport: stdio (default) / HTTP streamable

#### What It Does
Official Firecrawl MCP server for AI-powered web scraping, crawling, search, and structured data extraction. Turns websites into clean, LLM-ready markdown or structured JSON. Handles JavaScript rendering, anti-bot friction, retries — all without manual browser scripts or proxies. Also includes browser session management for persistent automation.

#### Tools
- **scrape_url**: Scrape single page → markdown, HTML, or structured JSON via LLM extraction with schema
- **crawl**: Crawl entire site with depth/path filters, returns all pages
- **map**: Generate site map of all URLs (with subdomain support)
- **search**: Web search via Firecrawl's index
- **extract**: Structured data extraction with custom schemas
- **browser_create_session**: Start persistent browser session
- **browser_execute**: Run code (bash/Python/JS) in live browser session
- **browser_list_sessions**: List active sessions
- **browser_close_session**: Close session

#### Install Config
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

#### Remote (no local install)
```json
{
  "mcpServers": {
    "firecrawl": {
      "url": "https://mcp.firecrawl.dev/v2/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

#### Gotchas
- **Requires API key** from firecrawl.dev (free tier: 10 scrapes/min, 5 searches/min, 1 crawl/min)
- Paid plans for heavier usage — costs can sneak up on crawl-heavy workflows
- Credit usage monitoring with configurable warning/critical thresholds
- Self-hosted option available (point FIRECRAWL_API_URL to your instance)
- Windows: may need `cmd /c "set FIRECRAWL_API_KEY=... && npx -y firecrawl-mcp"`
- VS Code JSON schema validation bug can block registration (workaround: disable JSON validation)
- Browser session tools are newer, more experimental

#### Verdict Lean
Recommended ✅ — Best-in-class web scraping for AI workflows. Official, well-documented, broad client support. Free tier is generous enough to evaluate. The structured extraction with schemas is a killer feature.

#### Setup Difficulty: 2
Get API key, paste config, done. Self-hosted adds complexity.

#### Comparison Notes
- vs Fetch MCP (built-in): Fetch is free, zero-config, handles simple page fetches. Firecrawl handles JS rendering, anti-bot, structured extraction, full-site crawls. Fetch = quick reads, Firecrawl = serious scraping.
- vs Playwright MCP: Playwright = browser automation/testing. Firecrawl = data extraction. Different jobs. Firecrawl's browser sessions blur the line slightly.

---

### 5. Playwright MCP (microsoft/playwright-mcp)

#### Identity
- GitHub: https://github.com/microsoft/playwright-mcp
- Package: `@playwright/mcp` (npm/npx)
- Language: TypeScript
- License: Apache-2.0
- Stars: check on write (Microsoft org = high visibility)
- Last updated: very actively maintained, new CLI+SKILLS mode added 2025-2026
- Transport: stdio (default) / HTTP

#### What It Does
Microsoft's official MCP server for browser automation via Playwright. Lets LLMs control web browsers through structured accessibility snapshots (not screenshots). Supports Chromium, Firefox, and WebKit. Primary use cases: E2E testing, form filling, web scraping, general browser automation for AI agents. Built into GitHub Copilot's Coding Agent.

#### Two Modes
1. **Snapshot Mode** (default): Uses accessibility tree — fast, deterministic, no vision model needed
2. **Vision Mode**: Uses screenshots — fallback for when accessibility tree is insufficient

#### Tools (25+ in MCP mode)
- Navigation: browser_navigate, browser_go_back, browser_go_forward, browser_wait
- Interaction: browser_click, browser_type, browser_select, browser_hover, browser_drag
- Forms: browser_fill, browser_check, browser_select_option
- Page info: browser_snapshot, browser_screenshot, browser_get_page_text
- Tabs: browser_new_tab, browser_close_tab, browser_switch_tab
- Files: browser_upload_file, browser_download_file
- Console/Network: browser_console_messages, browser_network_requests
- Code generation: browser_generate_playwright_test

#### Also: CLI+SKILLS Mode (newer, recommended for coding agents)
- Token-efficient alternative to MCP — avoids loading large tool schemas
- `playwright-cli` commands: open, click, type, press, screenshot, etc.
- Better for coding agents balancing browser automation with large codebases
- MCP still recommended for exploratory automation, self-healing tests, long-running workflows

#### Install Config
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

#### Docker
```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--init", "--pull=always", "mcr.microsoft.com/playwright/mcp"]
    }
  }
}
```

#### Gotchas
- **No API key needed** — fully open source, runs locally
- Node.js + npm required
- Headed mode needs display (use --headless for CI/CD)
- Docker mode: headless Chromium only
- Shadow DOM is a known pain point — accessibility tree can miss elements nested in shadow roots
- Microsoft now recommends CLI+SKILLS over MCP for coding agents (token efficiency)
- Extensive config options: --browser, --caps (vision, pdf, devtools), --extension (connect to existing Chrome), --blocked-origins, --allowed-origins
- Authentication/login persistence across sessions is a common challenge

#### Verdict Lean
Recommended ✅ — The standard for AI browser automation. Microsoft-backed, massive community, built into GitHub Copilot. Free, no API key, works everywhere. The CLI+SKILLS evolution shows active investment.

#### Setup Difficulty: 1
`npx @playwright/mcp@latest` — that's it. No keys, no config.

#### Comparison Notes
- vs Firecrawl: Playwright = browser control + testing. Firecrawl = data extraction. Use both if needed.
- vs Puppeteer: Playwright is the successor. Multi-browser, better API, MCP native.
- vs Selenium: Playwright is faster, more reliable, AI-native. Selenium has broader legacy support.

---

### 6. Context7 MCP (upstash/context7)

#### Identity
- GitHub: https://github.com/upstash/context7
- Package: `@upstash/context7-mcp` (npm/npx) or remote at https://mcp.context7.com/mcp
- Language: TypeScript
- License: Apache-2.0
- Stars: check on write
- Last updated: very actively maintained (deployed 15 hours ago per Smithery)
- Transport: stdio (default) / HTTP (remote)

#### What It Does
Fetches up-to-date, version-specific documentation and code examples for libraries/frameworks and injects them directly into LLM prompts. Solves the "hallucinated API" problem — when LLMs generate code using APIs that don't exist or are outdated. Built and maintained by the Upstash team. Community-contributed library index.

#### Tools (2)
- **resolve-library-id**: Takes a library/framework name → returns Context7-compatible library ID. Must be called first.
- **query-docs**: Takes library ID + question → returns relevant documentation snippets and code examples, filtered by topic and version.

#### Key Features
- "use context7" trigger phrase in prompts (or set up auto-invoke rule)
- Version-specific docs (e.g., "Next.js 14 middleware" gets v14 docs)
- Slash syntax for direct library targeting: `/supabase/supabase`
- Free API key from context7.com/dashboard for higher rate limits
- Works without API key for basic usage (lower rate limits)
- Claude Code plugin available with skills, agents, and commands
- OAuth support for remote HTTP connections

#### Install Config (Local)
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

#### Install Config (Remote)
```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

#### Gotchas
- Only 2 tools — simple but limited scope
- Community-contributed library index — coverage varies. Not all libraries indexed.
- "Do not call this tool more than 3 times per question" — built-in rate limiting in tool description
- API backend, parsing engine, and crawling engine are private/closed source (only MCP server is open)
- Quality depends on how well the library's docs were indexed
- No guarantee of accuracy — community-contributed content
- Windows: needs `cmd /c npx -y @upstash/context7-mcp --api-key YOUR_KEY`

#### Verdict Lean
Recommended ✅ — Solves a real, common pain point (outdated docs in LLM context). Dead simple to use. Free. The "use context7" trigger is elegant. Limitation: only as good as the indexed libraries.

#### Setup Difficulty: 1
One npx command + optional API key. Remote option even simpler.

#### Comparison Notes
- vs web search for docs: Context7 returns pre-processed, version-specific, LLM-optimized snippets. Web search returns raw pages with noise.
- vs official docs MCP servers (e.g., Supabase search_docs): Context7 is generic across all indexed libraries. Official servers are deeper but single-platform.
- Unique category: No direct competitor does exactly this for arbitrary libraries.

---

## Batch C — RESEARCH COMPLETE

### 7. Notion MCP (makenotion/notion-mcp-server)

#### Identity
- GitHub: https://github.com/makenotion/notion-mcp-server
- Package: `@notionhq/notion-mcp-server` (npm/npx)
- Language: TypeScript
- License: check on write
- Stars: ~3,900
- Last updated: actively maintained, v2.0.0 migrated to Notion API 2025-09-03
- Transport: stdio (default) / HTTP streamable

#### What It Does
Official Notion MCP server enabling AI tools to read and write Notion pages, databases (now called "data sources" in v2.0.0), comments, and search across workspaces. Designed with optimized token consumption. Notion also offers a hosted remote MCP server with OAuth (no JSON/token fiddling) — and they're prioritizing the remote version going forward.

#### Two Versions
1. **Remote (Notion MCP)**: Hosted by Notion, OAuth setup, one-click install for supported clients. Preferred.
2. **Local (this repo)**: Self-hosted via npx, requires integration token. May be sunsetted.

#### Tools (~19 per OpenTools)
- **search**: Search across all connected pages and databases
- **create-a-page**: Create new pages with markdown content
- **update-page-content**: Edit existing pages in markdown
- **retrieve-a-page**: Get page content and metadata
- **retrieve-a-data-source**: Get schema/properties of a data source (v2.0.0)
- **query-a-data-source**: Query data sources with filters/sorts
- **create-a-data-source-item**: Add items to data sources
- **update-data-source-item**: Update data source items
- **retrieve-a-database**: Get database metadata and data source IDs
- **create-a-comment**: Add comments to pages
- **retrieve-comments**: Get comments from a page
- Plus several more page/block manipulation tools

#### Install Config (Local - Simple)
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_****"
      }
    }
  }
}
```

#### Install Config (Local - Legacy headers format)
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_****\", \"Notion-Version\": \"2025-09-03\"}"
      }
    }
  }
}
```

#### Docker
```json
{
  "mcpServers": {
    "notionApi": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "NOTION_TOKEN", "mcp/notion"],
      "env": {
        "NOTION_TOKEN": "ntn_****"
      }
    }
  }
}
```

#### Gotchas
- **Notion is prioritizing remote MCP** — local repo may be sunsetted. Issues not actively monitored.
- Integration token required: create at notion.so/profile/integrations
- Pages/databases must be explicitly connected to the integration (not automatic)
- Cannot delete databases via MCP (intentional safety limit)
- Security-conscious users should create read-only integration tokens
- v2.0.0 breaking change: database tools renamed to data source tools
- Works with any Notion plan (including free)
- OPENAPI_MCP_HEADERS JSON escaping is error-prone on Windows

#### Verdict Lean
Recommended ✅ — Official, well-designed, token-optimized. The remote OAuth version is the future and the simplest setup. Local version works but may be deprecated.

#### Setup Difficulty: 2 (remote) / 3 (local)
Remote: OAuth click-through. Local: create integration, get token, paste config.

#### Comparison Notes
- vs Obsidian MCP: Notion = cloud-first, collaborative, structured databases. Obsidian = local-first, markdown files, privacy-focused. Different philosophies.
- vs Google Drive: Notion = structured workspace. Drive = file storage. Overlap in docs but different paradigms.

---

### 8. Obsidian MCP (MarkusPfundstein/mcp-obsidian)

#### Identity
- GitHub: https://github.com/MarkusPfundstein/mcp-obsidian
- Package: `mcp-obsidian` (PyPI/uvx)
- Language: Python
- License: MIT
- Stars: check on write
- Last updated: v0.7.5 (active)
- Transport: stdio
- Website: mcp-obsidian.org

#### What It Does
Community MCP server that connects AI assistants to local Obsidian vaults via the Obsidian Local REST API community plugin. Read, search, modify, and manage notes from outside Obsidian. Fully local — no cloud sync, no data leaves your machine.

#### Dependency
Requires the **Obsidian Local REST API** community plugin (https://github.com/coddingtonbear/obsidian-local-rest-api) installed and enabled in your vault. Obsidian must be running.

#### Tools (7)
- **list_files_in_vault**: List all files/dirs in vault root
- **list_files_in_dir**: List files/dirs in a specific directory
- **get_file_contents**: Read content of a single file
- **search**: Full-text search across all vault files (v0.7.5: also matches filenames)
- **patch_content**: Insert content relative to heading, block reference, or frontmatter
- **append_content**: Append to new or existing file
- **delete_file**: Delete a file or directory

#### Install Config
```json
{
  "mcpServers": {
    "mcp-obsidian": {
      "command": "uvx",
      "args": ["mcp-obsidian"],
      "env": {
        "OBSIDIAN_API_KEY": "<your_api_key>",
        "OBSIDIAN_HOST": "127.0.0.1",
        "OBSIDIAN_PORT": "27124"
      }
    }
  }
}
```

#### Gotchas
- **Obsidian must be running** — REST API plugin serves from the running app
- Community-maintained, not official Obsidian
- Requires both Python/uv AND the Obsidian REST API plugin — two-step dependency
- API key from REST API plugin settings
- Default host 127.0.0.1, port 27124
- Hidden directories now filtered from listings (v0.7.5)
- `uvx` path detection can fail — may need full path to uvx binary
- Multiple alternative servers exist (see below)

#### Alternative Obsidian MCP Servers
- **jacksteamdev/obsidian-mcp-tools**: Obsidian plugin approach with semantic search, Templater support. More feature-rich but different architecture (plugin, not standalone).
- **StevenStavrakis/obsidian-mcp**: npx-based, direct filesystem access, no REST API needed. Obsidian doesn't need to be running.
- **bitbonsai/mcp-obsidian (@mauricio.wolff/mcp-obsidian)**: npx-based, safe frontmatter parsing, 11 methods.
- **cyanheads/obsidian-mcp-server**: Advanced version with NetworkX graph analysis, vault structure discovery, Dataview integration.

#### Verdict Lean
Conditional ⚠️ — Best-known Obsidian MCP but community-maintained with a two-step dependency chain. The requirement for Obsidian to be running limits some use cases. Listing should note the ecosystem of alternatives.

#### Setup Difficulty: 3
Install Obsidian REST API plugin → get API key → install Python/uv → configure MCP. Two moving parts.

#### Comparison Notes
- vs Notion MCP: Obsidian = local files, markdown, privacy. Notion = cloud, structured, collaborative. Obsidian users specifically chose local-first.
- vs filesystem MCP: filesystem MCP reads any files. Obsidian MCP adds vault-aware search, heading-relative patching, frontmatter awareness.
- Fragmented ecosystem: 4+ Obsidian MCP servers with different approaches. We're listing the most established.

---

### 9. Google Drive MCP (modelcontextprotocol/gdrive → ecosystem)

#### Identity
- Original reference: modelcontextprotocol/servers (gdrive module) — Anthropic reference implementation
- Active maintained fork: https://github.com/isaacphi/mcp-gdrive (most referenced)
- Broader option: https://github.com/piotr-agier/google-drive-mcp (Drive + Docs + Sheets + Slides)
- Google Workspace all-in-one: https://github.com/taylorwilsdon/google_workspace_mcp
- Google official remote MCP: announced Dec 2025 for all Google services
- Language: TypeScript (isaacphi) / Python (workspace)
- License: MIT
- Transport: stdio

#### What It Does
Connects AI assistants to Google Drive for file search, listing, reading, and (in some versions) writing. The ecosystem ranges from basic read-only Drive access to full Google Workspace integration (Drive + Docs + Sheets + Slides + Gmail + Calendar).

#### Tools (varies by implementation)
**isaacphi/mcp-gdrive (focused):**
- **search**: Search files in Google Drive
- **read_file**: Read file contents by ID
- **read_spreadsheet**: Read Google Sheets data with range/sheet options
- **write_spreadsheet**: Write data to Google Sheets

**piotr-agier/google-drive-mcp (broader):**
- File CRUD: create, update, delete, rename, move
- Folder navigation with path support
- Google Docs, Sheets, Slides support
- Shared Drives support
- Advanced search

**Google official remote (Dec 2025):**
- Fully managed, no local install
- OAuth-based
- Covers Drive + other Google services
- Still rolling out incrementally

#### Install Config (isaacphi — most common)
```json
{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@isaacphi/mcp-gdrive"],
      "env": {
        "CLIENT_ID": "<CLIENT_ID>",
        "CLIENT_SECRET": "<CLIENT_SECRET>",
        "GDRIVE_CREDS_DIR": "/path/to/config/directory"
      }
    }
  }
}
```

#### Gotchas
- **Google Cloud Console setup required** — create OAuth app, download credentials, configure consent screen. This is the #1 friction point.
- Browser-based auth flow on first run
- Must authenticate with account in same org as GCP project
- Fragmented ecosystem: multiple competing implementations, no single "official" community standard
- Google announced official remote MCP (Dec 2025) which may obsolete community servers
- Read-heavy by default — write capabilities vary by implementation
- OAuth token refresh can be finicky

#### Verdict Lean
Conditional ⚠️ — Useful but painful setup due to Google Cloud Console OAuth requirements. Fragmented ecosystem with no clear winner. Google's own remote MCP server (announced Dec 2025) may become the definitive answer. Listing should cover the ecosystem and point toward Google's official option.

#### Setup Difficulty: 4
Google Cloud Console → create project → enable APIs → create OAuth credentials → download JSON → configure MCP → browser auth. Multi-step.

#### Comparison Notes
- vs Notion MCP: Notion = structured workspace. Drive = file storage and docs. Different paradigms.
- vs Obsidian MCP: Drive = cloud. Obsidian = local. No overlap.
- Google's official remote MCP will likely be the recommended path once fully available.

---

## Batch D — RESEARCH COMPLETE

### 10. AWS MCP (awslabs/mcp)

#### Identity
- GitHub: https://github.com/awslabs/mcp (monorepo with 20+ MCP servers)
- Docs: https://awslabs.github.io/mcp/
- Language: Python (most servers)
- License: Apache-2.0
- Stars: check on write
- Last updated: very actively maintained
- Transport: stdio (local) / HTTP (remote managed servers)

#### What It Does
AWS's official suite of MCP servers spanning the entire AWS ecosystem. NOT a single server — it's a **collection of specialized servers** organized by domain. Includes both open-source local servers and fully managed remote servers hosted by AWS.

#### Architecture: Not One Server, Many
**Essential (AWS-managed remote):**
- **AWS MCP Server**: Comprehensive AWS API support + docs + Agent SOPs + CloudTrail logging. The "start here" option.
- **AWS Knowledge MCP**: Docs, API refs, What's New, Getting Started info. No auth needed.

**Core (open-source local):**
- **aws-api-mcp-server**: AWS CLI bridge — manage any AWS resource via natural language
- **aws-documentation-mcp-server**: Search/read AWS docs, recommendations

**Infrastructure:**
- **cdk-mcp-server**: CDK infrastructure-as-code
- **cfn-mcp-server**: CloudFormation
- **terraform-mcp-server**: Terraform on AWS
- **cloudcontrol-mcp-server**: CRUDL for 1200+ AWS resources via Cloud Control API

**Data & Analytics:**
- **aurora-dsql-mcp-server**: Aurora DSQL
- **dynamodb-mcp-server**: DynamoDB
- **elasticache-mcp-server**: ElastiCache
- **s3-mcp-server**: S3 operations

**AI & ML:**
- **bedrock-mcp-server**: Bedrock
- **knowledge-bases-retrieval-mcp-server**: Knowledge bases

**Monitoring:**
- **cloudwatch-mcp-server**: Alarm troubleshooting, log analysis, metric definitions
- **cost-analysis-mcp-server**: Cost optimization

**Plus:** Lambda handler library, SNS/SQS, Step Functions, Location, HealthLake, and more.

#### Install Config (AWS API — the core local server)
```json
{
  "mcpServers": {
    "awslabs.aws-api-mcp-server": {
      "command": "uvx",
      "args": ["awslabs.aws-api-mcp-server@latest"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

#### Install Config (Knowledge MCP — remote, no auth)
Check client support for remote servers. URL: `https://knowledge-mcp.global.api.aws`

#### Gotchas
- **Not a single server** — choosing which servers you need is itself a decision
- AWS credentials must be properly configured (IAM profiles, least-privilege)
- Python 3.10+ and uv required for local servers
- LLMs are non-deterministic — AWS explicitly warns to test thoroughly before production
- Prompt injection risk with untrusted data (CloudWatch logs, user content in databases)
- Managed remote servers require client support for remote MCP
- Local servers write logs that can be shipped to CloudWatch
- Some servers (CloudWatch) have additional plugin requirements
- Windows: use `.exe` suffix in args path

#### Verdict Lean
Recommended ✅ — The definitive AWS-to-AI bridge. Massive scope, official support, active development. The challenge is complexity — users need guidance on which servers to start with. Listing should focus on the AWS API MCP server as the entry point.

#### Setup Difficulty: 3
AWS credentials + Python/uv + config. AWS credential setup is the main hurdle.

#### Comparison Notes
- vs Cloudflare MCP: AWS = broad cloud infrastructure (compute, storage, databases, ML, everything). Cloudflare = edge/CDN/Workers focused. Different scale.
- vs Terraform MCP: AWS includes its own Terraform MCP server. Different layer — AWS MCP talks to AWS APIs, Terraform MCP talks to Terraform.
- Unique: No other cloud provider has this breadth of MCP coverage.

---

### 11. Cloudflare MCP (cloudflare/mcp-server-cloudflare)

#### Identity
- GitHub: https://github.com/cloudflare/mcp-server-cloudflare
- Docs: https://developers.cloudflare.com/agents/model-context-protocol/
- Language: TypeScript (Cloudflare Workers)
- License: check on write
- Stars: check on write
- Last updated: actively maintained
- Transport: HTTP streamable (remote, primary) / SSE (deprecated)

#### What It Does
Cloudflare's official catalog of **managed remote MCP servers** for managing Cloudflare services. Connect via OAuth from any MCP client. Covers Workers development, KV/R2/D1 storage, DNS/CDN configuration, security settings, and more. All servers run on Cloudflare's edge infrastructure.

#### Architecture: Multiple Managed Servers
- **Workers Bindings MCP**: 25 tools for managing Workers, KV stores, R2 buckets, D1 databases. The primary "builder" server.
- **Cloudflare API MCP**: DNS, CDN, security configuration management
- **AutoRAG MCP**: Document retrieval and contextual AI
- **AI Gateway MCP**: Visibility and control over AI apps
- Additional servers for specific Cloudflare products

#### Key Tools (Workers Bindings — 25 tools)
- Account management: list accounts, set active account
- Workers: create, deploy, update, delete Workers
- KV: create/list namespaces, get/put/delete keys
- R2: create/list buckets, manage objects
- D1: create databases, run queries
- Configuration and bindings management

#### Install Config (Remote — primary method)
If client supports remote MCP:
- URL: provided per-server at developers.cloudflare.com
- Auth: OAuth (automatic)

If client doesn't support remote:
```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://[server-url].workers.dev/mcp"]
    }
  }
}
```

#### Also: workers-mcp (Build Your Own)
- https://github.com/cloudflare/workers-mcp
- Framework for building custom MCP servers on Cloudflare Workers
- TypeScript methods → MCP tools automatically
- Deploy to edge, connect from any client

#### Gotchas
- **Remote-first** — most servers are managed remote, not local install
- OAuth required — authenticates against your Cloudflare account
- Clients without remote MCP support need `mcp-remote` npm proxy
- Cloudflare account required (free tier available)
- Workers Bindings MCP is the primary server for development workflows
- `workers-mcp` (build-your-own) is legacy — Cloudflare now recommends building remote MCP servers directly
- MCP Server Portals (open beta) for enterprise: centralize, secure, observe MCP connections
- SSE transport deprecated in favor of streamable HTTP

#### Verdict Lean
Recommended ✅ — Official, managed, OAuth-based. Zero local install if client supports remote MCP. Perfect for Cloudflare-centric workflows. The Workers Bindings server enables full-stack app deployment from natural language.

#### Setup Difficulty: 2
OAuth click-through if client supports remote. Add mcp-remote proxy if not.

#### Comparison Notes
- vs AWS MCP: Cloudflare = edge/CDN/Workers/serverless focused. AWS = full cloud infrastructure. Cloudflare is simpler, more focused. AWS is broader.
- vs Vercel/Netlify: Cloudflare has official MCP. Others are community-built.
- Unique: Remote-first architecture. Most MCP servers are local-first — Cloudflare leans into managed remote.

---

## All Batches Complete — Ready for Writing Phase
