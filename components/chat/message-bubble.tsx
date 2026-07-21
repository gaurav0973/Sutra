"use client";

import { MarkdownRenderer } from "./markdown-renderer";
import { Card, CardContent } from "@/components/ui/card";

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
            <div className="flex justify-end">
                <div className="user-message-bubble">
                    <p className="whitespace-pre-wrap text-sm leading-normal">
                        {message.content}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-start">
            <div className="max-w-full md:max-w-[90%]">
                <div className={isStreaming ? "streaming-cursor" : ""}>
                    <Card className="assistant-message-surface border-border/70 p-0 shadow-none">
                        <CardContent className="p-4 sm:p-5">
                            <MarkdownRenderer content={message.content} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
