/**
 * ThruAI MCP Tools
 *
 * MCP tool definitions for interacting with ThruAI voice agent platform.
 */

import { z } from 'zod';
import { ThruAIClient } from './api-client.js';

// Input schemas
const createAgentSchema = z.object({
  name: z.string().min(1).describe('Name of the voice agent'),
  systemPrompt: z.string().optional().describe('Instructions for the AI agent (what it should say, how it should behave)'),
  description: z.string().optional().describe('Brief description of what this agent does'),
  pipelineMode: z.enum(['s2s', 'traditional']).optional().default('s2s').describe('Pipeline mode: "s2s" for Speech-to-Speech (recommended, lower latency) or "traditional" for STT→LLM→TTS'),
  s2sVoice: z.string().optional().default('alloy').describe('Voice for S2S mode. Options: alloy, ash, ballad, coral, echo, sage, shimmer, verse'),
});

const quickstartSchema = z.object({
  name: z.string().min(1).describe('Name of the voice agent'),
  systemPrompt: z.string().optional().describe('Instructions for the AI agent (what it should say, how it should behave)'),
  areaCode: z.string().optional().default('415').describe('Area code for phone number (e.g., "415", "212", "650")'),
  voice: z.string().optional().default('alloy').describe('Voice for the agent. Options: alloy, ash, ballad, coral, echo, sage, shimmer, verse'),
  model: z.string().optional().default('gpt-realtime').describe('AI model to use (default: gpt-realtime)'),
});

const makeCallSchema = z.object({
  agentId: z.string().describe('ID of the agent to make the call (format: AGT-xxxxx)'),
  to: z.string().describe('Phone number to call in E.164 format (e.g., "+14155551234")'),
  from: z.string().optional().describe('Phone number to call from (must be assigned to the agent). If not provided, uses the agent\'s default number.'),
});

const listAgentsSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of agents per page'),
});

const listCallsSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of calls per page'),
  agentId: z.string().optional().describe('Filter by agent ID'),
  status: z.string().optional().describe('Filter by call status (e.g., "completed", "failed")'),
});

const getCallSchema = z.object({
  callId: z.string().describe('ID of the call to retrieve (format: CALL-xxxxx)'),
});

const searchNumbersSchema = z.object({
  areaCode: z.string().optional().describe('Area code to search (e.g., "415", "212")'),
  country: z.string().optional().default('US').describe('Country code (default: US)'),
  limit: z.number().optional().default(10).describe('Maximum number of results'),
});

const provisionNumberSchema = z.object({
  phoneNumber: z.string().describe('Phone number to provision in E.164 format (e.g., "+14155551234")'),
  friendlyName: z.string().optional().describe('Friendly name for the number (e.g., "Support Line")'),
});

const assignNumberSchema = z.object({
  agentId: z.string().describe('ID of the agent to assign the number to (format: AGT-xxxxx)'),
  phoneNumberId: z.string().describe('ID of the phone number to assign (format: TEL-xxxxx)'),
});

const getAgentSchema = z.object({
  agentId: z.string().describe('ID of the agent to retrieve (format: AGT-xxxxx)'),
});

const updateAgentSchema = z.object({
  agentId: z.string().describe('ID of the agent to update (format: AGT-xxxxx)'),
  name: z.string().optional().describe('New name for the agent'),
  systemPrompt: z.string().optional().describe('New system prompt with AI instructions'),
  description: z.string().optional().describe('New description'),
  status: z.string().optional().describe('New status'),
});

const deleteAgentSchema = z.object({
  agentId: z.string().describe('ID of the agent to delete (format: AGT-xxxxx)'),
});

// Workflow schemas
const listWorkflowsSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of workflows per page'),
});

const getWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to retrieve (format: WFL-xxxxx)'),
});

const createWorkflowSchema = z.object({
  name: z.string().min(1).describe('Name of the workflow'),
  description: z.string().optional().describe('Description of what the workflow does'),
  nodes: z.array(z.any()).optional().describe('Array of workflow nodes (handlers)'),
  edges: z.array(z.any()).optional().describe('Array of workflow edges (connections)'),
});

const updateWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to update (format: WFL-xxxxx)'),
  name: z.string().optional().describe('New name'),
  description: z.string().optional().describe('New description'),
  nodes: z.array(z.any()).optional().describe('Updated nodes'),
  edges: z.array(z.any()).optional().describe('Updated edges'),
});

const deleteWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to delete (format: WFL-xxxxx)'),
});

const publishWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to publish (format: WFL-xxxxx)'),
});

const unpublishWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to unpublish (format: WFL-xxxxx)'),
});

const triggerWorkflowSchema = z.object({
  workflowId: z.string().describe('ID of the workflow to trigger (format: WFL-xxxxx)'),
  input: z.record(z.any()).optional().describe('Input data for the workflow execution'),
});

const listWorkflowExecutionsSchema = z.object({
  workflowId: z.string().describe('ID of the workflow (format: WFL-xxxxx)'),
  page: z.number().optional().default(1).describe('Page number'),
  pageSize: z.number().optional().default(50).describe('Results per page'),
});

// Campaign schemas
const listCampaignsSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of campaigns per page'),
  status: z.string().optional().describe('Filter by status'),
});

const getCampaignSchema = z.object({
  campaignId: z.string().describe('ID of the campaign to retrieve (format: CMP-xxxxx)'),
});

const createCampaignSchema = z.object({
  name: z.string().min(1).describe('Name of the campaign'),
  description: z.string().optional().describe('Description of the campaign'),
  agentId: z.string().optional().describe('Agent to use for calls (format: AGT-xxxxx)'),
  workflowId: z.string().optional().describe('Workflow to execute for each contact (format: WFL-xxxxx)'),
});

const updateCampaignSchema = z.object({
  campaignId: z.string().describe('ID of the campaign to update (format: CMP-xxxxx)'),
  name: z.string().optional().describe('New name'),
  description: z.string().optional().describe('New description'),
  status: z.string().optional().describe('New status'),
});

const deleteCampaignSchema = z.object({
  campaignId: z.string().describe('ID of the campaign to delete (format: CMP-xxxxx)'),
});

const startCampaignSchema = z.object({
  campaignId: z.string().describe('ID of the campaign to start (format: CMP-xxxxx)'),
});

const pauseCampaignSchema = z.object({
  campaignId: z.string().describe('ID of the campaign to pause (format: CMP-xxxxx)'),
});

const addCampaignContactsSchema = z.object({
  campaignId: z.string().describe('ID of the campaign (format: CMP-xxxxx)'),
  contacts: z.array(z.object({
    phoneNumber: z.string().describe('Phone number in E.164 format'),
    name: z.string().optional().describe('Contact name'),
    customData: z.record(z.any()).optional().describe('Custom data for this contact'),
  })).describe('Array of contacts to add to the campaign'),
});

const getCampaignStatsSchema = z.object({
  campaignId: z.string().describe('ID of the campaign (format: CMP-xxxxx)'),
});

// Webhook schemas
const listWebhooksSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of webhooks per page'),
});

const getWebhookSchema = z.object({
  webhookId: z.string().describe('ID of the webhook to retrieve (format: WHK-xxxxx)'),
});

const createWebhookSchema = z.object({
  url: z.string().url().describe('HTTPS URL to send webhook events to'),
  events: z.array(z.string()).describe('Array of event types to subscribe to (e.g., ["call.completed", "transcript.ready"])'),
  secret: z.string().optional().describe('Secret for HMAC signature verification'),
});

const updateWebhookSchema = z.object({
  webhookId: z.string().describe('ID of the webhook to update (format: WHK-xxxxx)'),
  url: z.string().url().optional().describe('New webhook URL'),
  events: z.array(z.string()).optional().describe('New event subscriptions'),
  isActive: z.boolean().optional().describe('Enable or disable the webhook'),
});

const deleteWebhookSchema = z.object({
  webhookId: z.string().describe('ID of the webhook to delete (format: WHK-xxxxx)'),
});

const testWebhookSchema = z.object({
  webhookId: z.string().describe('ID of the webhook to test (format: WHK-xxxxx)'),
});

const listWebhookDeliveriesSchema = z.object({
  webhookId: z.string().describe('ID of the webhook (format: WHK-xxxxx)'),
  page: z.number().optional().default(1).describe('Page number'),
  limit: z.number().optional().default(50).describe('Results per page'),
});

// Custom Tools schemas
const listToolsSchema = z.object({
  page: z.number().optional().default(1).describe('Page number for pagination'),
  pageSize: z.number().optional().default(50).describe('Number of tools per page'),
});

const getToolSchema = z.object({
  toolId: z.string().describe('ID of the tool to retrieve (format: TOOL-xxxxx)'),
});

const createToolSchema = z.object({
  name: z.string().min(1).describe('Name of the tool (used by agent for invocation)'),
  description: z.string().optional().describe('Description of what the tool does'),
  url: z.string().url().describe('HTTPS URL endpoint to call when tool is invoked'),
  parameters: z.record(z.any()).optional().describe('JSON schema defining tool parameters'),
  secret: z.string().optional().describe('Secret for HMAC signature verification'),
  headers: z.record(z.string()).optional().describe('Custom headers to send with requests'),
  timeout: z.number().optional().describe('Request timeout in seconds (1-30)'),
});

const updateToolSchema = z.object({
  toolId: z.string().describe('ID of the tool to update (format: TOOL-xxxxx)'),
  description: z.string().optional().describe('New description'),
  url: z.string().url().optional().describe('New URL'),
  parameters: z.record(z.any()).optional().describe('New parameter schema'),
  secret: z.string().optional().describe('New secret'),
  headers: z.record(z.string()).optional().describe('New headers'),
  timeout: z.number().optional().describe('New timeout (1-30 seconds)'),
});

const deleteToolSchema = z.object({
  toolId: z.string().describe('ID of the tool to delete (format: TOOL-xxxxx)'),
});

const testToolSchema = z.object({
  toolId: z.string().describe('ID of the tool to test (format: TOOL-xxxxx)'),
  testPayload: z.record(z.any()).optional().describe('Test payload to send to the tool'),
});

// Analytics schemas
const getUsageAnalyticsSchema = z.object({
  startDate: z.string().optional().describe('Start date in ISO 8601 format (e.g., "2024-01-01")'),
  endDate: z.string().optional().describe('End date in ISO 8601 format'),
  granularity: z.enum(['day', 'week', 'month']).optional().describe('Data granularity'),
});

const getCostAnalyticsSchema = z.object({
  startDate: z.string().optional().describe('Start date in ISO 8601 format (e.g., "2024-01-01")'),
  endDate: z.string().optional().describe('End date in ISO 8601 format'),
  granularity: z.enum(['day', 'week', 'month']).optional().describe('Data granularity'),
});

// Provider schemas
const listProvidersSchema = z.object({});

const listVoicesSchema = z.object({
  providerId: z.string().describe('Provider ID (e.g., "elevenlabs", "cartesia", "google")'),
});

const listModelsSchema = z.object({
  providerId: z.string().describe('Provider ID (e.g., "openai", "anthropic", "groq")'),
});

// Feedback schemas
const submitFeedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general']).describe('Type of feedback'),
  subject: z.string().min(1).describe('Brief subject line'),
  description: z.string().min(1).describe('Detailed description'),
  priority: z.enum(['low', 'medium', 'high']).optional().describe('Priority level'),
});

const listFeedbackSchema = z.object({
  page: z.number().optional().default(1).describe('Page number'),
  pageSize: z.number().optional().default(50).describe('Results per page'),
  type: z.string().optional().describe('Filter by type'),
});

const getFeedbackSchema = z.object({
  feedbackId: z.string().describe('ID of the feedback item (format: FB-xxxxx)'),
});

// Schema discovery
const getSchemasSchema = z.object({});

export interface ToolContext {
  client: ThruAIClient;
}

/**
 * MCP tool definitions
 */
export const tools = {
  create_agent: {
    name: 'create_agent',
    description: 'Create a new voice AI agent with smart defaults. Creates an S2S (Speech-to-Speech) agent for lowest latency by default. The agent will be created but not yet callable - you need to provision and assign a phone number.',
    inputSchema: createAgentSchema,
    handler: async (input: z.infer<typeof createAgentSchema>, ctx: ToolContext) => {
      const result = await ctx.client.createAgent({
        name: input.name,
        systemPrompt: input.systemPrompt,
        description: input.description,
        pipelineMode: input.pipelineMode,
        s2sProvider: 'openai-realtime',
        s2sModel: 'gpt-4o-realtime-preview-2024-12-17',
        s2sVoice: input.s2sVoice,
      });

      return {
        success: true,
        agent: result,
        message: `Agent "${input.name}" created successfully! ID: ${result.id}`,
        nextSteps: [
          '1. Provision a phone number: use search_numbers to find available numbers',
          '2. Then use provision_number to purchase a number',
          '3. Assign the number to this agent: use assign_number',
          'OR use quickstart tool to do all of this in one call',
        ],
      };
    },
  },

  quickstart: {
    name: 'quickstart',
    description: 'Create a fully configured voice agent with phone number in ONE CALL. This is the fastest way to get started. Creates an S2S agent with smart defaults and automatically provisions a phone number in the specified area code. The agent will be ready to receive calls immediately.',
    inputSchema: quickstartSchema,
    handler: async (input: z.infer<typeof quickstartSchema>, ctx: ToolContext) => {
      const result = await ctx.client.quickstart({
        name: input.name,
        systemPrompt: input.systemPrompt,
        areaCode: input.areaCode,
        voice: input.voice,
        model: input.model,
      });

      if (result.phoneNumber) {
        return {
          success: true,
          agent: result.agent,
          phoneNumber: result.phoneNumber,
          message: `🎉 Success! Agent "${input.name}" is ready!\n\nPhone: ${result.phoneNumber.phoneNumber}\nAgent ID: ${result.agent.id}\n\nYou can now:\n• Call ${result.phoneNumber.phoneNumber} to test the agent\n• Make outbound calls with make_call tool\n• View call history with list_calls tool`,
        };
      } else {
        return {
          success: false,
          agent: result.agent,
          error: result.error,
          message: `Agent created but phone provisioning failed: ${result.error?.message}\n\nAgent ID: ${result.agent.id}\n\nNext steps:\n1. Use search_numbers to find available numbers\n2. Use provision_number to purchase a number\n3. Use assign_number to assign it to this agent`,
        };
      }
    },
  },

  make_call: {
    name: 'make_call',
    description: 'Make an outbound call from a voice agent to a phone number. The agent must have a phone number assigned. The call will be initiated immediately and the agent will start speaking when the recipient answers.',
    inputSchema: makeCallSchema,
    handler: async (input: z.infer<typeof makeCallSchema>, ctx: ToolContext) => {
      const result = await ctx.client.makeCall({
        agentId: input.agentId,
        to: input.to,
        from: input.from,
      });

      return {
        success: true,
        call: result,
        message: `Call initiated to ${input.to}!\n\nCall ID: ${result.callId}\nSession ID: ${result.sessionId}\nStatus: ${result.status}\n\nUse get_call with callId to check status and retrieve transcript.`,
      };
    },
  },

  list_agents: {
    name: 'list_agents',
    description: 'List all voice agents in your account. Returns agent metadata including name, status, and configuration.',
    inputSchema: listAgentsSchema,
    handler: async (input: z.infer<typeof listAgentsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listAgents({
        page: input.page,
        pageSize: input.pageSize,
      });

      return {
        success: true,
        agents: result.agents,
        pagination: result.pagination,
        message: `Found ${result.agents.length} agent(s)${result.pagination ? ` (page ${result.pagination.page} of ${Math.ceil(result.pagination.total / result.pagination.pageSize)})` : ''}`,
      };
    },
  },

  list_calls: {
    name: 'list_calls',
    description: 'List recent calls with transcripts. Returns call metadata including duration, cost, and full conversation transcript. Filter by agent or status.',
    inputSchema: listCallsSchema,
    handler: async (input: z.infer<typeof listCallsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listCalls({
        page: input.page,
        pageSize: input.pageSize,
        agentId: input.agentId,
        status: input.status,
      });

      return {
        success: true,
        calls: result.calls,
        pagination: result.pagination,
        message: `Found ${result.calls.length} call(s)${result.pagination ? ` (page ${result.pagination.page} of ${Math.ceil(result.pagination.total / result.pagination.pageSize)})` : ''}`,
      };
    },
  },

  get_call: {
    name: 'get_call',
    description: 'Get detailed information about a specific call, including full conversation transcript with timestamps, duration, cost, and status.',
    inputSchema: getCallSchema,
    handler: async (input: z.infer<typeof getCallSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getCall(input.callId);

      return {
        success: true,
        call: result,
        message: `Call details retrieved for ${input.callId}`,
      };
    },
  },

  search_numbers: {
    name: 'search_numbers',
    description: 'Search for available phone numbers to provision. Search by area code and country. Returns a list of available numbers with locality information.',
    inputSchema: searchNumbersSchema,
    handler: async (input: z.infer<typeof searchNumbersSchema>, ctx: ToolContext) => {
      const result = await ctx.client.searchNumbers({
        areaCode: input.areaCode,
        country: input.country,
        limit: input.limit,
      });

      return {
        success: true,
        numbers: result.numbers,
        message: `Found ${result.numbers.length} available number(s)${input.areaCode ? ` in area code ${input.areaCode}` : ''}.\n\nUse provision_number with the phoneNumber field to purchase one.`,
      };
    },
  },

  provision_number: {
    name: 'provision_number',
    description: 'Provision (purchase) a phone number. The number must be found via search_numbers first. Once provisioned, use assign_number to assign it to an agent.',
    inputSchema: provisionNumberSchema,
    handler: async (input: z.infer<typeof provisionNumberSchema>, ctx: ToolContext) => {
      const result = await ctx.client.provisionNumber({
        phoneNumber: input.phoneNumber,
        friendlyName: input.friendlyName,
      });

      return {
        success: true,
        phoneNumber: result,
        message: `Phone number provisioned successfully!\n\nNumber: ${result.phoneNumber}\nID: ${result.id}\nStatus: ${result.status}\n\nNext step: Use assign_number to assign this number to an agent.`,
      };
    },
  },

  assign_number: {
    name: 'assign_number',
    description: 'Assign a provisioned phone number to a voice agent. Once assigned, the agent will answer calls to this number and can make outbound calls from it.',
    inputSchema: assignNumberSchema,
    handler: async (input: z.infer<typeof assignNumberSchema>, ctx: ToolContext) => {
      const result = await ctx.client.assignNumber(input.agentId, {
        phoneNumberId: input.phoneNumberId,
      });

      return {
        success: true,
        assignment: result,
        message: `Phone number assigned to agent successfully!\n\nAgent ID: ${result.agentId}\nPhone Number ID: ${result.phoneNumberId}\n\nThe agent is now ready to receive and make calls!`,
      };
    },
  },

  // Additional agent tools
  get_agent: {
    name: 'get_agent',
    description: 'Get detailed information about a specific agent including configuration, status, and metadata.',
    inputSchema: getAgentSchema,
    handler: async (input: z.infer<typeof getAgentSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getAgent(input.agentId);
      return {
        success: true,
        agent: result,
        message: `Retrieved agent details for ${input.agentId}`,
      };
    },
  },

  update_agent: {
    name: 'update_agent',
    description: 'Update an existing agent\'s configuration. You can update the name, system prompt, description, or status.',
    inputSchema: updateAgentSchema,
    handler: async (input: z.infer<typeof updateAgentSchema>, ctx: ToolContext) => {
      const { agentId, ...updates } = input;
      const result = await ctx.client.updateAgent(agentId, updates);
      return {
        success: true,
        agent: result,
        message: `Agent ${agentId} updated successfully!`,
      };
    },
  },

  delete_agent: {
    name: 'delete_agent',
    description: 'Permanently delete an agent. This cannot be undone. All associated phone number assignments will be removed.',
    inputSchema: deleteAgentSchema,
    handler: async (input: z.infer<typeof deleteAgentSchema>, ctx: ToolContext) => {
      const result = await ctx.client.deleteAgent(input.agentId);
      return {
        success: true,
        message: result.message,
      };
    },
  },

  // Workflow tools
  list_workflows: {
    name: 'list_workflows',
    description: 'List all workflows for your organization. Workflows automate complex multi-step processes with 30+ node types (CRM, calendar, email, sheets, web, social, logic).',
    inputSchema: listWorkflowsSchema,
    handler: async (input: z.infer<typeof listWorkflowsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listWorkflows(input);
      return {
        success: true,
        workflows: result.workflows,
        pagination: result.pagination,
        message: `Found ${result.workflows.length} workflow(s)`,
      };
    },
  },

  get_workflow: {
    name: 'get_workflow',
    description: 'Get detailed information about a specific workflow including nodes, edges, and execution history.',
    inputSchema: getWorkflowSchema,
    handler: async (input: z.infer<typeof getWorkflowSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getWorkflow(input.workflowId);
      return {
        success: true,
        workflow: result,
        message: `Retrieved workflow ${input.workflowId}`,
      };
    },
  },

  create_workflow: {
    name: 'create_workflow',
    description: 'Create a new workflow to automate multi-step processes. Define nodes (handlers) and edges (connections) to build complex automation.',
    inputSchema: createWorkflowSchema,
    handler: async (input: z.infer<typeof createWorkflowSchema>, ctx: ToolContext) => {
      const result = await ctx.client.createWorkflow(input);
      return {
        success: true,
        workflow: result,
        message: `Workflow "${input.name}" created successfully! ID: ${result.id}\n\nNext steps:\n1. Add nodes and edges to define the workflow logic\n2. Publish the workflow with publish_workflow\n3. Trigger execution with trigger_workflow`,
      };
    },
  },

  update_workflow: {
    name: 'update_workflow',
    description: 'Update an existing workflow\'s configuration, nodes, or edges.',
    inputSchema: updateWorkflowSchema,
    handler: async (input: z.infer<typeof updateWorkflowSchema>, ctx: ToolContext) => {
      const { workflowId, ...updates } = input;
      const result = await ctx.client.updateWorkflow(workflowId, updates);
      return {
        success: true,
        workflow: result,
        message: `Workflow ${workflowId} updated successfully!`,
      };
    },
  },

  delete_workflow: {
    name: 'delete_workflow',
    description: 'Permanently delete a workflow. This cannot be undone.',
    inputSchema: deleteWorkflowSchema,
    handler: async (input: z.infer<typeof deleteWorkflowSchema>, ctx: ToolContext) => {
      const result = await ctx.client.deleteWorkflow(input.workflowId);
      return {
        success: true,
        message: result.message,
      };
    },
  },

  publish_workflow: {
    name: 'publish_workflow',
    description: 'Publish a workflow to make it ready for execution. Workflows must be published before they can be triggered.',
    inputSchema: publishWorkflowSchema,
    handler: async (input: z.infer<typeof publishWorkflowSchema>, ctx: ToolContext) => {
      const result = await ctx.client.publishWorkflow(input.workflowId);
      return {
        success: true,
        workflow: result,
        message: `Workflow ${input.workflowId} published successfully! It is now ready to execute.`,
      };
    },
  },

  unpublish_workflow: {
    name: 'unpublish_workflow',
    description: 'Unpublish a workflow to prevent new executions while you make changes.',
    inputSchema: unpublishWorkflowSchema,
    handler: async (input: z.infer<typeof unpublishWorkflowSchema>, ctx: ToolContext) => {
      const result = await ctx.client.unpublishWorkflow(input.workflowId);
      return {
        success: true,
        workflow: result,
        message: `Workflow ${input.workflowId} unpublished. It will not execute until published again.`,
      };
    },
  },

  trigger_workflow: {
    name: 'trigger_workflow',
    description: 'Manually trigger a workflow execution. The workflow must be published first.',
    inputSchema: triggerWorkflowSchema,
    handler: async (input: z.infer<typeof triggerWorkflowSchema>, ctx: ToolContext) => {
      const { workflowId, input: workflowInput } = input;
      const result = await ctx.client.triggerWorkflow(workflowId, { input: workflowInput });
      return {
        success: true,
        execution: result,
        message: `Workflow triggered! Execution ID: ${result.executionId}\nStatus: ${result.status}\n\nUse list_workflow_executions to check progress.`,
      };
    },
  },

  list_workflow_executions: {
    name: 'list_workflow_executions',
    description: 'List execution history for a workflow to monitor progress and debug issues.',
    inputSchema: listWorkflowExecutionsSchema,
    handler: async (input: z.infer<typeof listWorkflowExecutionsSchema>, ctx: ToolContext) => {
      const { workflowId, ...params } = input;
      const result = await ctx.client.listWorkflowExecutions(workflowId, params);
      return {
        success: true,
        executions: result.executions,
        pagination: result.pagination,
        message: `Found ${result.executions.length} execution(s) for workflow ${workflowId}`,
      };
    },
  },

  // Campaign tools
  list_campaigns: {
    name: 'list_campaigns',
    description: 'List all outbound calling campaigns. Campaigns enable automated calling at scale.',
    inputSchema: listCampaignsSchema,
    handler: async (input: z.infer<typeof listCampaignsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listCampaigns(input);
      return {
        success: true,
        campaigns: result.campaigns,
        pagination: result.pagination,
        message: `Found ${result.campaigns.length} campaign(s)`,
      };
    },
  },

  get_campaign: {
    name: 'get_campaign',
    description: 'Get detailed information about a specific campaign including configuration and progress.',
    inputSchema: getCampaignSchema,
    handler: async (input: z.infer<typeof getCampaignSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getCampaign(input.campaignId);
      return {
        success: true,
        campaign: result,
        message: `Retrieved campaign ${input.campaignId}`,
      };
    },
  },

  create_campaign: {
    name: 'create_campaign',
    description: 'Create a new outbound calling campaign. Assign an agent or workflow to process contacts at scale.',
    inputSchema: createCampaignSchema,
    handler: async (input: z.infer<typeof createCampaignSchema>, ctx: ToolContext) => {
      const result = await ctx.client.createCampaign(input);
      return {
        success: true,
        campaign: result,
        message: `Campaign "${input.name}" created! ID: ${result.id}\n\nNext steps:\n1. Add contacts with add_campaign_contacts\n2. Start the campaign with start_campaign\n3. Monitor progress with get_campaign_stats`,
      };
    },
  },

  update_campaign: {
    name: 'update_campaign',
    description: 'Update an existing campaign\'s configuration.',
    inputSchema: updateCampaignSchema,
    handler: async (input: z.infer<typeof updateCampaignSchema>, ctx: ToolContext) => {
      const { campaignId, ...updates } = input;
      const result = await ctx.client.updateCampaign(campaignId, updates);
      return {
        success: true,
        campaign: result,
        message: `Campaign ${campaignId} updated successfully!`,
      };
    },
  },

  delete_campaign: {
    name: 'delete_campaign',
    description: 'Permanently delete a campaign. This cannot be undone.',
    inputSchema: deleteCampaignSchema,
    handler: async (input: z.infer<typeof deleteCampaignSchema>, ctx: ToolContext) => {
      const result = await ctx.client.deleteCampaign(input.campaignId);
      return {
        success: true,
        message: result.message,
      };
    },
  },

  start_campaign: {
    name: 'start_campaign',
    description: 'Start a campaign to begin calling contacts. Calls will be made according to the campaign configuration.',
    inputSchema: startCampaignSchema,
    handler: async (input: z.infer<typeof startCampaignSchema>, ctx: ToolContext) => {
      const result = await ctx.client.startCampaign(input.campaignId);
      return {
        success: true,
        campaign: result,
        message: `Campaign ${input.campaignId} started! Calls are now being made.\n\nMonitor progress with get_campaign_stats.`,
      };
    },
  },

  pause_campaign: {
    name: 'pause_campaign',
    description: 'Pause a running campaign to temporarily stop making calls.',
    inputSchema: pauseCampaignSchema,
    handler: async (input: z.infer<typeof pauseCampaignSchema>, ctx: ToolContext) => {
      const result = await ctx.client.pauseCampaign(input.campaignId);
      return {
        success: true,
        campaign: result,
        message: `Campaign ${input.campaignId} paused. Resume with start_campaign.`,
      };
    },
  },

  add_campaign_contacts: {
    name: 'add_campaign_contacts',
    description: 'Add contacts to a campaign. Each contact should have a phone number and optional metadata.',
    inputSchema: addCampaignContactsSchema,
    handler: async (input: z.infer<typeof addCampaignContactsSchema>, ctx: ToolContext) => {
      const { campaignId, contacts } = input;
      const result = await ctx.client.addCampaignContacts(campaignId, { contacts });
      return {
        success: true,
        added: result.added,
        failed: result.failed,
        message: `Added ${result.added} contact(s) to campaign ${campaignId}${result.failed > 0 ? `. ${result.failed} failed.` : ''}`,
      };
    },
  },

  get_campaign_stats: {
    name: 'get_campaign_stats',
    description: 'Get real-time statistics for a campaign including contact status breakdown, progress, and success rate.',
    inputSchema: getCampaignStatsSchema,
    handler: async (input: z.infer<typeof getCampaignStatsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getCampaignStats(input.campaignId);
      return {
        success: true,
        stats: result,
        message: `Campaign ${input.campaignId} Statistics:\n\nTotal: ${result.stats.total}\nQueued: ${result.stats.queued}\nIn Progress: ${result.stats.inProgress}\nCompleted: ${result.stats.completed}\nFailed: ${result.stats.failed}\n\nProgress: ${result.percentComplete}%\nSuccess Rate: ${result.successRate}%`,
      };
    },
  },

  // Webhook tools
  list_webhooks: {
    name: 'list_webhooks',
    description: 'List all webhook subscriptions for real-time event notifications.',
    inputSchema: listWebhooksSchema,
    handler: async (input: z.infer<typeof listWebhooksSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listWebhooks(input);
      return {
        success: true,
        webhooks: result.webhooks,
        pagination: result.pagination,
        message: `Found ${result.webhooks.length} webhook(s)`,
      };
    },
  },

  get_webhook: {
    name: 'get_webhook',
    description: 'Get detailed information about a specific webhook subscription.',
    inputSchema: getWebhookSchema,
    handler: async (input: z.infer<typeof getWebhookSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getWebhook(input.webhookId);
      return {
        success: true,
        webhook: result,
        message: `Retrieved webhook ${input.webhookId}`,
      };
    },
  },

  create_webhook: {
    name: 'create_webhook',
    description: 'Create a webhook subscription to receive real-time notifications for events like call.completed, transcript.ready, workflow.completed.',
    inputSchema: createWebhookSchema,
    handler: async (input: z.infer<typeof createWebhookSchema>, ctx: ToolContext) => {
      const result = await ctx.client.createWebhook(input);
      return {
        success: true,
        webhook: result,
        message: `Webhook created! ID: ${result.id}\n\nSubscribed to: ${input.events.join(', ')}\n\nEvents will be sent to: ${input.url}\n\nTest with test_webhook.`,
      };
    },
  },

  update_webhook: {
    name: 'update_webhook',
    description: 'Update a webhook subscription\'s URL, events, or active status.',
    inputSchema: updateWebhookSchema,
    handler: async (input: z.infer<typeof updateWebhookSchema>, ctx: ToolContext) => {
      const { webhookId, ...updates } = input;
      const result = await ctx.client.updateWebhook(webhookId, updates);
      return {
        success: true,
        webhook: result,
        message: `Webhook ${webhookId} updated successfully!`,
      };
    },
  },

  delete_webhook: {
    name: 'delete_webhook',
    description: 'Delete a webhook subscription. You will no longer receive events at this URL.',
    inputSchema: deleteWebhookSchema,
    handler: async (input: z.infer<typeof deleteWebhookSchema>, ctx: ToolContext) => {
      const result = await ctx.client.deleteWebhook(input.webhookId);
      return {
        success: true,
        message: result.message,
      };
    },
  },

  test_webhook: {
    name: 'test_webhook',
    description: 'Send a test event to a webhook to verify it\'s configured correctly.',
    inputSchema: testWebhookSchema,
    handler: async (input: z.infer<typeof testWebhookSchema>, ctx: ToolContext) => {
      const result = await ctx.client.testWebhook(input.webhookId);
      return {
        success: result.success,
        statusCode: result.statusCode,
        message: result.message,
      };
    },
  },

  list_webhook_deliveries: {
    name: 'list_webhook_deliveries',
    description: 'List webhook delivery attempts to track reliability and debug issues.',
    inputSchema: listWebhookDeliveriesSchema,
    handler: async (input: z.infer<typeof listWebhookDeliveriesSchema>, ctx: ToolContext) => {
      const { webhookId, ...params } = input;
      const result = await ctx.client.listWebhookDeliveries(webhookId, params);
      return {
        success: true,
        deliveries: result.deliveries,
        pagination: result.pagination,
        message: `Found ${result.deliveries.length} delivery attempt(s) for webhook ${webhookId}`,
      };
    },
  },

  // Custom Tools
  list_tools: {
    name: 'list_tools',
    description: 'List all custom webhook-based tools that agents can call during live voice conversations.',
    inputSchema: listToolsSchema,
    handler: async (input: z.infer<typeof listToolsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listTools(input);
      return {
        success: true,
        tools: result.tools,
        pagination: result.pagination,
        message: `Found ${result.tools.length} custom tool(s)`,
      };
    },
  },

  get_tool: {
    name: 'get_tool',
    description: 'Get detailed information about a specific custom tool.',
    inputSchema: getToolSchema,
    handler: async (input: z.infer<typeof getToolSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getTool(input.toolId);
      return {
        success: true,
        tool: result,
        message: `Retrieved tool ${input.toolId}`,
      };
    },
  },

  create_tool: {
    name: 'create_tool',
    description: 'Create a custom webhook-based tool that agents can invoke in real-time during calls. Unlike webhooks (post-event notifications), tools are called BY the agent during conversations.',
    inputSchema: createToolSchema,
    handler: async (input: z.infer<typeof createToolSchema>, ctx: ToolContext) => {
      const result = await ctx.client.createTool(input);
      return {
        success: true,
        tool: result,
        message: `Tool "${input.name}" created! ID: ${result.id}\n\nNext steps:\n1. Attach to agent: update_agent with enabledTools: ["${input.name}"]\n2. Agent can now call this tool during conversations\n3. Test with test_tool`,
      };
    },
  },

  update_tool: {
    name: 'update_tool',
    description: 'Update a custom tool\'s configuration. Tool name cannot be changed.',
    inputSchema: updateToolSchema,
    handler: async (input: z.infer<typeof updateToolSchema>, ctx: ToolContext) => {
      const { toolId, ...updates } = input;
      const result = await ctx.client.updateTool(toolId, updates);
      return {
        success: true,
        tool: result,
        message: `Tool ${toolId} updated successfully!`,
      };
    },
  },

  delete_tool: {
    name: 'delete_tool',
    description: 'Delete a custom tool. Returns warnings if agents still reference it.',
    inputSchema: deleteToolSchema,
    handler: async (input: z.infer<typeof deleteToolSchema>, ctx: ToolContext) => {
      const result = await ctx.client.deleteTool(input.toolId);
      return {
        success: true,
        message: result.message,
        warnings: result.warnings,
      };
    },
  },

  test_tool: {
    name: 'test_tool',
    description: 'Test a custom tool by sending a sample request to its webhook URL.',
    inputSchema: testToolSchema,
    handler: async (input: z.infer<typeof testToolSchema>, ctx: ToolContext) => {
      const { toolId, testPayload } = input;
      const result = await ctx.client.testTool(toolId, { testPayload });
      return {
        success: result.success,
        statusCode: result.statusCode,
        response: result.response,
        responseTime: result.responseTime,
        message: result.error || `Tool responded successfully in ${result.responseTime}ms`,
      };
    },
  },

  // Analytics tools
  get_usage_analytics: {
    name: 'get_usage_analytics',
    description: 'Get usage analytics including call volume, minutes, and transcription usage over time.',
    inputSchema: getUsageAnalyticsSchema,
    handler: async (input: z.infer<typeof getUsageAnalyticsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getUsageAnalytics(input);
      return {
        success: true,
        usage: result.usage,
        totals: result.totals,
        message: `Usage Analytics:\n\nTotal Calls: ${result.totals.calls}\nTotal Minutes: ${result.totals.minutes}\nTranscription Minutes: ${result.totals.transcriptionMinutes || 0}`,
      };
    },
  },

  get_cost_analytics: {
    name: 'get_cost_analytics',
    description: 'Get cost analytics with breakdown by component (LLM, TTS, STT, telephony).',
    inputSchema: getCostAnalyticsSchema,
    handler: async (input: z.infer<typeof getCostAnalyticsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getCostAnalytics(input);
      return {
        success: true,
        costs: result.costs,
        totals: result.totals,
        message: `Cost Analytics:\n\nTotal Cost: $${result.totals.total}\n\nBreakdown:\n- LLM: $${result.totals.breakdown?.llm || 0}\n- TTS: $${result.totals.breakdown?.tts || 0}\n- STT: $${result.totals.breakdown?.stt || 0}\n- Telephony: $${result.totals.breakdown?.telephony || 0}`,
      };
    },
  },

  // Provider tools
  list_providers: {
    name: 'list_providers',
    description: 'List all available LLM, TTS, and STT providers with their metadata.',
    inputSchema: listProvidersSchema,
    handler: async (_input: z.infer<typeof listProvidersSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listProviders();
      return {
        success: true,
        providers: result.providers,
        message: `Found ${result.providers.llm.length} LLM, ${result.providers.tts.length} TTS, and ${result.providers.stt.length} STT providers`,
      };
    },
  },

  list_voices: {
    name: 'list_voices',
    description: 'List available voices for a TTS provider (e.g., ElevenLabs, Cartesia, Google).',
    inputSchema: listVoicesSchema,
    handler: async (input: z.infer<typeof listVoicesSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listVoices(input.providerId);
      return {
        success: true,
        voices: result.voices,
        message: `Found ${result.voices.length} voice(s) for provider ${input.providerId}`,
      };
    },
  },

  list_models: {
    name: 'list_models',
    description: 'List available models for an LLM or STT provider (e.g., OpenAI, Anthropic, Groq).',
    inputSchema: listModelsSchema,
    handler: async (input: z.infer<typeof listModelsSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listModels(input.providerId);
      return {
        success: true,
        models: result.models,
        message: `Found ${result.models.length} model(s) for provider ${input.providerId}`,
      };
    },
  },

  // Feedback tools
  submit_feedback: {
    name: 'submit_feedback',
    description: 'Submit bug reports, feature requests, or general feedback to the ThruAI team.',
    inputSchema: submitFeedbackSchema,
    handler: async (input: z.infer<typeof submitFeedbackSchema>, ctx: ToolContext) => {
      const result = await ctx.client.submitFeedback(input);
      return {
        success: true,
        feedback: result,
        message: `Feedback submitted! ID: ${result.id}\n\nType: ${result.type}\nSubject: ${result.subject}\nStatus: ${result.status}\n\nThank you for helping improve ThruAI!`,
      };
    },
  },

  list_feedback: {
    name: 'list_feedback',
    description: 'List all feedback submissions from your organization.',
    inputSchema: listFeedbackSchema,
    handler: async (input: z.infer<typeof listFeedbackSchema>, ctx: ToolContext) => {
      const result = await ctx.client.listFeedback(input);
      return {
        success: true,
        feedback: result.feedback,
        pagination: result.pagination,
        message: `Found ${result.feedback.length} feedback item(s)`,
      };
    },
  },

  get_feedback: {
    name: 'get_feedback',
    description: 'Get detailed information about a specific feedback submission.',
    inputSchema: getFeedbackSchema,
    handler: async (input: z.infer<typeof getFeedbackSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getFeedback(input.feedbackId);
      return {
        success: true,
        feedback: result,
        message: `Retrieved feedback ${input.feedbackId}`,
      };
    },
  },

  // Schema discovery tool
  get_schemas: {
    name: 'get_schemas',
    description: 'Discover API schemas for all resources to prevent field name typos and understand exact request formats.',
    inputSchema: getSchemasSchema,
    handler: async (_input: z.infer<typeof getSchemasSchema>, ctx: ToolContext) => {
      const result = await ctx.client.getSchemas();
      return {
        success: true,
        schemas: result.schemas,
        version: result.version,
        message: `Retrieved API schemas (version ${result.version}). Use these to discover exact field names and types.`,
      };
    },
  },
};

export type ToolName = keyof typeof tools;
