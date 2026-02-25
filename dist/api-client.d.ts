/**
 * ThruAI API Client
 *
 * HTTP client for the ThruAI public API.
 * Uses native fetch (Node 18+) for zero dependencies.
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T | null;
    error?: {
        code: string;
        message: string;
    };
    meta?: {
        requestId?: string;
        timestamp?: string;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    };
}
export interface ThruAIClientConfig {
    apiKey: string;
    baseUrl?: string;
}
export declare class ThruAIClient {
    private apiKey;
    private baseUrl;
    constructor(config: ThruAIClientConfig);
    private request;
    listAgents(params?: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        agents: Array<{
            id: string;
            name: string;
            description?: string;
            status: string;
            pipelineMode?: string;
            createdAt: string;
            updatedAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getAgent(agentId: string): Promise<{
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
    }>;
    createAgent(data: {
        name: string;
        systemPrompt?: string;
        description?: string;
        pipelineMode?: 's2s' | 'traditional';
        s2sProvider?: string;
        s2sModel?: string;
        s2sVoice?: string;
        voiceConfig?: unknown;
        llmConfig?: unknown;
    }): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: string;
    }>;
    quickstart(data: {
        name: string;
        systemPrompt?: string;
        areaCode?: string;
        voice?: string;
        model?: string;
    }): Promise<{
        agent: {
            id: string;
            name: string;
            status: string;
            createdAt: string;
        };
        phoneNumber?: {
            id: string;
            phoneNumber: string;
            friendlyName?: string;
            status: string;
        };
        error?: {
            message: string;
            details: string;
        };
    }>;
    listCalls(params?: {
        page?: number;
        pageSize?: number;
        agentId?: string;
        status?: string;
    }): Promise<{
        calls: Array<{
            id: string;
            sessionId: string;
            agentId: string;
            direction: "inbound" | "outbound";
            status: string;
            duration?: number;
            cost?: number;
            createdAt: string;
            completedAt?: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getCall(callId: string): Promise<{
        id: string;
        sessionId: string;
        agentId: string;
        direction: "inbound" | "outbound";
        status: string;
        duration?: number;
        cost?: number;
        transcript?: Array<{
            role: "user" | "assistant";
            content: string;
            timestamp: string;
        }>;
        createdAt: string;
        completedAt?: string;
    }>;
    makeCall(data: {
        agentId: string;
        to: string;
        from?: string;
    }): Promise<{
        callId: string;
        sessionId: string;
        status: string;
        message: string;
    }>;
    searchNumbers(params: {
        areaCode?: string;
        country?: string;
        limit?: number;
    }): Promise<{
        numbers: Array<{
            phoneNumber: string;
            friendlyName?: string;
            locality?: string;
            region?: string;
            country: string;
        }>;
    }>;
    provisionNumber(data: {
        phoneNumber: string;
        friendlyName?: string;
    }): Promise<{
        id: string;
        phoneNumber: string;
        friendlyName?: string;
        status: string;
        createdAt: string;
    }>;
    assignNumber(agentId: string, data: {
        phoneNumberId: string;
    }): Promise<{
        agentId: string;
        phoneNumberId: string;
        message: string;
    }>;
    updateAgent(agentId: string, data: {
        name?: string;
        systemPrompt?: string;
        description?: string;
        status?: string;
        pipelineMode?: 's2s' | 'traditional';
        s2sVoice?: string;
        voiceConfig?: unknown;
        llmConfig?: unknown;
    }): Promise<{
        id: string;
        name: string;
        status: string;
        updatedAt: string;
    }>;
    deleteAgent(agentId: string): Promise<{
        message: string;
    }>;
    listWorkflows(params?: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        workflows: Array<{
            id: string;
            name: string;
            description?: string;
            status: string;
            isPublished: boolean;
            createdAt: string;
            updatedAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getWorkflow(workflowId: string): Promise<{
        id: string;
        name: string;
        description?: string;
        status: string;
        isPublished: boolean;
        nodes?: unknown[];
        edges?: unknown[];
        createdAt: string;
        updatedAt: string;
    }>;
    createWorkflow(data: {
        name: string;
        description?: string;
        nodes?: unknown[];
        edges?: unknown[];
    }): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: string;
    }>;
    updateWorkflow(workflowId: string, data: {
        name?: string;
        description?: string;
        nodes?: unknown[];
        edges?: unknown[];
        status?: string;
    }): Promise<{
        id: string;
        name: string;
        status: string;
        updatedAt: string;
    }>;
    deleteWorkflow(workflowId: string): Promise<{
        message: string;
    }>;
    publishWorkflow(workflowId: string): Promise<{
        id: string;
        isPublished: boolean;
        publishedAt: string;
    }>;
    unpublishWorkflow(workflowId: string): Promise<{
        id: string;
        isPublished: boolean;
    }>;
    triggerWorkflow(workflowId: string, data?: {
        input?: Record<string, unknown>;
    }): Promise<{
        executionId: string;
        status: string;
        message: string;
    }>;
    listWorkflowExecutions(workflowId: string, params?: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        executions: Array<{
            id: string;
            workflowId: string;
            status: string;
            startedAt: string;
            completedAt?: string;
            error?: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    listCampaigns(params?: {
        page?: number;
        pageSize?: number;
        status?: string;
    }): Promise<{
        campaigns: Array<{
            id: string;
            name: string;
            description?: string;
            status: string;
            createdAt: string;
            updatedAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getCampaign(campaignId: string): Promise<{
        id: string;
        name: string;
        description?: string;
        status: string;
        agentId?: string;
        workflowId?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    createCampaign(data: {
        name: string;
        description?: string;
        agentId?: string;
        workflowId?: string;
    }): Promise<{
        id: string;
        name: string;
        status: string;
        createdAt: string;
    }>;
    updateCampaign(campaignId: string, data: {
        name?: string;
        description?: string;
        status?: string;
    }): Promise<{
        id: string;
        name: string;
        status: string;
        updatedAt: string;
    }>;
    deleteCampaign(campaignId: string): Promise<{
        message: string;
    }>;
    startCampaign(campaignId: string): Promise<{
        id: string;
        status: string;
        message: string;
    }>;
    pauseCampaign(campaignId: string): Promise<{
        id: string;
        status: string;
        message: string;
    }>;
    addCampaignContacts(campaignId: string, data: {
        contacts: Array<{
            phoneNumber: string;
            name?: string;
            customData?: Record<string, unknown>;
        }>;
    }): Promise<{
        added: number;
        failed: number;
        message: string;
    }>;
    getCampaignStats(campaignId: string): Promise<{
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
    }>;
    listWebhooks(params?: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        webhooks: Array<{
            id: string;
            url: string;
            events: string[];
            isActive: boolean;
            createdAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getWebhook(webhookId: string): Promise<{
        id: string;
        url: string;
        events: string[];
        isActive: boolean;
        secret?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    createWebhook(data: {
        url: string;
        events: string[];
        secret?: string;
    }): Promise<{
        id: string;
        url: string;
        events: string[];
        isActive: boolean;
        createdAt: string;
    }>;
    updateWebhook(webhookId: string, data: {
        url?: string;
        events?: string[];
        isActive?: boolean;
    }): Promise<{
        id: string;
        url: string;
        isActive: boolean;
        updatedAt: string;
    }>;
    deleteWebhook(webhookId: string): Promise<{
        message: string;
    }>;
    testWebhook(webhookId: string): Promise<{
        success: boolean;
        statusCode?: number;
        message: string;
    }>;
    listWebhookDeliveries(webhookId: string, params?: {
        page?: number;
        limit?: number;
        offset?: number;
    }): Promise<{
        deliveries: Array<{
            id: string;
            webhookId: string;
            event: string;
            status: string;
            statusCode?: number;
            responseTime?: number;
            error?: string;
            createdAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    listTools(params?: {
        page?: number;
        pageSize?: number;
    }): Promise<{
        tools: Array<{
            id: string;
            name: string;
            description?: string;
            url: string;
            createdAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getTool(toolId: string): Promise<{
        id: string;
        name: string;
        description?: string;
        url: string;
        parameters?: Record<string, unknown>;
        headers?: Record<string, string>;
        timeout?: number;
        createdAt: string;
        updatedAt: string;
    }>;
    createTool(data: {
        name: string;
        description?: string;
        url: string;
        parameters?: Record<string, unknown>;
        secret?: string;
        headers?: Record<string, string>;
        timeout?: number;
    }): Promise<{
        id: string;
        name: string;
        url: string;
        createdAt: string;
    }>;
    updateTool(toolId: string, data: {
        description?: string;
        url?: string;
        parameters?: Record<string, unknown>;
        secret?: string;
        headers?: Record<string, string>;
        timeout?: number;
    }): Promise<{
        id: string;
        name: string;
        url: string;
        updatedAt: string;
    }>;
    deleteTool(toolId: string): Promise<{
        message: string;
        warnings?: string[];
    }>;
    testTool(toolId: string, data?: {
        testPayload?: Record<string, unknown>;
    }): Promise<{
        success: boolean;
        statusCode?: number;
        response?: unknown;
        responseTime?: number;
        error?: string;
    }>;
    getUsageAnalytics(params?: {
        startDate?: string;
        endDate?: string;
        granularity?: 'day' | 'week' | 'month';
    }): Promise<{
        usage: Array<{
            date: string;
            calls: number;
            minutes: number;
            transcriptionMinutes?: number;
        }>;
        totals: {
            calls: number;
            minutes: number;
            transcriptionMinutes?: number;
        };
    }>;
    getCostAnalytics(params?: {
        startDate?: string;
        endDate?: string;
        granularity?: 'day' | 'week' | 'month';
    }): Promise<{
        costs: Array<{
            date: string;
            total: number;
            breakdown?: {
                llm?: number;
                tts?: number;
                stt?: number;
                telephony?: number;
            };
        }>;
        totals: {
            total: number;
            breakdown?: {
                llm?: number;
                tts?: number;
                stt?: number;
                telephony?: number;
            };
        };
    }>;
    listProviders(): Promise<{
        providers: {
            llm: Array<{
                id: string;
                name: string;
                category: string;
            }>;
            tts: Array<{
                id: string;
                name: string;
                category: string;
            }>;
            stt: Array<{
                id: string;
                name: string;
                category: string;
            }>;
        };
    }>;
    listVoices(providerId: string): Promise<{
        voices: Array<{
            id: string;
            name: string;
            gender?: string;
            language?: string;
            preview?: string;
        }>;
    }>;
    listModels(providerId: string): Promise<{
        models: Array<{
            id: string;
            name: string;
            contextWindow?: number;
            maxTokens?: number;
        }>;
    }>;
    submitFeedback(data: {
        type: 'bug' | 'feature' | 'general';
        subject: string;
        description: string;
        priority?: 'low' | 'medium' | 'high';
    }): Promise<{
        id: string;
        type: string;
        subject: string;
        status: string;
        createdAt: string;
    }>;
    listFeedback(params?: {
        page?: number;
        pageSize?: number;
        type?: string;
    }): Promise<{
        feedback: Array<{
            id: string;
            type: string;
            subject: string;
            status: string;
            createdAt: string;
        }>;
        pagination?: {
            page: number;
            pageSize: number;
            total: number;
        };
    }>;
    getFeedback(feedbackId: string): Promise<{
        id: string;
        type: string;
        subject: string;
        description: string;
        status: string;
        priority?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    getSchemas(): Promise<{
        schemas: Record<string, unknown>;
        version: string;
    }>;
}
//# sourceMappingURL=api-client.d.ts.map