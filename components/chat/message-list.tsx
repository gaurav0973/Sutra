"use client";

import { useEffect, useRef } from "react";
import { Message, MessageBubble } from "./message-bubble";
import { StreamingIndicator } from "./streaming-indicator";

interface MessageListProps {
    messages: Message[];
    isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isStreaming]);

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="relative mx-auto flex max-w-4xl flex-col gap-5 px-4 py-8 md:px-6">
                {/* Thread timeline line */}
                {messages.length > 1 && (
                    <div className="message-thread-line" />
                )}

                {messages.map((message, index) => {
                    const isLastAssistant =
                        message.role === "assistant" &&
                        index === messages.length - 1 &&
                        isStreaming;

                    return (
                        <div
                            key={index}
                            className="message-enter relative"
                            style={{
                                animationDelay: `${Math.min(index * 30, 180)}ms`,
                                paddingLeft: messages.length > 1 ? "40px" : undefined,
                            }}
                        >
                            {/* Thread knot */}
                            {messages.length > 1 && (
                                <div
                                    className={`message-thread-knot ${message.role === "user" ? "user" : ""}`}
                                />
                            )}

                            <MessageBubble
                                message={message}
                                isStreaming={isLastAssistant}
                            />
                        </div>
                    );
                })}

                {isStreaming &&
                    messages[messages.length - 1]?.role !== "assistant" && (
                        <div
                            className="flex justify-start relative"
                            style={{
                                paddingLeft: messages.length > 1 ? "40px" : undefined,
                            }}
                        >
                            {messages.length > 1 && (
                                <div className="message-thread-knot" />
                            )}
                            <StreamingIndicator />
                        </div>
                    )}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}
