/**
 * ThruAI MCP Server
 *
 * Model Context Protocol server for ThruAI voice agent platform.
 * Enables AI assistants like Claude to create and manage voice agents.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ThruAIClient } from './api-client.js';
import { tools, ToolContext } from './tools.js';
export interface McpServerOptions {
    apiKey: string;
    baseUrl?: string;
}
/**
 * Create a ThruAI MCP server instance
 */
export declare function createThruAIMcpServer(options: McpServerOptions): McpServer;
export { ThruAIClient, tools };
export type { ToolContext };
//# sourceMappingURL=index.d.ts.map