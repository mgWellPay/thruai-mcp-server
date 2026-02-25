/**
 * ThruAI MCP Resources
 *
 * Resources provide read-only access to platform data that AI agents can query.
 * Resources are like "files" that agents can read to understand the current state.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ThruAIClient } from './api-client.js';
export declare function registerResources(server: McpServer, client: ThruAIClient): void;
//# sourceMappingURL=resources.d.ts.map