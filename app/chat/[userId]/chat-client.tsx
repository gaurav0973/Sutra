"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatLayout } from "@/components/chat/chat-layout";
import { Message } from "@/components/chat/message-bubble";
import { Sidebar } from "@/components/chat/sidebar";

interface Conversation {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface ChatClientProps {
    userId: string;
    initialConversations?: Conversation[];
    activeConversationId?: string | null;
    initialMessages?: Message[];
}

export default function ChatClient({
    userId,
    initialConversations = [],
    activeConversationId = null,
    initialMessages = [],
}: ChatClientProps) {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [activeConvId, setActiveConvId] = useState<string | null>(activeConversationId);

    // Sync state with props upon navigation/rerendering
    useEffect(() => {
        setConversations(initialConversations);
    }, [initialConversations]);

    useEffect(() => {
        setActiveConvId(activeConversationId);
        setMessages(initialMessages);
    }, [activeConversationId, initialMessages]);

    const handleDeleteConversation = useCallback(
        async (convId: string) => {
            try {
                const res = await fetch(`/api/conversations/${convId}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    setConversations((prev) => prev.filter((c) => c.id !== convId));
                    if (activeConvId === convId) {
                        setActiveConvId(null);
                        setMessages([]);
                        router.push(`/chat/${userId}`);
                    }
                }
            } catch (err) {
                console.error("Failed to delete conversation:", err);
            }
        },
        [activeConvId, router, userId]
    );

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
                    conversationId: activeConvId,
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
                            break;
                        }

                        // Sync dynamic conversation ID creation
                        if (parsed.conversationId) {
                            const newId = parsed.conversationId;
                            setActiveConvId(newId);
                            // Update browser URL silently
                            window.history.pushState(null, "", `/chat/${userId}?c=${newId}`);

                            // Update local conversation list
                            const newConv: Conversation = {
                                id: newId,
                                title: currentInput.trim().substring(0, 30) || "New Chat",
                                userId,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            };
                            setConversations((prev) => [newConv, ...prev]);
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
    }, [input, isStreaming, activeConvId, userId]);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* Conversation History Sidebar */}
            <Sidebar
                conversations={conversations}
                activeConversationId={activeConvId}
                onDeleteConversation={handleDeleteConversation}
                userId={userId}
            />

            {/* Main Chat Area */}
            <div className="flex-1 min-w-0">
                <ChatLayout
                    messages={messages}
                    inputValue={input}
                    onInputChange={setInput}
                    onSend={sendMessage}
                    isStreaming={isStreaming}
                    userId={userId}
                />
            </div>
        </div>
    );
}
