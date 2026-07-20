import { ChatOpenAI } from "@langchain/openai";
import { researchTool, webpageCrawlTool, webpageExtractTool, webpageMapTool, webSearchTool } from "../tools/travily/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";

export const llm = new ChatOpenAI({
    model: "gpt-4.1-mini",
    temperature: 0,
});


export const tools = [webSearchTool, webpageMapTool, webpageExtractTool, researchTool, webpageCrawlTool]
export const toolNode = new ToolNode(tools);
export const llmWithTools = llm.bindTools(tools);
