/**
 * ThruAI MCP Server
 *
 * Model Context Protocol server for ThruAI voice agent platform.
 * Enables AI assistants like Claude to create and manage voice agents.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ThruAIClient } from './api-client.js';
import { tools, ToolContext } from './tools.js';
import { registerResources } from './resources.js';

export interface McpServerOptions {
  apiKey: string;
  baseUrl?: string;
}

/**
 * Create a ThruAI MCP server instance
 */
export function createThruAIMcpServer(options: McpServerOptions): McpServer {
  const client = new ThruAIClient({
    apiKey: options.apiKey,
    baseUrl: options.baseUrl,
  });

  const server = new McpServer({
    name: 'thruai',
    version: '1.0.0',
  });

  // Register resources (read-only data sources)
  registerResources(server, client);

  const context: ToolContext = { client };

  // Register all tools
  for (const [_name, tool] of Object.entries(tools)) {
    const toolDef = tool as {
      name: string;
      description: string;
      inputSchema: z.ZodType<unknown>;
      handler: (input: unknown, ctx: ToolContext) => Promise<unknown>;
    };

    // Convert Zod schema to JSON Schema for MCP
    const jsonSchema = zodToJsonSchema(toolDef.inputSchema);

    server.tool(
      toolDef.name,
      toolDef.description,
      jsonSchema,
      async (args: Record<string, unknown>) => {
        try {
          // Parse and validate input
          const parseResult = toolDef.inputSchema.safeParse(args);
          if (!parseResult.success) {
            throw new Error(`Invalid input: ${parseResult.error.message}`);
          }

          // Execute the tool
          const result = await toolDef.handler(parseResult.data, context);

          // Return formatted result
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(
                  {
                    success: false,
                    error: errorMessage,
                  },
                  null,
                  2
                ),
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  return server;
}

/**
 * Convert a Zod schema to JSON Schema for MCP
 */
function zodToJsonSchema(schema: z.ZodType<unknown>): Record<string, unknown> {
  // Handle ZodObject
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const [key, value] of Object.entries(shape)) {
      const zodValue = value as z.ZodType<unknown>;
      properties[key] = zodToJsonSchema(zodValue);

      // Check if field is required (not optional and no default)
      if (
        !(zodValue instanceof z.ZodOptional) &&
        !(zodValue instanceof z.ZodDefault)
      ) {
        required.push(key);
      }
    }

    return {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined,
    };
  }

  // Handle ZodString
  if (schema instanceof z.ZodString) {
    const result: Record<string, unknown> = { type: 'string' };
    if (schema.description) result.description = schema.description;
    // Extract min length if present
    const checks = (schema as any)._def?.checks || [];
    const minCheck = checks.find((c: any) => c.kind === 'min');
    if (minCheck) result.minLength = minCheck.value;
    return result;
  }

  // Handle ZodNumber
  if (schema instanceof z.ZodNumber) {
    const result: Record<string, unknown> = { type: 'number' };
    if (schema.description) result.description = schema.description;
    return result;
  }

  // Handle ZodBoolean
  if (schema instanceof z.ZodBoolean) {
    const result: Record<string, unknown> = { type: 'boolean' };
    if (schema.description) result.description = schema.description;
    return result;
  }

  // Handle ZodEnum
  if (schema instanceof z.ZodEnum) {
    const result: Record<string, unknown> = {
      type: 'string',
      enum: schema.options,
    };
    if (schema.description) result.description = schema.description;
    return result;
  }

  // Handle ZodOptional
  if (schema instanceof z.ZodOptional) {
    return zodToJsonSchema(schema.unwrap());
  }

  // Handle ZodDefault
  if (schema instanceof z.ZodDefault) {
    const inner = zodToJsonSchema(schema._def.innerType);
    return { ...inner, default: schema._def.defaultValue() };
  }

  // Handle ZodArray
  if (schema instanceof z.ZodArray) {
    const result: Record<string, unknown> = {
      type: 'array',
      items: zodToJsonSchema(schema.element),
    };
    if (schema.description) result.description = schema.description;
    return result;
  }

  // Handle ZodRecord
  if (schema instanceof z.ZodRecord) {
    return {
      type: 'object',
      additionalProperties: zodToJsonSchema(schema._def.valueType),
    };
  }

  // Fallback for unknown types
  return { type: 'object' };
}

export { ThruAIClient, tools };
export type { ToolContext };
