import { llm } from "./client";
import { SYSTEM_PROMPT } from "./system-prompt";
import { researchTool, webpageCrawlTool, webpageExtractTool, webpageMapTool, webSearchTool } from "./tools/travily/tools";
import { SystemMessage } from "@langchain/core/messages";


export async function callModel(state:any) {
    // console.log("calling an llm...");

    const response = await llmWithTools.invoke([
        new SystemMessage(SYSTEM_PROMPT),
        ...state.messages,
    ]);
    return {
        messages: [response],
    };
}
export const tools = [webSearchTool, webpageMapTool, webpageExtractTool, researchTool, webpageCrawlTool]
export const llmWithTools = llm.bindTools(tools);
