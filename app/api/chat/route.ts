import { app } from "@/features/ai/graph";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export async function POST(req: NextRequest) {
    try {
        const { userId: clerkId } = await auth.protect();
        
        // Find database user
        const dbUser = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!dbUser) {
            return new Response(
                JSON.stringify({ error: "User not synced. Please reload page." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await req.json();
        const userInput = typeof body === "string" ? body : body?.message;
        let conversationId = body?.conversationId;

        if (typeof userInput !== "string" || userInput.trim().length === 0) {
            return new Response(
                JSON.stringify({
                    error: "Invalid request body. Provide a non-empty 'message' string.",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } },
            );
        }

        let isNewConversation = false;
        let conversation;

        if (conversationId) {
            // Verify conversation belongs to user
            conversation = await prisma.conversation.findUnique({
                where: { id: conversationId },
            });

            if (!conversation || conversation.userId !== dbUser.id) {
                return new Response(
                    JSON.stringify({ error: "Conversation not found or unauthorized." }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }
        } else {
            // Create a new conversation
            isNewConversation = true;
            const title = userInput.trim().substring(0, 30) || "New Chat";
            conversation = await prisma.conversation.create({
                data: {
                    title,
                    userId: dbUser.id,
                },
            });
            conversationId = conversation.id;
        }

        // Save User Message to Database
        await prisma.message.create({
            data: {
                conversationId,
                role: Role.USER,
                content: userInput.trim(),
            },
        });

        // Trigger Prisma conversation updatedAt update
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
        });

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let fullAssistantContent = "";

                try {
                    // 1. If it's a new conversation, stream the conversationId first
                    if (isNewConversation) {
                        controller.enqueue(
                            encoder.encode(
                                JSON.stringify({ conversationId }) + "\n"
                            )
                        );
                    }

                    // Fetch all messages for the current conversation to provide complete context
                    const dbMessages = await prisma.message.findMany({
                        where: { conversationId },
                        orderBy: { createdAt: "asc" },
                    });

                    const formattedMessages = dbMessages.map((m) => ({
                        role: m.role === Role.USER ? "user" : "assistant",
                        content: m.content,
                    }));

                    // 2. Stream AI response chunks
                    const eventStream = app.streamEvents(
                        {
                            messages: formattedMessages,
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
                                fullAssistantContent += token;
                                controller.enqueue(
                                    encoder.encode(
                                        JSON.stringify({ token }) + "\n",
                                    ),
                                );
                            }
                        }
                    }

                    // 3. Save Assistant Message to Database
                    if (fullAssistantContent.trim().length > 0) {
                        await prisma.message.create({
                            data: {
                                conversationId,
                                role: Role.ASSISTANT,
                                content: fullAssistantContent,
                            },
                        });
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
    } catch (err) {
        console.error("API Chat route error:", err);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
