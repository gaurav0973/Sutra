import { tavily } from "@tavily/core";

export const tvlyClient = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});
