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
            <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col gap-6">
                {messages.map((message, index) => {
                    const isLastAssistant =
                        message.role === "assistant" &&
                        index === messages.length - 1 &&
                        isStreaming;

                    return (
                        <MessageBubble
                            key={index}
                            message={message}
                            isStreaming={isLastAssistant}
                        />
                    );
                })}

                {isStreaming &&
                    messages[messages.length - 1]?.role !== "assistant" && (
                        <div className="flex justify-start">
                            <StreamingIndicator />
                        </div>
                    )}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}
