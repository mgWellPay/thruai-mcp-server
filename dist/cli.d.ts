#!/usr/bin/env node
/**
 * ThruAI MCP Server - CLI Entry Point
 *
 * Runs the MCP server using stdio transport for use with Claude Code
 * and other MCP-compatible AI assistants.
 *
 * Usage:
 *   THRUAI_API_KEY=sk_live_... npx @thruai/mcp-server
 *
 * Or configure in Claude Code settings (~/.config/claude-code/config.json):
 *   {
 *     "mcpServers": {
 *       "thruai": {
 *         "command": "npx",
 *         "args": ["@thruai/mcp-server"],
 *         "env": {
 *           "THRUAI_API_KEY": "sk_live_...",
 *           "THRUAI_BASE_URL": "https://api.thru.ai"
 *         }
 *       }
 *     }
 *   }
 */
export {};
//# sourceMappingURL=cli.d.ts.map