"use client";

import { useState, useCallback } from "react";
import { ChatLayout } from "@/components/chat/chat-layout";
import { Message } from "@/components/chat/message-bubble";

function HomePage() {
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = useCallback(async () => {
        if (!input.trim() || isStreaming) return;

        const userMessage: Message = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        const currentInput = input;
        setInput("");
        setIsStreaming(true);

        // Add empty assistant message that will be streamed into
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "" },
        ]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: currentInput,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const reader = res.body?.getReader();
            if (!reader) throw new Error("No readable stream");

            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Process complete lines
                const lines = buffer.split("\n");
                buffer = lines.pop() || ""; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (!line.trim()) continue;

                    try {
                        const parsed = JSON.parse(line);

                        if (parsed.done) {
                            // Stream complete
                            break;
                        }

                        if (parsed.token) {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastMsg = updated[updated.length - 1];
                                if (lastMsg && lastMsg.role === "assistant") {
                                    updated[updated.length - 1] = {
                                        ...lastMsg,
                                        content: lastMsg.content + parsed.token,
                                    };
                                }
                                return updated;
                            });
                        }

                        if (parsed.error) {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastMsg = updated[updated.length - 1];
                                if (lastMsg && lastMsg.role === "assistant") {
                                    updated[updated.length - 1] = {
                                        ...lastMsg,
                                        content: parsed.error,
                                    };
                                }
                                return updated;
                            });
                        }
                    } catch {
                        // Skip malformed JSON lines
                    }
                }
            }
        } catch {
            setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg && lastMsg.role === "assistant" && !lastMsg.content) {
                    updated[updated.length - 1] = {
                        ...lastMsg,
                        content:
                            "Something went wrong while contacting the server. Please try again.",
                    };
                }
                return updated;
            });
        } finally {
            setIsStreaming(false);
        }
    }, [input, isStreaming]);

    return (
        <ChatLayout
            messages={messages}
            inputValue={input}
            onInputChange={setInput}
            onSend={sendMessage}
            isStreaming={isStreaming}
        />
    );
}

export default HomePage;
