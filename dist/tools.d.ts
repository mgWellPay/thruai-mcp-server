/**
 * ThruAI MCP Tools
 *
 * MCP tool definitions for interacting with ThruAI voice agent platform.
 */
import { z } from 'zod';
import { ThruAIClient } from './api-client.js';
declare const createAgentSchema: z.ZodObject<{
    name: z.ZodString;
    systemPrompt: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    pipelineMode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["s2s", "traditional"]>>>;
    s2sVoice: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    pipelineMode: "s2s" | "traditional";
    s2sVoice: string;
    systemPrompt?: string | undefined;
    description?: string | undefined;
}, {
    name: string;
    systemPrompt?: string | undefined;
    description?: string | undefined;
    pipelineMode?: "s2s" | "traditional" | undefined;
    s2sVoice?: string | undefined;
}>;
declare const quickstartSchema: z.ZodObject<{
    name: z.ZodString;
    systemPrompt: z.ZodOptional<z.ZodString>;
    areaCode: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    voice: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    model: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    areaCode: string;
    name: string;
    voice: string;
    model: string;
    systemPrompt?: string | undefined;
}, {
    name: string;
    areaCode?: string | undefined;
    systemPrompt?: string | undefined;
    voice?: string | undefined;
    model?: string | undefined;
}>;
declare const makeCallSchema: z.ZodObject<{
    agentId: z.ZodString;
    to: z.ZodString;
    from: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    agentId: string;
    to: string;
    from?: string | undefined;
}, {
    agentId: string;
    to: string;
    from?: string | undefined;
}>;
declare const listAgentsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
declare const listCallsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    agentId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    agentId?: string | undefined;
    status?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    agentId?: string | undefined;
    status?: string | undefined;
}>;
declare const getCallSchema: z.ZodObject<{
    callId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    callId: string;
}, {
    callId: string;
}>;
declare const searchNumbersSchema: z.ZodObject<{
    areaCode: z.ZodOptional<z.ZodString>;
    country: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    country: string;
    limit: number;
    areaCode?: string | undefined;
}, {
    areaCode?: string | undefined;
    country?: string | undefined;
    limit?: number | undefined;
}>;
declare const provisionNumberSchema: z.ZodObject<{
    phoneNumber: z.ZodString;
    friendlyName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phoneNumber: string;
    friendlyName?: string | undefined;
}, {
    phoneNumber: string;
    friendlyName?: string | undefined;
}>;
declare const assignNumberSchema: z.ZodObject<{
    agentId: z.ZodString;
    phoneNumberId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    agentId: string;
    phoneNumberId: string;
}, {
    agentId: string;
    phoneNumberId: string;
}>;
declare const getAgentSchema: z.ZodObject<{
    agentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    agentId: string;
}, {
    agentId: string;
}>;
declare const updateAgentSchema: z.ZodObject<{
    agentId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    systemPrompt: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    agentId: string;
    status?: string | undefined;
    name?: string | undefined;
    systemPrompt?: string | undefined;
    description?: string | undefined;
}, {
    agentId: string;
    status?: string | undefined;
    name?: string | undefined;
    systemPrompt?: string | undefined;
    description?: string | undefined;
}>;
declare const deleteAgentSchema: z.ZodObject<{
    agentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    agentId: string;
}, {
    agentId: string;
}>;
declare const listWorkflowsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
declare const getWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
declare const createWorkflowSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    nodes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    edges: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    nodes?: any[] | undefined;
    edges?: any[] | undefined;
}, {
    name: string;
    description?: string | undefined;
    nodes?: any[] | undefined;
    edges?: any[] | undefined;
}>;
declare const updateWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    nodes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    edges: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
    name?: string | undefined;
    description?: string | undefined;
    nodes?: any[] | undefined;
    edges?: any[] | undefined;
}, {
    workflowId: string;
    name?: string | undefined;
    description?: string | undefined;
    nodes?: any[] | undefined;
    edges?: any[] | undefined;
}>;
declare const deleteWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
declare const publishWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
declare const unpublishWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
}, {
    workflowId: string;
}>;
declare const triggerWorkflowSchema: z.ZodObject<{
    workflowId: z.ZodString;
    input: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    workflowId: string;
    input?: Record<string, any> | undefined;
}, {
    workflowId: string;
    input?: Record<string, any> | undefined;
}>;
declare const listWorkflowExecutionsSchema: z.ZodObject<{
    workflowId: z.ZodString;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    workflowId: string;
}, {
    workflowId: string;
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
declare const listCampaignsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    status?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    status?: string | undefined;
}>;
declare const getCampaignSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
declare const createCampaignSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    agentId: z.ZodOptional<z.ZodString>;
    workflowId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    agentId?: string | undefined;
    description?: string | undefined;
    workflowId?: string | undefined;
}, {
    name: string;
    agentId?: string | undefined;
    description?: string | undefined;
    workflowId?: string | undefined;
}>;
declare const updateCampaignSchema: z.ZodObject<{
    campaignId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
    status?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
}, {
    campaignId: string;
    status?: string | undefined;
    name?: string | undefined;
    description?: string | undefined;
}>;
declare const deleteCampaignSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
declare const startCampaignSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
declare const pauseCampaignSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
declare const addCampaignContactsSchema: z.ZodObject<{
    campaignId: z.ZodString;
    contacts: z.ZodArray<z.ZodObject<{
        phoneNumber: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        customData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        phoneNumber: string;
        name?: string | undefined;
        customData?: Record<string, any> | undefined;
    }, {
        phoneNumber: string;
        name?: string | undefined;
        customData?: Record<string, any> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
    contacts: {
        phoneNumber: string;
        name?: string | undefined;
        customData?: Record<string, any> | undefined;
    }[];
}, {
    campaignId: string;
    contacts: {
        phoneNumber: string;
        name?: string | undefined;
        customData?: Record<string, any> | undefined;
    }[];
}>;
declare const getCampaignStatsSchema: z.ZodObject<{
    campaignId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    campaignId: string;
}, {
    campaignId: string;
}>;
declare const listWebhooksSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
declare const getWebhookSchema: z.ZodObject<{
    webhookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    webhookId: string;
}, {
    webhookId: string;
}>;
declare const createWebhookSchema: z.ZodObject<{
    url: z.ZodString;
    events: z.ZodArray<z.ZodString, "many">;
    secret: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    events: string[];
    secret?: string | undefined;
}, {
    url: string;
    events: string[];
    secret?: string | undefined;
}>;
declare const updateWebhookSchema: z.ZodObject<{
    webhookId: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    events: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    webhookId: string;
    url?: string | undefined;
    events?: string[] | undefined;
    isActive?: boolean | undefined;
}, {
    webhookId: string;
    url?: string | undefined;
    events?: string[] | undefined;
    isActive?: boolean | undefined;
}>;
declare const deleteWebhookSchema: z.ZodObject<{
    webhookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    webhookId: string;
}, {
    webhookId: string;
}>;
declare const testWebhookSchema: z.ZodObject<{
    webhookId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    webhookId: string;
}, {
    webhookId: string;
}>;
declare const listWebhookDeliveriesSchema: z.ZodObject<{
    webhookId: z.ZodString;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    webhookId: string;
}, {
    webhookId: string;
    page?: number | undefined;
    limit?: number | undefined;
}>;
declare const listToolsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
declare const getToolSchema: z.ZodObject<{
    toolId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    toolId: string;
}, {
    toolId: string;
}>;
declare const createToolSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    secret: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    url: string;
    description?: string | undefined;
    secret?: string | undefined;
    parameters?: Record<string, any> | undefined;
    headers?: Record<string, string> | undefined;
    timeout?: number | undefined;
}, {
    name: string;
    url: string;
    description?: string | undefined;
    secret?: string | undefined;
    parameters?: Record<string, any> | undefined;
    headers?: Record<string, string> | undefined;
    timeout?: number | undefined;
}>;
declare const updateToolSchema: z.ZodObject<{
    toolId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    secret: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    description?: string | undefined;
    url?: string | undefined;
    secret?: string | undefined;
    parameters?: Record<string, any> | undefined;
    headers?: Record<string, string> | undefined;
    timeout?: number | undefined;
}, {
    toolId: string;
    description?: string | undefined;
    url?: string | undefined;
    secret?: string | undefined;
    parameters?: Record<string, any> | undefined;
    headers?: Record<string, string> | undefined;
    timeout?: number | undefined;
}>;
declare const deleteToolSchema: z.ZodObject<{
    toolId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    toolId: string;
}, {
    toolId: string;
}>;
declare const testToolSchema: z.ZodObject<{
    toolId: z.ZodString;
    testPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    toolId: string;
    testPayload?: Record<string, any> | undefined;
}, {
    toolId: string;
    testPayload?: Record<string, any> | undefined;
}>;
declare const getUsageAnalyticsSchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    granularity: z.ZodOptional<z.ZodEnum<["day", "week", "month"]>>;
}, "strip", z.ZodTypeAny, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    granularity?: "day" | "week" | "month" | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    granularity?: "day" | "week" | "month" | undefined;
}>;
declare const getCostAnalyticsSchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    granularity: z.ZodOptional<z.ZodEnum<["day", "week", "month"]>>;
}, "strip", z.ZodTypeAny, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    granularity?: "day" | "week" | "month" | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
    granularity?: "day" | "week" | "month" | undefined;
}>;
declare const listProvidersSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
declare const listVoicesSchema: z.ZodObject<{
    providerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    providerId: string;
}, {
    providerId: string;
}>;
declare const listModelsSchema: z.ZodObject<{
    providerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    providerId: string;
}, {
    providerId: string;
}>;
declare const submitFeedbackSchema: z.ZodObject<{
    type: z.ZodEnum<["bug", "feature", "general"]>;
    subject: z.ZodString;
    description: z.ZodString;
    priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
}, "strip", z.ZodTypeAny, {
    type: "bug" | "feature" | "general";
    description: string;
    subject: string;
    priority?: "low" | "medium" | "high" | undefined;
}, {
    type: "bug" | "feature" | "general";
    description: string;
    subject: string;
    priority?: "low" | "medium" | "high" | undefined;
}>;
declare const listFeedbackSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    type?: string | undefined;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
    type?: string | undefined;
}>;
declare const getFeedbackSchema: z.ZodObject<{
    feedbackId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    feedbackId: string;
}, {
    feedbackId: string;
}>;
declare const getSchemasSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export interface ToolContext {
    client: ThruAIClient;
}
/**
 * MCP tool definitions
 */
export declare const tools: {
    create_agent: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            systemPrompt: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            pipelineMode: z.ZodDefault<z.ZodOptional<z.ZodEnum<["s2s", "traditional"]>>>;
            s2sVoice: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            pipelineMode: "s2s" | "traditional";
            s2sVoice: string;
            systemPrompt?: string | undefined;
            description?: string | undefined;
        }, {
            name: string;
            systemPrompt?: string | undefined;
            description?: string | undefined;
            pipelineMode?: "s2s" | "traditional" | undefined;
            s2sVoice?: string | undefined;
        }>;
        handler: (input: z.infer<typeof createAgentSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            agent: {
                id: string;
                name: string;
                status: string;
                createdAt: string;
            };
            message: string;
            nextSteps: string[];
        }>;
    };
    quickstart: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            systemPrompt: z.ZodOptional<z.ZodString>;
            areaCode: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            voice: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            model: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            areaCode: string;
            name: string;
            voice: string;
            model: string;
            systemPrompt?: string | undefined;
        }, {
            name: string;
            areaCode?: string | undefined;
            systemPrompt?: string | undefined;
            voice?: string | undefined;
            model?: string | undefined;
        }>;
        handler: (input: z.infer<typeof quickstartSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            agent: {
                id: string;
                name: string;
                status: string;
                createdAt: string;
            };
            phoneNumber: {
                id: string;
                phoneNumber: string;
                friendlyName?: string;
                status: string;
            };
            message: string;
            error?: undefined;
        } | {
            success: boolean;
            agent: {
                id: string;
                name: string;
                status: string;
                createdAt: string;
            };
            error: {
                message: string;
                details: string;
            } | undefined;
            message: string;
            phoneNumber?: undefined;
        }>;
    };
    make_call: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            agentId: z.ZodString;
            to: z.ZodString;
            from: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            agentId: string;
            to: string;
            from?: string | undefined;
        }, {
            agentId: string;
            to: string;
            from?: string | undefined;
        }>;
        handler: (input: z.infer<typeof makeCallSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            call: {
                callId: string;
                sessionId: string;
                status: string;
                message: string;
            };
            message: string;
        }>;
    };
    list_agents: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listAgentsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            agents: {
                id: string;
                name: string;
                description?: string;
                status: string;
                pipelineMode?: string;
                createdAt: string;
                updatedAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    list_calls: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            agentId: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            agentId?: string | undefined;
            status?: string | undefined;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
            agentId?: string | undefined;
            status?: string | undefined;
        }>;
        handler: (input: z.infer<typeof listCallsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            calls: {
                id: string;
                sessionId: string;
                agentId: string;
                direction: "inbound" | "outbound";
                status: string;
                duration?: number;
                cost?: number;
                createdAt: string;
                completedAt?: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_call: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            callId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            callId: string;
        }, {
            callId: string;
        }>;
        handler: (input: z.infer<typeof getCallSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            call: {
                id: string;
                sessionId: string;
                agentId: string;
                direction: "inbound" | "outbound";
                status: string;
                duration?: number;
                cost?: number;
                transcript?: {
                    role: "user" | "assistant";
                    content: string;
                    timestamp: string;
                }[] | undefined;
                createdAt: string;
                completedAt?: string;
            };
            message: string;
        }>;
    };
    search_numbers: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            areaCode: z.ZodOptional<z.ZodString>;
            country: z.ZodDefault<z.ZodOptional<z.ZodString>>;
            limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            country: string;
            limit: number;
            areaCode?: string | undefined;
        }, {
            areaCode?: string | undefined;
            country?: string | undefined;
            limit?: number | undefined;
        }>;
        handler: (input: z.infer<typeof searchNumbersSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            numbers: {
                phoneNumber: string;
                friendlyName?: string;
                locality?: string;
                region?: string;
                country: string;
            }[];
            message: string;
        }>;
    };
    provision_number: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            phoneNumber: z.ZodString;
            friendlyName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            phoneNumber: string;
            friendlyName?: string | undefined;
        }, {
            phoneNumber: string;
            friendlyName?: string | undefined;
        }>;
        handler: (input: z.infer<typeof provisionNumberSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            phoneNumber: {
                id: string;
                phoneNumber: string;
                friendlyName?: string;
                status: string;
                createdAt: string;
            };
            message: string;
        }>;
    };
    assign_number: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            agentId: z.ZodString;
            phoneNumberId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            agentId: string;
            phoneNumberId: string;
        }, {
            agentId: string;
            phoneNumberId: string;
        }>;
        handler: (input: z.infer<typeof assignNumberSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            assignment: {
                agentId: string;
                phoneNumberId: string;
                message: string;
            };
            message: string;
        }>;
    };
    get_agent: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            agentId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            agentId: string;
        }, {
            agentId: string;
        }>;
        handler: (input: z.infer<typeof getAgentSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            agent: {
                id: string;
                name: string;
                description?: string;
                systemPrompt?: string;
                status: string;
                pipelineMode?: string;
                voiceConfig?: unknown;
                llmConfig?: unknown;
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    update_agent: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            agentId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            systemPrompt: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            agentId: string;
            status?: string | undefined;
            name?: string | undefined;
            systemPrompt?: string | undefined;
            description?: string | undefined;
        }, {
            agentId: string;
            status?: string | undefined;
            name?: string | undefined;
            systemPrompt?: string | undefined;
            description?: string | undefined;
        }>;
        handler: (input: z.infer<typeof updateAgentSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            agent: {
                id: string;
                name: string;
                status: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    delete_agent: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            agentId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            agentId: string;
        }, {
            agentId: string;
        }>;
        handler: (input: z.infer<typeof deleteAgentSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    list_workflows: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listWorkflowsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflows: {
                id: string;
                name: string;
                description?: string;
                status: string;
                isPublished: boolean;
                createdAt: string;
                updatedAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
        }, {
            workflowId: string;
        }>;
        handler: (input: z.infer<typeof getWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflow: {
                id: string;
                name: string;
                description?: string;
                status: string;
                isPublished: boolean;
                nodes?: unknown[];
                edges?: unknown[];
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    create_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            nodes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
            edges: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
            nodes?: any[] | undefined;
            edges?: any[] | undefined;
        }, {
            name: string;
            description?: string | undefined;
            nodes?: any[] | undefined;
            edges?: any[] | undefined;
        }>;
        handler: (input: z.infer<typeof createWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflow: {
                id: string;
                name: string;
                status: string;
                createdAt: string;
            };
            message: string;
        }>;
    };
    update_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            nodes: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
            edges: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
            name?: string | undefined;
            description?: string | undefined;
            nodes?: any[] | undefined;
            edges?: any[] | undefined;
        }, {
            workflowId: string;
            name?: string | undefined;
            description?: string | undefined;
            nodes?: any[] | undefined;
            edges?: any[] | undefined;
        }>;
        handler: (input: z.infer<typeof updateWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflow: {
                id: string;
                name: string;
                status: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    delete_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
        }, {
            workflowId: string;
        }>;
        handler: (input: z.infer<typeof deleteWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    publish_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
        }, {
            workflowId: string;
        }>;
        handler: (input: z.infer<typeof publishWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflow: {
                id: string;
                isPublished: boolean;
                publishedAt: string;
            };
            message: string;
        }>;
    };
    unpublish_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
        }, {
            workflowId: string;
        }>;
        handler: (input: z.infer<typeof unpublishWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            workflow: {
                id: string;
                isPublished: boolean;
            };
            message: string;
        }>;
    };
    trigger_workflow: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
            input: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            workflowId: string;
            input?: Record<string, any> | undefined;
        }, {
            workflowId: string;
            input?: Record<string, any> | undefined;
        }>;
        handler: (input: z.infer<typeof triggerWorkflowSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            execution: {
                executionId: string;
                status: string;
                message: string;
            };
            message: string;
        }>;
    };
    list_workflow_executions: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            workflowId: z.ZodString;
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            workflowId: string;
        }, {
            workflowId: string;
            page?: number | undefined;
            pageSize?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listWorkflowExecutionsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            executions: {
                id: string;
                workflowId: string;
                status: string;
                startedAt: string;
                completedAt?: string;
                error?: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    list_campaigns: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            status: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            status?: string | undefined;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
            status?: string | undefined;
        }>;
        handler: (input: z.infer<typeof listCampaignsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaigns: {
                id: string;
                name: string;
                description?: string;
                status: string;
                createdAt: string;
                updatedAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
        }, {
            campaignId: string;
        }>;
        handler: (input: z.infer<typeof getCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaign: {
                id: string;
                name: string;
                description?: string;
                status: string;
                agentId?: string;
                workflowId?: string;
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    create_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            agentId: z.ZodOptional<z.ZodString>;
            workflowId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            agentId?: string | undefined;
            description?: string | undefined;
            workflowId?: string | undefined;
        }, {
            name: string;
            agentId?: string | undefined;
            description?: string | undefined;
            workflowId?: string | undefined;
        }>;
        handler: (input: z.infer<typeof createCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaign: {
                id: string;
                name: string;
                status: string;
                createdAt: string;
            };
            message: string;
        }>;
    };
    update_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
            status?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
        }, {
            campaignId: string;
            status?: string | undefined;
            name?: string | undefined;
            description?: string | undefined;
        }>;
        handler: (input: z.infer<typeof updateCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaign: {
                id: string;
                name: string;
                status: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    delete_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
        }, {
            campaignId: string;
        }>;
        handler: (input: z.infer<typeof deleteCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    start_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
        }, {
            campaignId: string;
        }>;
        handler: (input: z.infer<typeof startCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaign: {
                id: string;
                status: string;
                message: string;
            };
            message: string;
        }>;
    };
    pause_campaign: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
        }, {
            campaignId: string;
        }>;
        handler: (input: z.infer<typeof pauseCampaignSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            campaign: {
                id: string;
                status: string;
                message: string;
            };
            message: string;
        }>;
    };
    add_campaign_contacts: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
            contacts: z.ZodArray<z.ZodObject<{
                phoneNumber: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                customData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                phoneNumber: string;
                name?: string | undefined;
                customData?: Record<string, any> | undefined;
            }, {
                phoneNumber: string;
                name?: string | undefined;
                customData?: Record<string, any> | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
            contacts: {
                phoneNumber: string;
                name?: string | undefined;
                customData?: Record<string, any> | undefined;
            }[];
        }, {
            campaignId: string;
            contacts: {
                phoneNumber: string;
                name?: string | undefined;
                customData?: Record<string, any> | undefined;
            }[];
        }>;
        handler: (input: z.infer<typeof addCampaignContactsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            added: number;
            failed: number;
            message: string;
        }>;
    };
    get_campaign_stats: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            campaignId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            campaignId: string;
        }, {
            campaignId: string;
        }>;
        handler: (input: z.infer<typeof getCampaignStatsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            stats: {
                campaignId: string;
                stats: {
                    total: number;
                    queued: number;
                    inProgress: number;
                    completed: number;
                    failed: number;
                    suppressed: number;
                };
                percentComplete: number;
                successRate: number;
            };
            message: string;
        }>;
    };
    list_webhooks: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listWebhooksSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            webhooks: {
                id: string;
                url: string;
                events: string[];
                isActive: boolean;
                createdAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_webhook: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            webhookId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            webhookId: string;
        }, {
            webhookId: string;
        }>;
        handler: (input: z.infer<typeof getWebhookSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            webhook: {
                id: string;
                url: string;
                events: string[];
                isActive: boolean;
                secret?: string;
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    create_webhook: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            url: z.ZodString;
            events: z.ZodArray<z.ZodString, "many">;
            secret: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            events: string[];
            secret?: string | undefined;
        }, {
            url: string;
            events: string[];
            secret?: string | undefined;
        }>;
        handler: (input: z.infer<typeof createWebhookSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            webhook: {
                id: string;
                url: string;
                events: string[];
                isActive: boolean;
                createdAt: string;
            };
            message: string;
        }>;
    };
    update_webhook: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            webhookId: z.ZodString;
            url: z.ZodOptional<z.ZodString>;
            events: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            webhookId: string;
            url?: string | undefined;
            events?: string[] | undefined;
            isActive?: boolean | undefined;
        }, {
            webhookId: string;
            url?: string | undefined;
            events?: string[] | undefined;
            isActive?: boolean | undefined;
        }>;
        handler: (input: z.infer<typeof updateWebhookSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            webhook: {
                id: string;
                url: string;
                isActive: boolean;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    delete_webhook: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            webhookId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            webhookId: string;
        }, {
            webhookId: string;
        }>;
        handler: (input: z.infer<typeof deleteWebhookSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    test_webhook: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            webhookId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            webhookId: string;
        }, {
            webhookId: string;
        }>;
        handler: (input: z.infer<typeof testWebhookSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            statusCode: number | undefined;
            message: string;
        }>;
    };
    list_webhook_deliveries: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            webhookId: z.ZodString;
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            webhookId: string;
        }, {
            webhookId: string;
            page?: number | undefined;
            limit?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listWebhookDeliveriesSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            deliveries: {
                id: string;
                webhookId: string;
                event: string;
                status: string;
                statusCode?: number;
                responseTime?: number;
                error?: string;
                createdAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    list_tools: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
        }>;
        handler: (input: z.infer<typeof listToolsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            tools: {
                id: string;
                name: string;
                description?: string;
                url: string;
                createdAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_tool: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            toolId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            toolId: string;
        }, {
            toolId: string;
        }>;
        handler: (input: z.infer<typeof getToolSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            tool: {
                id: string;
                name: string;
                description?: string;
                url: string;
                parameters?: Record<string, unknown>;
                headers?: Record<string, string>;
                timeout?: number;
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    create_tool: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            url: z.ZodString;
            parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            secret: z.ZodOptional<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            timeout: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            description?: string | undefined;
            secret?: string | undefined;
            parameters?: Record<string, any> | undefined;
            headers?: Record<string, string> | undefined;
            timeout?: number | undefined;
        }, {
            name: string;
            url: string;
            description?: string | undefined;
            secret?: string | undefined;
            parameters?: Record<string, any> | undefined;
            headers?: Record<string, string> | undefined;
            timeout?: number | undefined;
        }>;
        handler: (input: z.infer<typeof createToolSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            tool: {
                id: string;
                name: string;
                url: string;
                createdAt: string;
            };
            message: string;
        }>;
    };
    update_tool: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            toolId: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            secret: z.ZodOptional<z.ZodString>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            timeout: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            toolId: string;
            description?: string | undefined;
            url?: string | undefined;
            secret?: string | undefined;
            parameters?: Record<string, any> | undefined;
            headers?: Record<string, string> | undefined;
            timeout?: number | undefined;
        }, {
            toolId: string;
            description?: string | undefined;
            url?: string | undefined;
            secret?: string | undefined;
            parameters?: Record<string, any> | undefined;
            headers?: Record<string, string> | undefined;
            timeout?: number | undefined;
        }>;
        handler: (input: z.infer<typeof updateToolSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            tool: {
                id: string;
                name: string;
                url: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    delete_tool: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            toolId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            toolId: string;
        }, {
            toolId: string;
        }>;
        handler: (input: z.infer<typeof deleteToolSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            message: string;
            warnings: string[] | undefined;
        }>;
    };
    test_tool: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            toolId: z.ZodString;
            testPayload: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            toolId: string;
            testPayload?: Record<string, any> | undefined;
        }, {
            toolId: string;
            testPayload?: Record<string, any> | undefined;
        }>;
        handler: (input: z.infer<typeof testToolSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            statusCode: number | undefined;
            response: unknown;
            responseTime: number | undefined;
            message: string;
        }>;
    };
    get_usage_analytics: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            startDate: z.ZodOptional<z.ZodString>;
            endDate: z.ZodOptional<z.ZodString>;
            granularity: z.ZodOptional<z.ZodEnum<["day", "week", "month"]>>;
        }, "strip", z.ZodTypeAny, {
            startDate?: string | undefined;
            endDate?: string | undefined;
            granularity?: "day" | "week" | "month" | undefined;
        }, {
            startDate?: string | undefined;
            endDate?: string | undefined;
            granularity?: "day" | "week" | "month" | undefined;
        }>;
        handler: (input: z.infer<typeof getUsageAnalyticsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            usage: {
                date: string;
                calls: number;
                minutes: number;
                transcriptionMinutes?: number;
            }[];
            totals: {
                calls: number;
                minutes: number;
                transcriptionMinutes?: number;
            };
            message: string;
        }>;
    };
    get_cost_analytics: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            startDate: z.ZodOptional<z.ZodString>;
            endDate: z.ZodOptional<z.ZodString>;
            granularity: z.ZodOptional<z.ZodEnum<["day", "week", "month"]>>;
        }, "strip", z.ZodTypeAny, {
            startDate?: string | undefined;
            endDate?: string | undefined;
            granularity?: "day" | "week" | "month" | undefined;
        }, {
            startDate?: string | undefined;
            endDate?: string | undefined;
            granularity?: "day" | "week" | "month" | undefined;
        }>;
        handler: (input: z.infer<typeof getCostAnalyticsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            costs: {
                date: string;
                total: number;
                breakdown?: {
                    llm?: number;
                    tts?: number;
                    stt?: number;
                    telephony?: number;
                } | undefined;
            }[];
            totals: {
                total: number;
                breakdown?: {
                    llm?: number;
                    tts?: number;
                    stt?: number;
                    telephony?: number;
                } | undefined;
            };
            message: string;
        }>;
    };
    list_providers: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: (_input: z.infer<typeof listProvidersSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            providers: {
                llm: {
                    id: string;
                    name: string;
                    category: string;
                }[];
                tts: {
                    id: string;
                    name: string;
                    category: string;
                }[];
                stt: {
                    id: string;
                    name: string;
                    category: string;
                }[];
            };
            message: string;
        }>;
    };
    list_voices: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            providerId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            providerId: string;
        }, {
            providerId: string;
        }>;
        handler: (input: z.infer<typeof listVoicesSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            voices: {
                id: string;
                name: string;
                gender?: string;
                language?: string;
                preview?: string;
            }[];
            message: string;
        }>;
    };
    list_models: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            providerId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            providerId: string;
        }, {
            providerId: string;
        }>;
        handler: (input: z.infer<typeof listModelsSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            models: {
                id: string;
                name: string;
                contextWindow?: number;
                maxTokens?: number;
            }[];
            message: string;
        }>;
    };
    submit_feedback: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            type: z.ZodEnum<["bug", "feature", "general"]>;
            subject: z.ZodString;
            description: z.ZodString;
            priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "bug" | "feature" | "general";
            description: string;
            subject: string;
            priority?: "low" | "medium" | "high" | undefined;
        }, {
            type: "bug" | "feature" | "general";
            description: string;
            subject: string;
            priority?: "low" | "medium" | "high" | undefined;
        }>;
        handler: (input: z.infer<typeof submitFeedbackSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            feedback: {
                id: string;
                type: string;
                subject: string;
                status: string;
                createdAt: string;
            };
            message: string;
        }>;
    };
    list_feedback: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            pageSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            pageSize: number;
            type?: string | undefined;
        }, {
            page?: number | undefined;
            pageSize?: number | undefined;
            type?: string | undefined;
        }>;
        handler: (input: z.infer<typeof listFeedbackSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            feedback: {
                id: string;
                type: string;
                subject: string;
                status: string;
                createdAt: string;
            }[];
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            } | undefined;
            message: string;
        }>;
    };
    get_feedback: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{
            feedbackId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            feedbackId: string;
        }, {
            feedbackId: string;
        }>;
        handler: (input: z.infer<typeof getFeedbackSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            feedback: {
                id: string;
                type: string;
                subject: string;
                description: string;
                status: string;
                priority?: string;
                createdAt: string;
                updatedAt: string;
            };
            message: string;
        }>;
    };
    get_schemas: {
        name: string;
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: (_input: z.infer<typeof getSchemasSchema>, ctx: ToolContext) => Promise<{
            success: boolean;
            schemas: Record<string, unknown>;
            version: string;
            message: string;
        }>;
    };
};
export type ToolName = keyof typeof tools;
export {};
//# sourceMappingURL=tools.d.ts.map