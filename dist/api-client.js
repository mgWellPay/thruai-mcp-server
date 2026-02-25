/**
 * ThruAI API Client
 *
 * HTTP client for the ThruAI public API.
 * Uses native fetch (Node 18+) for zero dependencies.
 */
export class ThruAIClient {
    apiKey;
    baseUrl;
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || 'https://api.thru.ai';
    }
    async request(method, path, body) {
        const url = `${this.baseUrl}/api/v1/public${path}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'thruai-mcp-server/1.0.0',
        };
        const options = {
            method,
            headers,
        };
        if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok || !data.success) {
            throw new Error(data.error?.message || `API request failed: ${response.status} ${response.statusText}`);
        }
        return data.data;
    }
    // Agent endpoints
    async listAgents(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        const path = `/agents${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getAgent(agentId) {
        return this.request('GET', `/agents/${agentId}`);
    }
    async createAgent(data) {
        return this.request('POST', '/agents', data);
    }
    async quickstart(data) {
        return this.request('POST', '/agents/quickstart', data);
    }
    // Call endpoints
    async listCalls(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        if (params?.agentId)
            query.set('agentId', params.agentId);
        if (params?.status)
            query.set('status', params.status);
        const path = `/calls${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getCall(callId) {
        return this.request('GET', `/calls/${callId}`);
    }
    async makeCall(data) {
        return this.request('POST', '/calls/outbound', data);
    }
    // Telephony endpoints
    async searchNumbers(params) {
        const query = new URLSearchParams();
        if (params.areaCode)
            query.set('areaCode', params.areaCode);
        if (params.country)
            query.set('country', params.country);
        if (params.limit)
            query.set('limit', params.limit.toString());
        const path = `/telephony/numbers/search?${query}`;
        return this.request('GET', path);
    }
    async provisionNumber(data) {
        return this.request('POST', '/telephony/numbers/provision', data);
    }
    async assignNumber(agentId, data) {
        return this.request('POST', `/agents/${agentId}/telephony`, data);
    }
    async updateAgent(agentId, data) {
        return this.request('PATCH', `/agents/${agentId}`, data);
    }
    async deleteAgent(agentId) {
        return this.request('DELETE', `/agents/${agentId}`);
    }
    // Workflow endpoints
    async listWorkflows(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        const path = `/workflows${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getWorkflow(workflowId) {
        return this.request('GET', `/workflows/${workflowId}`);
    }
    async createWorkflow(data) {
        return this.request('POST', '/workflows', data);
    }
    async updateWorkflow(workflowId, data) {
        return this.request('PATCH', `/workflows/${workflowId}`, data);
    }
    async deleteWorkflow(workflowId) {
        return this.request('DELETE', `/workflows/${workflowId}`);
    }
    async publishWorkflow(workflowId) {
        return this.request('POST', `/workflows/${workflowId}/publish`);
    }
    async unpublishWorkflow(workflowId) {
        return this.request('POST', `/workflows/${workflowId}/unpublish`);
    }
    async triggerWorkflow(workflowId, data) {
        return this.request('POST', `/workflows/${workflowId}/trigger`, data);
    }
    async listWorkflowExecutions(workflowId, params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        const path = `/workflows/${workflowId}/executions${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    // Campaign endpoints
    async listCampaigns(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        if (params?.status)
            query.set('status', params.status);
        const path = `/campaigns${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getCampaign(campaignId) {
        return this.request('GET', `/campaigns/${campaignId}`);
    }
    async createCampaign(data) {
        return this.request('POST', '/campaigns', data);
    }
    async updateCampaign(campaignId, data) {
        return this.request('PATCH', `/campaigns/${campaignId}`, data);
    }
    async deleteCampaign(campaignId) {
        return this.request('DELETE', `/campaigns/${campaignId}`);
    }
    async startCampaign(campaignId) {
        return this.request('POST', `/campaigns/${campaignId}/start`);
    }
    async pauseCampaign(campaignId) {
        return this.request('POST', `/campaigns/${campaignId}/pause`);
    }
    async addCampaignContacts(campaignId, data) {
        return this.request('POST', `/campaigns/${campaignId}/contacts`, data);
    }
    async getCampaignStats(campaignId) {
        return this.request('GET', `/campaigns/${campaignId}/stats`);
    }
    // Webhook endpoints
    async listWebhooks(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        const path = `/webhooks${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getWebhook(webhookId) {
        return this.request('GET', `/webhooks/${webhookId}`);
    }
    async createWebhook(data) {
        return this.request('POST', '/webhooks', data);
    }
    async updateWebhook(webhookId, data) {
        return this.request('PATCH', `/webhooks/${webhookId}`, data);
    }
    async deleteWebhook(webhookId) {
        return this.request('DELETE', `/webhooks/${webhookId}`);
    }
    async testWebhook(webhookId) {
        return this.request('POST', `/webhooks/${webhookId}/test`);
    }
    async listWebhookDeliveries(webhookId, params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.limit)
            query.set('limit', params.limit.toString());
        if (params?.offset)
            query.set('offset', params.offset.toString());
        const path = `/webhooks/${webhookId}/deliveries${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    // Custom Tools endpoints
    async listTools(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        const path = `/tools${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getTool(toolId) {
        return this.request('GET', `/tools/${toolId}`);
    }
    async createTool(data) {
        return this.request('POST', '/tools', data);
    }
    async updateTool(toolId, data) {
        return this.request('PATCH', `/tools/${toolId}`, data);
    }
    async deleteTool(toolId) {
        return this.request('DELETE', `/tools/${toolId}`);
    }
    async testTool(toolId, data) {
        return this.request('POST', `/tools/${toolId}/test`, data);
    }
    // Analytics endpoints
    async getUsageAnalytics(params) {
        const query = new URLSearchParams();
        if (params?.startDate)
            query.set('startDate', params.startDate);
        if (params?.endDate)
            query.set('endDate', params.endDate);
        if (params?.granularity)
            query.set('granularity', params.granularity);
        const path = `/analytics/usage${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getCostAnalytics(params) {
        const query = new URLSearchParams();
        if (params?.startDate)
            query.set('startDate', params.startDate);
        if (params?.endDate)
            query.set('endDate', params.endDate);
        if (params?.granularity)
            query.set('granularity', params.granularity);
        const path = `/analytics/costs${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    // Provider endpoints
    async listProviders() {
        return this.request('GET', '/providers');
    }
    async listVoices(providerId) {
        return this.request('GET', `/providers/${providerId}/voices`);
    }
    async listModels(providerId) {
        return this.request('GET', `/providers/${providerId}/models`);
    }
    // Feedback endpoints
    async submitFeedback(data) {
        return this.request('POST', '/feedback', data);
    }
    async listFeedback(params) {
        const query = new URLSearchParams();
        if (params?.page)
            query.set('page', params.page.toString());
        if (params?.pageSize)
            query.set('pageSize', params.pageSize.toString());
        if (params?.type)
            query.set('type', params.type);
        const path = `/feedback${query.toString() ? `?${query}` : ''}`;
        return this.request('GET', path);
    }
    async getFeedback(feedbackId) {
        return this.request('GET', `/feedback/${feedbackId}`);
    }
    // Schema discovery endpoint
    async getSchemas() {
        return this.request('GET', '/_debug/schemas');
    }
}
//# sourceMappingURL=api-client.js.map