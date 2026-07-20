"use client";

import { Message } from "./message-bubble";
import { WelcomeScreen } from "./welcome-screen";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

interface ChatLayoutProps {
    messages: Message[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    isStreaming: boolean;
}

export function ChatLayout({
    messages,
    inputValue,
    onInputChange,
    onSend,
    isStreaming,
}: ChatLayoutProps) {
    const hasMessages = messages.length > 0;

    return (
        <div className="flex h-screen flex-col bg-[#1a1a1a]">
            {!hasMessages ? (
                // Welcome view
                <WelcomeScreen
                    inputValue={inputValue}
                    onInputChange={onInputChange}
                    onSend={onSend}
                    isStreaming={isStreaming}
                />
            ) : (
                // Conversation view
                <>
                    <MessageList
                        messages={messages}
                        isStreaming={isStreaming}
                    />

                    {/* Bottom input */}
                    <div className="border-t border-white/[0.06] p-4">
                        <div className="mx-auto max-w-3xl">
                            <ChatInput
                                value={inputValue}
                                onChange={onInputChange}
                                onSend={onSend}
                                isStreaming={isStreaming}
                                placeholder="Reply to Sutra..."
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
