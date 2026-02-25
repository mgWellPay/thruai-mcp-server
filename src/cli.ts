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

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createThruAIMcpServer } from './index.js';

async function main() {
  // Get configuration from environment
  const apiKey = process.env.THRUAI_API_KEY;
  const baseUrl = process.env.THRUAI_BASE_URL || 'https://api.thru.ai';

  if (!apiKey) {
    console.error('❌ Error: THRUAI_API_KEY environment variable is required');
    console.error('');
    console.error('Usage:');
    console.error('  THRUAI_API_KEY=sk_live_... npx @thruai/mcp-server');
    console.error('');
    console.error('Or configure in Claude Code settings:');
    console.error('  {');
    console.error('    "mcpServers": {');
    console.error('      "thruai": {');
    console.error('        "command": "npx",');
    console.error('        "args": ["@thruai/mcp-server"],');
    console.error('        "env": {');
    console.error('          "THRUAI_API_KEY": "sk_live_...",');
    console.error('          "THRUAI_BASE_URL": "https://api.thru.ai"');
    console.error('        }');
    console.error('      }');
    console.error('    }');
    console.error('  }');
    console.error('');
    console.error('Get your API key at: https://thru.ai/settings/api-keys');
    process.exit(1);
  }

  // Validate API key format
  if (!apiKey.startsWith('sk_live_') && !apiKey.startsWith('sk_test_')) {
    console.error('❌ Error: Invalid API key format');
    console.error('');
    console.error('API keys should start with sk_live_ or sk_test_');
    console.error('Get your API key at: https://thru.ai/settings/api-keys');
    process.exit(1);
  }

  try {
    // Create MCP server
    const server = createThruAIMcpServer({
      apiKey,
      baseUrl,
    });

    // Connect via stdio
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // Log to stderr (stdout is used for MCP protocol)
    console.error('✅ ThruAI MCP server ready');
    console.error(`📡 Connected to: ${baseUrl}`);
    console.error('');
    console.error('Available tools:');
    console.error('  • quickstart - Create agent + phone number in one call');
    console.error('  • create_agent - Create a voice agent');
    console.error('  • make_call - Make an outbound call');
    console.error('  • list_agents - List all agents');
    console.error('  • list_calls - List recent calls with transcripts');
    console.error('  • get_call - Get call details and transcript');
    console.error('  • search_numbers - Search available phone numbers');
    console.error('  • provision_number - Purchase a phone number');
    console.error('  • assign_number - Assign number to agent');
  } catch (error) {
    console.error('❌ Fatal error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
