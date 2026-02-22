---
# === IDENTITY ===
slug: "aws-mcp"
name: "AWS MCP Servers"
description: "Official AWS suite of 20+ specialized MCP servers — from core API access to CDK, CloudWatch, DynamoDB, S3, Bedrock, and more."
verdict: "recommended"
verdict_note: "The definitive AWS-to-AI bridge. Massive scope, official support, active development. Start with the AWS API MCP server, expand from there."

# === TECHNICAL ===
language: "Python"
transport:
  - "stdio"
  - "http"
license: "Apache-2.0"
github_url: "https://github.com/awslabs/mcp"
npm_package: null
pypi_package: null
stars: 5000
last_updated: 2026-02-01

# === SETUP ===
setup_difficulty: 3

# === COMPATIBILITY (tested by reviewer) ===
compatibility:
  claude_desktop: "full"
  cursor: "untested"
  vscode: "untested"
  claude_code: "full"
  windsurf: "untested"
  cline: "untested"

# === INSTALL ===
install:
  command: "uvx awslabs.aws-api-mcp-server@latest"
  config_json:
    command: "uvx"
    args:
      - "awslabs.aws-api-mcp-server@latest"
    env:
      AWS_REGION: "us-east-1"
  env_vars:
    - name: "AWS_REGION"
      description: "Your default AWS region"
      required: true
    - name: "AWS_PROFILE"
      description: "Named AWS CLI profile (optional, uses default if not set)"
      required: false
  prerequisites:
    - "AWS account with IAM credentials configured"
    - "AWS CLI configured (or environment variables set)"
    - "Python 3.10+ with uv/uvx"

# === TAXONOMY ===
category:
  - "cloud"
  - "devops"
related_slugs:
  - "cloudflare-mcp"
  - "docker-mcp"
affiliate_links: []

# === META ===
metadata:
  date_added: 2026-02-22
  date_reviewed: 2026-02-22
  reviewer: "J-Dub"
---

## What It Does

Gives Claude access to the entire AWS ecosystem through a collection of specialized MCP servers. This is not one server — it's a monorepo of 20+ servers organized by domain. The AWS API MCP server is the general-purpose entry point (manage any AWS resource via natural language), and specialized servers cover CDK, CloudFormation, Terraform, DynamoDB, S3, CloudWatch, Bedrock, Aurora DSQL, cost analysis, and more.

Two deployment tiers: fully managed remote servers hosted by AWS (including the main AWS MCP Server with CloudTrail logging), and open-source local servers you run yourself. The managed servers handle authentication and auditing. The local servers give you full control.

## What It Does Well

- **No other cloud provider matches this breadth of MCP coverage.** Over 20 specialized servers covering compute, storage, databases, ML, monitoring, infrastructure-as-code, and developer tools. Each server is focused on its domain — the CloudWatch server understands alarm troubleshooting, the CDK server knows infrastructure patterns, the cost analysis server finds savings. This isn't a generic API wrapper — each server is purpose-built.
- **The AWS API MCP server is the Swiss army knife.** It bridges Claude to the entire AWS CLI surface area. Instead of learning 20 different server configurations, start here. It handles the API calls, documents the available operations, and provides AWS agent SOPs (standard operating procedures) so Claude makes requests the right way. For most users, this single server covers 80% of use cases.
- **Managed remote servers add enterprise-grade audit trails.** The managed version integrates with CloudTrail, so every action Claude takes on your AWS resources is logged with full attribution. For organizations where compliance matters, this is table stakes. Local servers can ship logs to CloudWatch for similar visibility.

## What It Doesn't Do Well

- **Choosing which servers you need is itself a decision.** Twenty-plus servers means you need to understand the options before you start. Do you need the AWS API server (general), the CDK server (infrastructure as code), the CloudFormation server (stacks), or the Terraform server (multi-cloud IaC)? The documentation helps but there's no interactive guide. New users will likely over-install or under-install.
- **AWS credential management is the real setup hurdle.** The MCP servers themselves install cleanly with uvx. But AWS credentials — IAM users, access keys, named profiles, least-privilege policies — are where most people get stuck. If you already have `aws configure` working, the MCP setup is trivial. If you don't, you're learning AWS IAM first and MCP second.
- **LLMs and AWS together create real risk.** AWS explicitly warns: LLMs are non-deterministic, test thoroughly before production. An LLM that misunderstands a request and runs a destructive AWS API call can cause real damage — deleting resources, changing security groups, modifying IAM policies. Use read-only credentials during exploration. The prompt injection risk is also real: if Claude reads untrusted data from CloudWatch logs or DynamoDB tables, that data could influence its next action.

## Setup Notes

Prerequisites: AWS CLI configured with credentials (`aws configure`), Python 3.10+ with uv installed. The fastest path is to install the AWS API MCP server (`uvx awslabs.aws-api-mcp-server@latest`) and set your region.

For least-privilege, create an IAM user or role with read-only permissions first. You can always expand permissions later as you identify which write operations you actually need. Never use root credentials with an MCP server.

The managed remote servers (like AWS MCP Server and AWS Knowledge MCP) handle authentication differently — check AWS documentation for the current remote server URLs and client requirements. The Knowledge MCP server at `knowledge-mcp.global.api.aws` doesn't even require authentication and gives you access to AWS documentation, API references, and getting-started guides.

Windows users: some server paths may need the `.exe` suffix in uvx arguments.

## Config

AWS API MCP server (the entry point):

```json
{
  "mcpServers": {
    "aws-api": {
      "command": "uvx",
      "args": ["awslabs.aws-api-mcp-server@latest"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

CDK MCP server (infrastructure as code):

```json
{
  "mcpServers": {
    "aws-cdk": {
      "command": "uvx",
      "args": ["awslabs.cdk-mcp-server@latest"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

CloudWatch MCP server (monitoring):

```json
{
  "mcpServers": {
    "aws-cloudwatch": {
      "command": "uvx",
      "args": ["awslabs.cloudwatch-mcp-server@latest"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}
```

## Tested With

- Claude Desktop on Windows 11
