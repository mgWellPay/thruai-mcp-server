/**
 * ThruAI MCP Resources
 *
 * Resources provide read-only access to platform data that AI agents can query.
 * Resources are like "files" that agents can read to understand the current state.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ThruAIClient } from './api-client.js';

export function registerResources(server: McpServer, client: ThruAIClient): void {
  // Resource: thruai://agents
  // Lists all agents in the organization
  server.resource(
    'agents',
    'thruai://agents',
    { description: 'List of all voice agents' },
    async () => {
      const result = await client.listAgents({ pageSize: 100 });
      return {
        contents: [
          {
            uri: 'thruai://agents',
            text: JSON.stringify(result.agents, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://workflows
  // Lists all workflows in the organization
  server.resource(
    'workflows',
    'thruai://workflows',
    { description: 'List of all workflows' },
    async () => {
      const result = await client.listWorkflows({ pageSize: 100 });
      return {
        contents: [
          {
            uri: 'thruai://workflows',
            text: JSON.stringify(result.workflows, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://providers
  // Lists all available LLM/TTS/STT providers
  server.resource(
    'providers',
    'thruai://providers',
    { description: 'Available LLM, TTS, and STT providers with their models and voices' },
    async () => {
      const result = await client.listProviders();
      return {
        contents: [
          {
            uri: 'thruai://providers',
            text: JSON.stringify(result.providers, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://campaigns
  // Lists all campaigns
  server.resource(
    'campaigns',
    'thruai://campaigns',
    { description: 'List of all outbound calling campaigns' },
    async () => {
      const result = await client.listCampaigns({ pageSize: 100 });
      return {
        contents: [
          {
            uri: 'thruai://campaigns',
            text: JSON.stringify(result.campaigns, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://webhooks
  // Lists all webhook subscriptions
  server.resource(
    'webhooks',
    'thruai://webhooks',
    { description: 'List of all webhook subscriptions' },
    async () => {
      const result = await client.listWebhooks({ pageSize: 100 });
      return {
        contents: [
          {
            uri: 'thruai://webhooks',
            text: JSON.stringify(result.webhooks, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://tools
  // Lists all custom tools
  server.resource(
    'custom-tools',
    'thruai://tools',
    { description: 'List of all custom webhook-based tools' },
    async () => {
      const result = await client.listTools({ pageSize: 100 });
      return {
        contents: [
          {
            uri: 'thruai://tools',
            text: JSON.stringify(result.tools, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );

  // Resource: thruai://calls/recent
  // Lists recent calls
  server.resource(
    'recent-calls',
    'thruai://calls/recent',
    { description: 'Recent call history' },
    async () => {
      const result = await client.listCalls({ pageSize: 50 });
      return {
        contents: [
          {
            uri: 'thruai://calls/recent',
            text: JSON.stringify(result.calls, null, 2),
            mimeType: 'application/json',
          },
        ],
      };
    }
  );
}
