"use client";

import { MarkdownRenderer } from "./markdown-renderer";

export type Message = {
    role: "user" | "assistant";
    content: string;
};

interface MessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <div className="flex justify-end message-enter">
                <div className="user-message-bubble">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start message-enter">
            <div className="max-w-full md:max-w-[85%]">
                <div className={isStreaming ? "streaming-cursor" : ""}>
                    <MarkdownRenderer content={message.content} />
                </div>
            </div>
        </div>
    );
}
