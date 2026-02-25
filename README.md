# ThruAI MCP Server

**Model Context Protocol server for ThruAI voice agent platform**

Enables AI assistants like Claude, GPT, and custom agents to discover and use ThruAI's voice AI capabilities via the Model Context Protocol (MCP).

> **⚡ Beta Notice:** ThruAI is in active development. The default API endpoint (`api.thru.ai`) may require a custom base URL during beta. Set `THRUAI_BASE_URL` in your environment if needed. [Get early access →](https://thru.ai)


## Features

- 🚀 **Quick Start**: Create a fully configured voice agent with phone number in one command
- 🤖 **Voice Agents**: Full CRUD for AI voice agents (S2S or traditional pipeline)
- 📞 **Outbound Calls**: Make calls from your agents to any phone number
- 📊 **Analytics**: Usage and cost analytics with component breakdown
- 📱 **Telephony**: Search, provision, and assign phone numbers
- 🔄 **Workflows**: Build complex automation with 30+ node types (CRM, calendar, email, sheets, web, social)
- 📢 **Campaigns**: Outbound calling at scale with automated contact management
- 🔔 **Webhooks**: Real-time event notifications (call.completed, transcript.ready, etc.)
- 🛠️ **Custom Tools**: Define webhook-based tools agents invoke during live conversations
- 🎤 **Provider Discovery**: List available LLM/TTS/STT providers, voices, and models
- 💬 **Feedback**: Submit bug reports and feature requests
- 🔍 **Schema Discovery**: Get exact API schemas to prevent field name typos
- 📦 **50+ Tools**: Comprehensive coverage of the entire ThruAI platform
- 🎯 **AI-First**: Designed specifically for AI agent integration

## Installation

### Option 1: Use with npx (Recommended)

No installation required - run directly with npx:

```bash
THRUAI_API_KEY=sk_live_... npx github:mgWellPay/thruai-mcp-server
```

### Option 2: Install globally

```bash
npm install -g github:mgWellPay/thruai-mcp-server
THRUAI_API_KEY=sk_live_... thruai-mcp
```

### Option 3: Install locally

```bash
npm install github:mgWellPay/thruai-mcp-server
```

## Quick Start

### 1. Get your API key

1. Sign up at [thru.ai](https://thru.ai)
2. Navigate to Settings → API Keys
3. Create a new API key (starts with `sk_live_`)

### 2. Configure with Claude Code

Add to your Claude Code config (`~/.config/claude-code/config.json`):

```json
{
  "mcpServers": {
    "thruai": {
      "command": "npx",
      "args": ["github:mgWellPay/thruai-mcp-server"],
      "env": {
        "THRUAI_API_KEY": "sk_live_...",
        "THRUAI_BASE_URL": "https://api.thru.ai"
      }
    }
  }
}
```

### 3. Start using ThruAI tools in Claude

```
User: Create a voice agent that answers customer support questions

Claude: I'll use the quickstart tool to create a fully configured agent with a phone number:

<uses quickstart tool>
{
  "name": "Support Agent",
  "systemPrompt": "You are a helpful customer support agent. Answer questions about our products and help resolve issues.",
  "areaCode": "415"
}

✅ Success! Agent "Support Agent" is ready!

Phone: +1 (415) 555-1234
Agent ID: AGT-abc123

You can now:
• Call +1 (415) 555-1234 to test the agent
• Make outbound calls with make_call tool
• View call history with list_calls tool
```

## Available Tools (50+ Tools)

ThruAI MCP server exposes the FULL platform capability via 50+ tools organized by domain:

### 🚀 Quick Start

#### `quickstart`
**Create agent + phone number in ONE CALL** (Recommended)

Creates a fully configured voice agent with phone number in one command. This is the fastest way to get started.

```typescript
{
  name: string;           // Agent name
  systemPrompt?: string;  // AI instructions
  areaCode?: string;      // Default: "415"
  voice?: string;         // Default: "alloy"
  model?: string;         // Default: "gpt-realtime"
}
```

**Example:**
```
Use quickstart with:
- name: "Sales Agent"
- systemPrompt: "You are a sales agent for Acme Corp. Qualify leads and book demos."
- areaCode: "212"
```

---

### 🤖 Agent Management (6 tools)

#### `create_agent`
Create a voice agent with smart defaults. S2S pipeline recommended for lowest latency.

#### `get_agent`
Get detailed agent configuration and status.

#### `update_agent`
Update agent name, system prompt, voice, or other settings.

#### `delete_agent`
Permanently delete an agent.

#### `list_agents`
List all agents with pagination.

**Example:**
```typescript
{
  page?: number;      // Default: 1
  pageSize?: number;  // Default: 50
}
```

---

### 📞 Calls (3 tools)

#### `make_call`
Make an outbound call from an agent to any phone number.

```typescript
{
  agentId: string;  // AGT-xxxxx
  to: string;       // E.164 format: "+14155551234"
  from?: string;    // Optional: specific number to call from
}
```

#### `list_calls`
List recent calls with filters for agent, status, and date range.

#### `get_call`
Get full call details including transcript, duration, cost, and AI insights.

---

### 📱 Telephony (3 tools)

#### `search_numbers`
Search available phone numbers by area code and country.

```typescript
{
  areaCode?: string;  // e.g., "415", "212"
  country?: string;   // Default: "US"
  limit?: number;     // Default: 10
}
```

#### `provision_number`
Purchase a phone number.

#### `assign_number`
Assign a phone number to an agent for inbound/outbound calling.

---

### 🔄 Workflows (9 tools)

Build complex automation with 30+ node types: CRM, calendar, email, sheets, web, social, logic.

#### `create_workflow`
Create a new workflow with nodes and edges.

#### `get_workflow`
Get workflow details including full DAG definition.

#### `update_workflow`
Update workflow configuration or logic.

#### `delete_workflow`
Delete a workflow.

#### `publish_workflow`
Publish a workflow to make it executable.

#### `unpublish_workflow`
Unpublish to prevent execution during changes.

#### `trigger_workflow`
Manually trigger a workflow execution.

#### `list_workflows`
List all workflows.

#### `list_workflow_executions`
View execution history with status and errors.

---

### 📢 Campaigns (8 tools)

Outbound calling at scale with automated contact management.

#### `create_campaign`
Create a new outbound calling campaign.

#### `get_campaign`
Get campaign details and configuration.

#### `update_campaign`
Update campaign settings.

#### `delete_campaign`
Delete a campaign.

#### `start_campaign`
Start calling contacts in the campaign.

#### `pause_campaign`
Pause an active campaign.

#### `add_campaign_contacts`
Add contacts with phone numbers and metadata.

```typescript
{
  campaignId: string;
  contacts: Array<{
    phoneNumber: string;
    name?: string;
    customData?: Record<string, unknown>;
  }>;
}
```

#### `get_campaign_stats`
Get real-time statistics: queued, in progress, completed, failed, success rate.

#### `list_campaigns`
List all campaigns with status filter.

---

### 🔔 Webhooks (6 tools)

Real-time event notifications for call.completed, transcript.ready, workflow.completed, etc.

#### `create_webhook`
Subscribe to events with HMAC signature verification.

```typescript
{
  url: string;  // HTTPS endpoint
  events: string[];  // ["call.completed", "transcript.ready"]
  secret?: string;  // For HMAC verification
}
```

#### `get_webhook`
Get webhook details.

#### `update_webhook`
Update URL, events, or active status.

#### `delete_webhook`
Delete webhook subscription.

#### `test_webhook`
Send test event to verify configuration.

#### `list_webhook_deliveries`
View delivery attempts with status codes and errors.

#### `list_webhooks`
List all webhook subscriptions.

---

### 🛠️ Custom Tools (6 tools)

Define webhook-based tools that agents invoke during live conversations.

#### `create_tool`
Create a custom tool the agent can call in real-time.

```typescript
{
  name: string;  // Tool name for agent invocation
  description?: string;
  url: string;  // HTTPS endpoint
  parameters?: Record<string, unknown>;  // JSON schema
  timeout?: number;  // 1-30 seconds
}
```

#### `get_tool`
Get tool details and configuration.

#### `update_tool`
Update tool URL, parameters, or timeout.

#### `delete_tool`
Delete a tool (warns if agents reference it).

#### `test_tool`
Test tool with sample payload.

#### `list_tools`
List all custom tools.

---

### 📊 Analytics (2 tools)

Usage and cost analytics with breakdown by component.

#### `get_usage_analytics`
Get call volume, minutes, and transcription usage.

```typescript
{
  startDate?: string;  // ISO 8601
  endDate?: string;
  granularity?: 'day' | 'week' | 'month';
}
```

#### `get_cost_analytics`
Get costs with breakdown by LLM, TTS, STT, and telephony.

---

### 🎤 Providers (3 tools)

Discover available LLM, TTS, and STT providers.

#### `list_providers`
List all providers grouped by type (llm, tts, stt).

#### `list_voices`
List voices for a TTS provider (ElevenLabs, Cartesia, Google).

#### `list_models`
List models for an LLM or STT provider (OpenAI, Anthropic, Groq).

---

### 💬 Feedback (3 tools)

Submit and track bug reports, feature requests, and general feedback.

#### `submit_feedback`
Submit feedback to the ThruAI team.

```typescript
{
  type: 'bug' | 'feature' | 'general';
  subject: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
}
```

#### `get_feedback`
Get feedback details.

#### `list_feedback`
List all feedback submissions.

---

### 🔍 Schema Discovery (1 tool)

#### `get_schemas`
Discover exact API schemas to prevent field name typos. Returns Zod schemas for all endpoints.

## Configuration

### Environment Variables

- **`THRUAI_API_KEY`** (required): Your ThruAI API key from https://thru.ai/settings/api-keys
- **`THRUAI_BASE_URL`** (optional): API base URL (default: `https://api.thru.ai`)

### Claude Code Configuration

**~/.config/claude-code/config.json:**

```json
{
  "mcpServers": {
    "thruai": {
      "command": "npx",
      "args": ["github:mgWellPay/thruai-mcp-server"],
      "env": {
        "THRUAI_API_KEY": "sk_live_your_key_here",
        "THRUAI_BASE_URL": "https://api.thru.ai"
      }
    }
  }
}
```

### Claude Desktop Configuration

**~/Library/Application Support/Claude/claude_desktop_config.json** (macOS)
**%APPDATA%/Claude/claude_desktop_config.json** (Windows)

```json
{
  "mcpServers": {
    "thruai": {
      "command": "npx",
      "args": ["github:mgWellPay/thruai-mcp-server"],
      "env": {
        "THRUAI_API_KEY": "sk_live_your_key_here"
      }
    }
  }
}
```

## Usage Examples

### Example 1: Create a customer support agent

```
User: Create a customer support agent for my SaaS company

Claude: I'll create a fully configured support agent with quickstart:

<uses quickstart>
{
  "name": "SaaS Support Agent",
  "systemPrompt": "You are a helpful customer support agent for [Company]. Help users with: account issues, billing questions, feature explanations, and bug reports. Always be friendly and professional. If you can't solve an issue, offer to escalate to a human agent.",
  "areaCode": "650"
}

✅ Agent ready! Phone: +1 (650) 555-7890
```

### Example 2: Make outbound sales calls

```
User: Call this lead list and qualify them
[+14155551234, +14155552345, +14155553456]

Claude: I'll make outbound calls to each lead:

<uses make_call for each number>

Initiated 3 calls:
1. +14155551234 - Call ID: CALL-abc
2. +14155552345 - Call ID: CALL-def
3. +14155553456 - Call ID: CALL-ghi

I can check the results with list_calls or get_call once they complete.
```

### Example 3: Analyze call transcripts

```
User: Show me the transcripts from yesterday's calls

Claude: <uses list_calls with date filter>

Found 12 completed calls. Here are the highlights:

Call CALL-abc123 (8 min, $0.12):
- Lead: Interested in Enterprise plan
- Next step: Send pricing proposal
- Sentiment: Positive

<uses get_call to fetch full transcripts for analysis>
```

## MCP Resources

MCP resources are read-only data sources that AI agents can query to understand the current state. ThruAI MCP server exposes:

- **thruai://agents** - List of all voice agents
- **thruai://workflows** - List of all workflows
- **thruai://campaigns** - List of all campaigns
- **thruai://webhooks** - List of webhook subscriptions
- **thruai://tools** - List of custom tools
- **thruai://providers** - Available LLM/TTS/STT providers with models and voices
- **thruai://calls/recent** - Recent call history

Resources are automatically refreshed when accessed by the AI agent.

**Usage in Claude:**
```
User: Show me all my agents
Claude: <reads thruai://agents resource>
You have 3 agents:
1. Support Agent (AGT-abc123) - Active
2. Sales Agent (AGT-def456) - Active
3. Demo Agent (AGT-ghi789) - Draft
```

---

## Architecture

This MCP server uses ThruAI's public REST API to:

1. **Authenticate**: Using your API key (Bearer token)
2. **Create resources**: Agents, phone numbers, workflows, campaigns
3. **Initiate calls**: Outbound calling via telephony API
4. **Retrieve data**: Call logs, transcripts, analytics, execution history
5. **Manage webhooks**: Subscribe to real-time events
6. **Define tools**: Custom webhook-based tools for live conversations

All requests go through `https://api.thru.ai/api/v1/public/`.

---

## Upcoming Features

The following features are in development and will be added to the public API soon:

### 🧠 Learning System (Coming Soon)
- **get_agent_analytics**: Performance metrics, sentiment, resolution rates
- **get_recommendations**: AI-generated prompt improvement suggestions
- **create_experiment**: A/B testing for agent configurations

### 📚 Knowledge Base (Coming Soon)
- **crawl_website**: Build knowledge base from website content
- **query_knowledge**: RAG (Retrieval-Augmented Generation) during calls

These features are currently available internally and will be exposed via the public API in a future update.

## Voice Agents Explained

ThruAI voice agents are AI-powered systems that can:

- **Answer calls**: Respond to inbound calls on assigned phone numbers
- **Make calls**: Initiate outbound calls to any phone number
- **Converse naturally**: Use advanced speech-to-speech AI (200-400ms latency)
- **Follow instructions**: Configured via system prompts (like ChatGPT)
- **Take actions**: Integrate with CRMs, calendars, databases via workflows

### Pipeline Modes

**S2S (Speech-to-Speech)** - Recommended:
- Single model handles speech→speech in one step
- Ultra-fast: 200-400ms end-to-end latency
- OpenAI Realtime API (`gpt-4o-realtime`)
- 10 voices: alloy, ash, ballad, coral, echo, sage, shimmer, verse

**Traditional (STT → LLM → TTS)**:
- Three separate steps: Speech-to-Text → Language Model → Text-to-Speech
- Slower: 800-1200ms latency
- More flexible: mix providers (ElevenLabs voice + Claude LLM)
- Use only if you need specific voices not in S2S

## Troubleshooting

### "Authentication failed"

Check your API key:
- Starts with `sk_live_` or `sk_test_`
- Get from https://thru.ai/settings/api-keys
- Set in `THRUAI_API_KEY` environment variable

### "Phone provisioning failed"

Common causes:
1. **No payment method**: Add via https://thru.ai/settings/billing
2. **Area code unavailable**: Try different area code with `search_numbers`
3. **Number limit reached**: Upgrade plan or contact support

### "Agent not found"

Make sure:
- Agent ID format is correct: `AGT-xxxxx`
- Agent belongs to your organization
- Use `list_agents` to see available agents

### MCP server not showing up in Claude

1. Check config file location and syntax
2. Restart Claude Code/Desktop
3. Check stderr output: `npx github:mgWellPay/thruai-mcp-server 2>&1 | tee mcp.log`
4. Verify API key is valid

## Support

- **Documentation**: https://thru.ai/docs
- **API Reference**: https://api.thru.ai/api/v1/public/
- **Issues**: https://github.com/thruai/thruai-mcp-server/issues
- **Email**: support@thru.ai

## License

MIT License - see [LICENSE](LICENSE) file for details

## Links

- **ThruAI Platform**: https://thru.ai
- **API Documentation**: https://thru.ai/docs/api
- **MCP Specification**: https://modelcontextprotocol.io
- **Claude Code**: https://claude.ai/code
