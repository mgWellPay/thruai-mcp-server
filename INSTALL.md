# Installing @thruai/mcp-server

## Option 1: npm (when published)
```bash
npm install -g @thruai/mcp-server
```

## Option 2: Install from GitHub
```bash
git clone https://github.com/thruai/mcp-server.git
cd mcp-server
npm install
npm run build
```

## Option 3: Install from source (monorepo)
```bash
git clone https://github.com/mgWellPay/ThruAI-Prod.git
cd ThruAI-Prod/packages/mcp-server
npm install
npm run build
```

## Configuration

Set your ThruAI API key:
```bash
export THRUAI_API_KEY=your_api_key_here
export THRUAI_BASE_URL=https://api.thru.ai  # optional, defaults to this
```

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "thruai": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "THRUAI_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Usage with Claude Code

Add to your `.claude/settings.json`:
```json
{
  "mcpServers": {
    "thruai": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "THRUAI_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

50+ tools across these categories:
- **Agents** — create, update, list, quickstart
- **Calls** — make outbound calls, list calls, get transcripts
- **Telephony** — search/provision/assign phone numbers
- **Workflows** — create, list, execute, get status
- **Knowledge** — crawl websites, query RAG
- **Campaigns** — create and manage outbound campaigns
- **Learning** — analytics, recommendations, experiments
- **Webhooks** — subscribe to events
- **Providers** — discover LLM/TTS/STT models and voices
- **Schemas** — discover API schemas

## Get an API Key

```bash
# 1. Provision account
curl -X POST https://api.thru.ai/api/v1/public/accounts/provision \
  -H "Content-Type: application/json" \
  -d '{"email": "you@company.com", "organizationName": "My Company"}'

# 2. Verify email
curl -X POST https://api.thru.ai/api/v1/public/accounts/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "you@company.com", "code": "123456"}'

# API key returned in response
```
