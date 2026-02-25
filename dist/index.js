/**
 * ThruAI MCP Server
 *
 * Model Context Protocol server for ThruAI voice agent platform.
 * Enables AI assistants like Claude to create and manage voice agents.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ThruAIClient } from './api-client.js';
import { tools } from './tools.js';
import { registerResources } from './resources.js';
/**
 * Create a ThruAI MCP server instance
 */
export function createThruAIMcpServer(options) {
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
    const context = { client };
    // Register all tools
    for (const [_name, tool] of Object.entries(tools)) {
        const toolDef = tool;
        // Convert Zod schema to JSON Schema for MCP
        const jsonSchema = zodToJsonSchema(toolDef.inputSchema);
        server.tool(toolDef.name, toolDef.description, jsonSchema, async (args) => {
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
                            type: 'text',
                            text: JSON.stringify(result, null, 2),
                        },
                    ],
                };
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: false,
                                error: errorMessage,
                            }, null, 2),
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    return server;
}
/**
 * Convert a Zod schema to JSON Schema for MCP
 */
function zodToJsonSchema(schema) {
    // Handle ZodObject
    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const properties = {};
        const required = [];
        for (const [key, value] of Object.entries(shape)) {
            const zodValue = value;
            properties[key] = zodToJsonSchema(zodValue);
            // Check if field is required (not optional and no default)
            if (!(zodValue instanceof z.ZodOptional) &&
                !(zodValue instanceof z.ZodDefault)) {
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
        const result = { type: 'string' };
        if (schema.description)
            result.description = schema.description;
        // Extract min length if present
        const checks = schema._def?.checks || [];
        const minCheck = checks.find((c) => c.kind === 'min');
        if (minCheck)
            result.minLength = minCheck.value;
        return result;
    }
    // Handle ZodNumber
    if (schema instanceof z.ZodNumber) {
        const result = { type: 'number' };
        if (schema.description)
            result.description = schema.description;
        return result;
    }
    // Handle ZodBoolean
    if (schema instanceof z.ZodBoolean) {
        const result = { type: 'boolean' };
        if (schema.description)
            result.description = schema.description;
        return result;
    }
    // Handle ZodEnum
    if (schema instanceof z.ZodEnum) {
        const result = {
            type: 'string',
            enum: schema.options,
        };
        if (schema.description)
            result.description = schema.description;
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
        const result = {
            type: 'array',
            items: zodToJsonSchema(schema.element),
        };
        if (schema.description)
            result.description = schema.description;
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
//# sourceMappingURL=index.js.map