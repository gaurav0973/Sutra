import { tool } from "@langchain/core/tools";
import {z} from "zod"
import { tvlyClient } from "./index";

/**
 * Websearch tool
 *      - search web for latest info
 */
export const webSearchTool = tool(
    async ({ query }) => {
        return await tvlyClient.search(query);
    },
    {
        name: "web_search",
        description: "Search the web for recent information.",
        schema: z.object({
            query: z.string(),
        }),
    }
);

/**
 * Web Research tool
 *      - research a topic in depth
 */
export const researchTool = tool(
    async ({ query }) => {
        return await tvlyClient.research(query);
    },
    {
        name: "research",
        description: "Perform deep research on a topic.",
        schema: z.object({
            query: z.string(),
        }),
    }
);

/**
 * Webpage Map tool
 *     - generate a sitemap of a website
 */
export const webpageMapTool = tool(
    async ({ url }) => {
        return await tvlyClient.map(url);
    },
    {
        name: "map_webpage",
        description: "Generate a sitemap of a website.",
        schema: z.object({
            url: z.string().url(),
        }),
    }
);

/**
 * Webpage Extract tool
 *   - extract the contents of a webpage from a URL
 */
export const webpageExtractTool = tool(
    async ({ url }) => {
        return await tvlyClient.extract([url]);
    },
    {
        name: "extract_webpage",
        description: "Extract the contents of a webpage from a URL.",
        schema: z.object({
            url: z.string().url(),
        }),
    },
);

/**
 * Webpage Crawl tool
 *  - crawl a website using instructions
 */
export const webpageCrawlTool = tool(
    async ({ url, instructions }) => {
        return await tvlyClient.crawl(url, {
            instructions,
        });
    },
    {
        name: "crawl_webpage",
        description: "Crawl a website using instructions.",
        schema: z.object({
            url: z.string().url(),
            instructions: z.string(),
        }),
    }
);


