import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import {callModel} from "./call-model"
import { toolNode } from "./client";

function shouldContinue(state:any) {
    console.log("\nChecking if tool should be called...\n");
    const lastMessage = state.messages.at(-1);
    if (lastMessage.tool_calls?.length) {
        console.log("🛠 Tool Call Detected");
        return "tools";
    }
    console.log("✅ No Tool Needed");
    return "__end__";
}
// Build the graph
const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addEdge("agent", "__end__")
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue);

// compile the graph
export const app = workflow.compile();
