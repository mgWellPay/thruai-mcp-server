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

export class ThruAIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: ThruAIClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.thru.ai';
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1/public${path}`;

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'thruai-mcp-server/1.0.0',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json() as ApiResponse<T>;

    if (!response.ok || !data.success) {
      throw new Error(
        data.error?.message || `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return data.data as T;
  }

  // Agent endpoints
  async listAgents(params?: { page?: number; pageSize?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());

    const path = `/agents${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getAgent(agentId: string) {
    return this.request<{
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
    }>('GET', `/agents/${agentId}`);
  }

  async createAgent(data: {
    name: string;
    systemPrompt?: string;
    description?: string;
    pipelineMode?: 's2s' | 'traditional';
    s2sProvider?: string;
    s2sModel?: string;
    s2sVoice?: string;
    voiceConfig?: unknown;
    llmConfig?: unknown;
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      createdAt: string;
    }>('POST', '/agents', data);
  }

  async quickstart(data: {
    name: string;
    systemPrompt?: string;
    areaCode?: string;
    voice?: string;
    model?: string;
  }) {
    return this.request<{
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
    }>('POST', '/agents/quickstart', data);
  }

  // Call endpoints
  async listCalls(params?: {
    page?: number;
    pageSize?: number;
    agentId?: string;
    status?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());
    if (params?.agentId) query.set('agentId', params.agentId);
    if (params?.status) query.set('status', params.status);

    const path = `/calls${query.toString() ? `?${query}` : ''}`;
    return this.request<{
      calls: Array<{
        id: string;
        sessionId: string;
        agentId: string;
        direction: 'inbound' | 'outbound';
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
    }>('GET', path);
  }

  async getCall(callId: string) {
    return this.request<{
      id: string;
      sessionId: string;
      agentId: string;
      direction: 'inbound' | 'outbound';
      status: string;
      duration?: number;
      cost?: number;
      transcript?: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: string;
      }>;
      createdAt: string;
      completedAt?: string;
    }>('GET', `/calls/${callId}`);
  }

  async makeCall(data: {
    agentId: string;
    to: string;
    from?: string;
  }) {
    return this.request<{
      callId: string;
      sessionId: string;
      status: string;
      message: string;
    }>('POST', '/calls/outbound', data);
  }

  // Telephony endpoints
  async searchNumbers(params: {
    areaCode?: string;
    country?: string;
    limit?: number;
  }) {
    const query = new URLSearchParams();
    if (params.areaCode) query.set('areaCode', params.areaCode);
    if (params.country) query.set('country', params.country);
    if (params.limit) query.set('limit', params.limit.toString());

    const path = `/telephony/numbers/search?${query}`;
    return this.request<{
      numbers: Array<{
        phoneNumber: string;
        friendlyName?: string;
        locality?: string;
        region?: string;
        country: string;
      }>;
    }>('GET', path);
  }

  async provisionNumber(data: {
    phoneNumber: string;
    friendlyName?: string;
  }) {
    return this.request<{
      id: string;
      phoneNumber: string;
      friendlyName?: string;
      status: string;
      createdAt: string;
    }>('POST', '/telephony/numbers/provision', data);
  }

  async assignNumber(agentId: string, data: {
    phoneNumberId: string;
  }) {
    return this.request<{
      agentId: string;
      phoneNumberId: string;
      message: string;
    }>('POST', `/agents/${agentId}/telephony`, data);
  }

  async updateAgent(agentId: string, data: {
    name?: string;
    systemPrompt?: string;
    description?: string;
    status?: string;
    pipelineMode?: 's2s' | 'traditional';
    s2sVoice?: string;
    voiceConfig?: unknown;
    llmConfig?: unknown;
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      updatedAt: string;
    }>('PATCH', `/agents/${agentId}`, data);
  }

  async deleteAgent(agentId: string) {
    return this.request<{ message: string }>('DELETE', `/agents/${agentId}`);
  }

  // Workflow endpoints
  async listWorkflows(params?: { page?: number; pageSize?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());

    const path = `/workflows${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getWorkflow(workflowId: string) {
    return this.request<{
      id: string;
      name: string;
      description?: string;
      status: string;
      isPublished: boolean;
      nodes?: unknown[];
      edges?: unknown[];
      createdAt: string;
      updatedAt: string;
    }>('GET', `/workflows/${workflowId}`);
  }

  async createWorkflow(data: {
    name: string;
    description?: string;
    nodes?: unknown[];
    edges?: unknown[];
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      createdAt: string;
    }>('POST', '/workflows', data);
  }

  async updateWorkflow(workflowId: string, data: {
    name?: string;
    description?: string;
    nodes?: unknown[];
    edges?: unknown[];
    status?: string;
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      updatedAt: string;
    }>('PATCH', `/workflows/${workflowId}`, data);
  }

  async deleteWorkflow(workflowId: string) {
    return this.request<{ message: string }>('DELETE', `/workflows/${workflowId}`);
  }

  async publishWorkflow(workflowId: string) {
    return this.request<{
      id: string;
      isPublished: boolean;
      publishedAt: string;
    }>('POST', `/workflows/${workflowId}/publish`);
  }

  async unpublishWorkflow(workflowId: string) {
    return this.request<{
      id: string;
      isPublished: boolean;
    }>('POST', `/workflows/${workflowId}/unpublish`);
  }

  async triggerWorkflow(workflowId: string, data?: {
    input?: Record<string, unknown>;
  }) {
    return this.request<{
      executionId: string;
      status: string;
      message: string;
    }>('POST', `/workflows/${workflowId}/trigger`, data);
  }

  async listWorkflowExecutions(workflowId: string, params?: {
    page?: number;
    pageSize?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());

    const path = `/workflows/${workflowId}/executions${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  // Campaign endpoints
  async listCampaigns(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());
    if (params?.status) query.set('status', params.status);

    const path = `/campaigns${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getCampaign(campaignId: string) {
    return this.request<{
      id: string;
      name: string;
      description?: string;
      status: string;
      agentId?: string;
      workflowId?: string;
      createdAt: string;
      updatedAt: string;
    }>('GET', `/campaigns/${campaignId}`);
  }

  async createCampaign(data: {
    name: string;
    description?: string;
    agentId?: string;
    workflowId?: string;
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      createdAt: string;
    }>('POST', '/campaigns', data);
  }

  async updateCampaign(campaignId: string, data: {
    name?: string;
    description?: string;
    status?: string;
  }) {
    return this.request<{
      id: string;
      name: string;
      status: string;
      updatedAt: string;
    }>('PATCH', `/campaigns/${campaignId}`, data);
  }

  async deleteCampaign(campaignId: string) {
    return this.request<{ message: string }>('DELETE', `/campaigns/${campaignId}`);
  }

  async startCampaign(campaignId: string) {
    return this.request<{
      id: string;
      status: string;
      message: string;
    }>('POST', `/campaigns/${campaignId}/start`);
  }

  async pauseCampaign(campaignId: string) {
    return this.request<{
      id: string;
      status: string;
      message: string;
    }>('POST', `/campaigns/${campaignId}/pause`);
  }

  async addCampaignContacts(campaignId: string, data: {
    contacts: Array<{
      phoneNumber: string;
      name?: string;
      customData?: Record<string, unknown>;
    }>;
  }) {
    return this.request<{
      added: number;
      failed: number;
      message: string;
    }>('POST', `/campaigns/${campaignId}/contacts`, data);
  }

  async getCampaignStats(campaignId: string) {
    return this.request<{
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
    }>('GET', `/campaigns/${campaignId}/stats`);
  }

  // Webhook endpoints
  async listWebhooks(params?: { page?: number; pageSize?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());

    const path = `/webhooks${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getWebhook(webhookId: string) {
    return this.request<{
      id: string;
      url: string;
      events: string[];
      isActive: boolean;
      secret?: string;
      createdAt: string;
      updatedAt: string;
    }>('GET', `/webhooks/${webhookId}`);
  }

  async createWebhook(data: {
    url: string;
    events: string[];
    secret?: string;
  }) {
    return this.request<{
      id: string;
      url: string;
      events: string[];
      isActive: boolean;
      createdAt: string;
    }>('POST', '/webhooks', data);
  }

  async updateWebhook(webhookId: string, data: {
    url?: string;
    events?: string[];
    isActive?: boolean;
  }) {
    return this.request<{
      id: string;
      url: string;
      isActive: boolean;
      updatedAt: string;
    }>('PATCH', `/webhooks/${webhookId}`, data);
  }

  async deleteWebhook(webhookId: string) {
    return this.request<{ message: string }>('DELETE', `/webhooks/${webhookId}`);
  }

  async testWebhook(webhookId: string) {
    return this.request<{
      success: boolean;
      statusCode?: number;
      message: string;
    }>('POST', `/webhooks/${webhookId}/test`);
  }

  async listWebhookDeliveries(webhookId: string, params?: {
    page?: number;
    limit?: number;
    offset?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());

    const path = `/webhooks/${webhookId}/deliveries${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  // Custom Tools endpoints
  async listTools(params?: { page?: number; pageSize?: number }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());

    const path = `/tools${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getTool(toolId: string) {
    return this.request<{
      id: string;
      name: string;
      description?: string;
      url: string;
      parameters?: Record<string, unknown>;
      headers?: Record<string, string>;
      timeout?: number;
      createdAt: string;
      updatedAt: string;
    }>('GET', `/tools/${toolId}`);
  }

  async createTool(data: {
    name: string;
    description?: string;
    url: string;
    parameters?: Record<string, unknown>;
    secret?: string;
    headers?: Record<string, string>;
    timeout?: number;
  }) {
    return this.request<{
      id: string;
      name: string;
      url: string;
      createdAt: string;
    }>('POST', '/tools', data);
  }

  async updateTool(toolId: string, data: {
    description?: string;
    url?: string;
    parameters?: Record<string, unknown>;
    secret?: string;
    headers?: Record<string, string>;
    timeout?: number;
  }) {
    return this.request<{
      id: string;
      name: string;
      url: string;
      updatedAt: string;
    }>('PATCH', `/tools/${toolId}`, data);
  }

  async deleteTool(toolId: string) {
    return this.request<{
      message: string;
      warnings?: string[];
    }>('DELETE', `/tools/${toolId}`);
  }

  async testTool(toolId: string, data?: {
    testPayload?: Record<string, unknown>;
  }) {
    return this.request<{
      success: boolean;
      statusCode?: number;
      response?: unknown;
      responseTime?: number;
      error?: string;
    }>('POST', `/tools/${toolId}/test`, data);
  }

  // Analytics endpoints
  async getUsageAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    granularity?: 'day' | 'week' | 'month';
  }) {
    const query = new URLSearchParams();
    if (params?.startDate) query.set('startDate', params.startDate);
    if (params?.endDate) query.set('endDate', params.endDate);
    if (params?.granularity) query.set('granularity', params.granularity);

    const path = `/analytics/usage${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getCostAnalytics(params?: {
    startDate?: string;
    endDate?: string;
    granularity?: 'day' | 'week' | 'month';
  }) {
    const query = new URLSearchParams();
    if (params?.startDate) query.set('startDate', params.startDate);
    if (params?.endDate) query.set('endDate', params.endDate);
    if (params?.granularity) query.set('granularity', params.granularity);

    const path = `/analytics/costs${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  // Provider endpoints
  async listProviders() {
    return this.request<{
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
    }>('GET', '/providers');
  }

  async listVoices(providerId: string) {
    return this.request<{
      voices: Array<{
        id: string;
        name: string;
        gender?: string;
        language?: string;
        preview?: string;
      }>;
    }>('GET', `/providers/${providerId}/voices`);
  }

  async listModels(providerId: string) {
    return this.request<{
      models: Array<{
        id: string;
        name: string;
        contextWindow?: number;
        maxTokens?: number;
      }>;
    }>('GET', `/providers/${providerId}/models`);
  }

  // Feedback endpoints
  async submitFeedback(data: {
    type: 'bug' | 'feature' | 'general';
    subject: string;
    description: string;
    priority?: 'low' | 'medium' | 'high';
  }) {
    return this.request<{
      id: string;
      type: string;
      subject: string;
      status: string;
      createdAt: string;
    }>('POST', '/feedback', data);
  }

  async listFeedback(params?: {
    page?: number;
    pageSize?: number;
    type?: string;
  }) {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', params.page.toString());
    if (params?.pageSize) query.set('pageSize', params.pageSize.toString());
    if (params?.type) query.set('type', params.type);

    const path = `/feedback${query.toString() ? `?${query}` : ''}`;
    return this.request<{
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
    }>('GET', path);
  }

  async getFeedback(feedbackId: string) {
    return this.request<{
      id: string;
      type: string;
      subject: string;
      description: string;
      status: string;
      priority?: string;
      createdAt: string;
      updatedAt: string;
    }>('GET', `/feedback/${feedbackId}`);
  }

  // Schema discovery endpoint
  async getSchemas() {
    return this.request<{
      schemas: Record<string, unknown>;
      version: string;
    }>('GET', '/_debug/schemas');
  }
}
