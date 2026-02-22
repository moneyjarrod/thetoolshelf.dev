# Docker MCP - Pre-Research (from S142 session)

## Landscape Assessment
Docker MCP is fragmented — no official server for container management.

### Candidates Found

**1. williajm/mcp_docker** (LEADING)
- GitHub: https://github.com/williajm/mcp_docker
- 33 Docker tools, individually optional via config
- 5 AI prompts (troubleshooting, optimization, networking, security audit)
- 2 resource templates (container logs, stats)
- Three-tier safety: SAFE (read-only), MODERATE (reversible), DESTRUCTIVE
- Transport: stdio + HTTP
- Install: `uvx mcp-docker@latest`
- Has SECURITY.md with threat model (RADE risk from container logs)
- Rate limiting, audit logging for production

**2. ckreiling/mcp-server-docker**
- GitHub: https://github.com/ckreiling/mcp-server-docker
- Simpler, focused on natural language container management
- Demo: WordPress deployment via conversation
- Supports remote Docker engines via SSH
- No --privileged or --cap-add for safety
- Install: `uvx mcp-server-docker`

**3. QuantGeekDev/docker-mcp**
- GitHub: https://github.com/QuantGeekDev/docker-mcp
- Most basic: create container, deploy compose, get logs, list containers
- Self-documented limitations: no volumes, no networks, no health checks
- Python/uv based

### Docker MCP Toolkit (NOT a container management server)
- Docker's MCP Catalog/Toolkit is about running OTHER MCP servers in containers
- It's a management layer, not a "manage Docker containers" server
- Important distinction for the listing

### Verdict Lean
Conditional — williajm/mcp_docker is the best option but it's community-maintained with no official backing. The safety tier system is genuinely good design. Main concern: giving Claude access to Docker socket = giving it root-equivalent access on most Linux systems.

### Setup Difficulty: 3
Need Docker socket access, understand safety implications.
