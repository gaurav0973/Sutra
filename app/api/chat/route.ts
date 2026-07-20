import { app } from "@/features/ai/graph";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const userInput = typeof body === "string" ? body : body?.message;

    if (typeof userInput !== "string" || userInput.trim().length === 0) {
        return new Response(
            JSON.stringify({
                error: "Invalid request body. Provide a non-empty 'message' string.",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        );
    }

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();

            try {
                const eventStream = app.streamEvents(
                    {
                        messages: [
                            {
                                role: "user",
                                content: userInput,
                            },
                        ],
                    },
                    { version: "v2" },
                );

                for await (const event of eventStream) {
                    if (
                        event.event === "on_chat_model_stream" &&
                        event.data?.chunk?.content
                    ) {
                        const token = event.data.chunk.content;
                        if (typeof token === "string" && token.length > 0) {
                            controller.enqueue(
                                encoder.encode(
                                    JSON.stringify({ token }) + "\n",
                                ),
                            );
                        }
                    }
                }

                // Signal end of stream
                controller.enqueue(
                    encoder.encode(JSON.stringify({ done: true }) + "\n"),
                );
            } catch (error) {
                console.error("Streaming error:", error);
                controller.enqueue(
                    encoder.encode(
                        JSON.stringify({
                            error: "An error occurred while generating the response.",
                        }) + "\n",
                    ),
                );
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/x-ndjson",
            "Transfer-Encoding": "chunked",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}
