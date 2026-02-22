# Wave 4A Research Notes — Servers 31-38
# Compiled: 2026-02-22 ~03:40 UTC
# Status: 8/20 researched. Remaining 12 in wave4b.

---

## 31. MySQL MCP Server
- **NO official MySQL MCP server exists.** Fragmented community ecosystem.
- Best community options:
  - **@benborla29/mcp-server-mysql** — npx install, SSH tunnel support, Claude Code optimized. Most popular community version. Read-only by default with ALLOW_INSERT/UPDATE/DELETE flags.
  - **designcomputer/mysql_mcp_server** — Python/uv install. Older, well-known.
  - **@neverinfamous/mysql-mcp** — 192 tools (!), OAuth 2.1, smart tool filtering, ProxySQL/MySQL Router support. Massively over-engineered for most use cases.
  - **awslabs.mysql-mcp-server** — AWS Aurora MySQL specific, uses RDS Data API. Python/uvx.
- **Verdict: Conditional** — No official server. Community fragmentation. @benborla29 is the safe recommendation.
- GitHub: https://github.com/benborla/mcp-server-mysql
- Stars: ~700 (benborla version)
- Language: TypeScript (benborla) / Python (designcomputer)
- Transport: stdio
- License: MIT
- Setup difficulty: 2-3 (need running MySQL)
- Install: `npx -y @benborla29/mcp-server-mysql`
- Env: MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_DB, ALLOW_INSERT_OPERATION, ALLOW_UPDATE_OPERATION, ALLOW_DELETE_OPERATION
- Affiliate: None (MySQL is open source, but MySQL HeatWave / AWS RDS could work)
- Category: database
- Gotcha: No official backing. Read-only by default (good safety). Many competing implementations make choosing confusing.
- Compatibility: claude_desktop full, cursor full, claude_code full, others untested

---

## 32. Turso MCP Server
- **Official MCP built into Turso CLI** (tursodb binary) — `tursodb your_database.db --mcp`
- Turso = in-process SQL database compatible with SQLite, written in Rust. BETA.
- 9 tools: open_database, current_database, list_tables, describe_table, execute_query (read-only SELECT), insert_data, update_data, delete_data, create_table
- Community alternatives:
  - **nbbaier/mcp-turso** — npx, connects to Turso Cloud hosted LibSQL. Uses TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.
  - **spences10/mcp-turso-cloud** — npx, org-level management + DB queries, vector search, two-level auth (org + db tokens)
- **Verdict: Conditional** — Turso itself is BETA. Good if you're in the SQLite/LibSQL ecosystem. The CLI-integrated MCP is elegant but requires installing the tursodb binary.
- GitHub: https://github.com/tursodatabase/turso (official) / https://github.com/nbbaier/mcp-turso (community cloud)
- Stars: ~3000 (turso main repo) / 6 (mcp-turso)
- Language: Rust (official CLI) / TypeScript (community)
- Transport: stdio
- License: MIT
- Setup difficulty: 2 (official CLI) / 2 (community npx)
- Install (official): `tursodb your_database.db --mcp`
- Install (community cloud): `npx -y mcp-turso`
- Env (community): TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
- Affiliate: Turso pricing (https://turso.tech/pricing)
- Category: database
- Gotcha: Turso itself is BETA software. The CLI MCP is built-in (nice), but requires separate binary install. Community cloud version is more typical npx setup.
- Announced Aug 2025 blog post.

---

## 33. PlanetScale MCP Server
- **Official** — Two paths:
  1. **CLI-integrated**: `pscale mcp server` (Go binary, part of PlanetScale CLI). DEPRECATED in favor of:
  2. **Hosted remote server**: `planetscale/mcp-server` (TypeScript, OAuth authenticated)
- Features: Read-only database access, query execution, schema inspection. Auto replica routing, ephemeral credentials, destructive query protection.
- `pscale mcp install --target <claude|cursor|zed>` for auto-config.
- Claude Code plugin exists: `planetscale/claude-plugin`
- **Verdict: Conditional** — Requires PlanetScale account (paid service). Clean setup with CLI installer. Good for existing PlanetScale users. The hosted OAuth version is the future path.
- GitHub: https://github.com/planetscale/mcp-server
- Stars: ~1 (new repo, just created)
- Language: TypeScript (new) / Go (CLI)
- Transport: stdio (CLI) / streamable-http (hosted)
- License: Apache-2.0
- Setup difficulty: 2
- Install (CLI): `pscale mcp install --target claude` then `pscale mcp server`
- Install (hosted): OAuth via remote URL
- Prerequisites: PlanetScale CLI installed, PlanetScale account
- Affiliate: PlanetScale pricing (https://planetscale.com/pricing)
- Category: database
- Gotcha: CLI version deprecated. Transitioning to hosted OAuth. Read-only by default (safe). Requires PlanetScale subscription.

---

## 34. Prisma MCP Server
- **Official** — Two servers:
  1. **Local**: `npx prisma mcp` (built into Prisma CLI v6.6.0+). Tools: migrate-status, migrate-deploy, studio, schema push, query execution.
  2. **Remote**: `https://mcp.prisma.io/mcp` — Manages Prisma Postgres instances. Tools: CreateBackupTool, CreateConnectionStringTool, CreateRecoveryTool, DeleteDatabaseTool, ListBackupsTool, etc.
- Local = development workflows (migrations, schema, queries). Remote = infrastructure management (provision DBs, backups, connection strings).
- One-click installs for VS Code, Cursor. Claude Code support.
- AI safety guardrails for destructive commands documented.
- **Verdict: Recommended** — Clean dual-server architecture. Local for dev, remote for infrastructure. Built into CLI means zero extra install for Prisma users. Prisma Postgres free tier available.
- GitHub: https://github.com/prisma/mcp
- Stars: ~41.9k (main prisma repo)
- Language: TypeScript
- Transport: stdio (local) / streamable-http (remote)
- License: Apache-2.0
- Setup difficulty: 1 (local) / 2 (remote with Prisma Postgres account)
- Install (local): `npx prisma mcp` or `npx -y prisma mcp`
- Install (remote): URL `https://mcp.prisma.io/mcp`
- Prerequisites: Node.js, Prisma CLI v6.6.0+, supported database
- Affiliate: Prisma Postgres pricing (https://www.prisma.io/pricing)
- Category: database, orm
- Gotcha: Remote server specifically for Prisma Postgres, not generic Postgres. Local server works with any Prisma-supported DB.

---

## 35. GitLab MCP Server
- **THREE paths:**
  1. **GitLab's built-in MCP server** (beta, GitLab 18.6+): `https://<gitlab.example.com>/api/v4/mcp` — OAuth 2.0 Dynamic Client Registration. HTTP transport. No external deps. Supports GitLab.com and Self-Managed.
  2. **Anthropic's reference server**: `@modelcontextprotocol/server-gitlab` — npx, PAT auth. Part of the archived reference servers.
  3. **Community servers**: zereight/gitlab-mcp (feature-rich, 60+ tools, multi-user, read-only mode), mcpland/gitlab-mcp (80+ tools, policy engine), yoda-digital/mcp-gitlab-server (60+ tools).
- GitLab's built-in is the future — no separate server to install, OAuth in browser, respects existing permissions.
- **Verdict: Recommended** — GitLab's built-in MCP (18.6+) is the cleanest path. OAuth 2.0, no deps, self-managed support. The reference server works for older GitLab versions.
- GitHub: https://github.com/modelcontextprotocol/servers-archived (reference) / built into GitLab itself
- Stars: N/A (built into GitLab)
- Language: Ruby (built-in) / TypeScript (reference)
- Transport: http (built-in) / stdio (reference)
- License: Proprietary (GitLab built-in) / MIT (reference)
- Setup difficulty: 1 (built-in with 18.6+) / 2 (reference server)
- Install (built-in): Configure `https://gitlab.com/api/v4/mcp` as HTTP MCP server
- Install (reference): `npx -y @modelcontextprotocol/server-gitlab`
- Env (reference): GITLAB_PERSONAL_ACCESS_TOKEN, GITLAB_API_URL
- Affiliate: GitLab pricing (https://about.gitlab.com/pricing/)
- Category: coding, version-control
- Gotcha: Built-in requires GitLab 18.6+. Reference server is archived (no longer maintained). Community servers fill gaps for older versions.

---

## 36. Git MCP Server
- **Reference server by Anthropic**: `@modelcontextprotocol/server-git`
- Listed as actively maintained reference server (not archived).
- Tools: read, search, and manipulate Git repositories locally.
- Simple: point at a local git repo, Claude can read files, search commits, view diffs.
- **Verdict: Recommended** — Simple, useful, no API keys. Works with any local git repo. Reference quality from Anthropic.
- GitHub: https://github.com/modelcontextprotocol/servers (under src/git)
- Stars: Part of main servers monorepo
- Language: TypeScript
- Transport: stdio
- License: MIT
- Setup difficulty: 1
- Install: `npx -y @modelcontextprotocol/server-git`
- Config: pass repo path as argument
- Affiliate: None
- Category: coding, version-control
- Note: This is distinct from GitLab/GitHub MCPs. Pure local git operations.

---

## 37. Puppeteer MCP Server
- **Reference server by Anthropic**: `@modelcontextprotocol/server-puppeteer`
- NOW ARCHIVED (moved to servers-archived repo). Still works, still on npm.
- Tools: puppeteer_navigate, puppeteer_click, puppeteer_fill, puppeteer_select, puppeteer_hover, puppeteer_evaluate, puppeteer_screenshot
- Customizable via PUPPETEER_LAUNCH_OPTIONS env var (JSON). ALLOW_DANGEROUS flag for custom Chrome paths.
- Docker support included.
- Community variants exist (merajmehrabi, sultannaufal with SSE/HTTP, code-craka with Cloudflare Workers).
- **Verdict: Conditional** — Archived by Anthropic. Still functional but no longer maintained. Playwright MCP is the actively maintained alternative for browser automation. Keep for users who specifically want Puppeteer.
- GitHub: https://github.com/modelcontextprotocol/servers-archived/tree/main/src/puppeteer
- Stars: ~218
- Language: TypeScript
- Transport: stdio
- License: MIT
- Setup difficulty: 2
- Install: `npx -y @modelcontextprotocol/server-puppeteer`
- Env: PUPPETEER_LAUNCH_OPTIONS (optional JSON), ALLOW_DANGEROUS (optional)
- Affiliate: None
- Category: browser-automation
- Gotcha: ARCHIVED. Playwright MCP (already in our listings) is the maintained alternative. Downloads Chromium on first run.

---

## 38. Browserbase MCP Server
- **Official** by Browserbase — cloud browser automation with Stagehand AI SDK.
- Stagehand v3.0: atomic primitives (act, extract, observe) + high-level agent.
- 20-40% faster than previous versions. Shadow DOM + iframe support.
- Requires: BROWSERBASE_API_KEY + BROWSERBASE_PROJECT_ID + model API key (defaults to Gemini, supports Anthropic/OpenAI).
- Nested LLM dependency: Stagehand uses an LLM internally for page understanding.
- Features: navigate, click, type, extract data, screenshots, stealth mode, proxy support, session persistence (contexts), advanced anti-bot.
- Docker and npx install paths.
- **Verdict: Conditional** — Powerful cloud browser automation, but requires Browserbase account (paid) + separate LLM API key for Stagehand. Similar nested-LLM pattern to Sentry. Overkill for simple scraping — best for complex interactive automation.
- GitHub: https://github.com/browserbase/mcp-server-browserbase
- Stars: ~500
- Language: TypeScript
- Transport: stdio, streamable-http
- License: Apache-2.0
- Setup difficulty: 3
- Install: `npx @browserbasehq/mcp-server-browserbase`
- Env: BROWSERBASE_API_KEY, BROWSERBASE_PROJECT_ID, plus model API key
- Affiliate: Browserbase pricing (https://www.browserbase.com/pricing)
- Category: browser-automation, scraping
- Gotcha: Nested LLM dependency (Stagehand uses its own LLM). Paid service. Requires model API key on top of Browserbase key.

---

## DEFERRED TO wave4b-notes.md (12 remaining):
39. Crawl4AI MCP — Community only, no official. Multiple implementations. Self-hosted Firecrawl alternative.
40. Google Workspace MCP — Community (taylorwilsdon), 12 services, 100+ tools. Google announcing official remote MCPs for GCP services. No official Workspace MCP yet.
41. Microsoft 365 MCP
42. Perplexity MCP
43. GPT Researcher MCP
44. Desktop Commander MCP
45. Terraform MCP
46. Vercel MCP
47. Heroku MCP
48. Postman MCP
49. Anthropic MCP
50. Azure MCP

---

## Wave 4A Patterns
- Database category dominance: MySQL, Turso, PlanetScale, Prisma all in this batch
- CLI-integrated MCPs trending: Turso, PlanetScale, Prisma all build MCP into their CLI tools
- Archived reference servers: Puppeteer moved to archived. Playwright is the maintained path.
- GitLab built-in MCP is a significant trend — product-native MCP, no separate server
- Nested LLM patterns continue: Browserbase (Stagehand) joins Sentry in requiring separate LLM keys
- First potential Skip candidate: Puppeteer (archived) or Crawl4AI (fragmented community)
