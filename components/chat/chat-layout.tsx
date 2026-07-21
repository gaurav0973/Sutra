"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Plus, Compass } from "lucide-react";
import { ChatInput } from "./chat-input";
import { Message } from "./message-bubble";
import { MessageList } from "./message-list";
import { WelcomeScreen } from "./welcome-screen";

interface ChatLayoutProps {
    messages: Message[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    isStreaming: boolean;
    userId?: string;
}

export function ChatLayout({
    messages,
    inputValue,
    onInputChange,
    onSend,
    isStreaming,
    userId,
}: ChatLayoutProps) {
    const hasMessages = messages.length > 0;

    return (
        <div className="chat-shell flex h-screen flex-col">
            {/* Top Navigation Header (Replaces Sidebar) */}
            <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-xl">
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="compass-rose" style={{ width: "28px", height: "28px" }} />
                        <span className="font-semibold tracking-wide text-foreground group-hover:text-accent transition-colors">
                            Sutra
                        </span>
                    </Link>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        {userId && (
                            <Link
                                href={`/chat/${userId}`}
                                className="cta-secondary !py-1.5 !px-3 !text-xs flex items-center gap-1.5"
                                title="Start a new chat"
                            >
                                <Plus size={14} />
                                <span>New Thread</span>
                            </Link>
                        )}

                        <div className="flex items-center justify-center w-8 h-8">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 rounded-full border border-border"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="wood-plank-divider" />
            </header>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 flex flex-col">
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
                        <div className="border-t border-border/40 bg-background/80 p-4 backdrop-blur-xl shrink-0">
                            <div className="mx-auto max-w-4xl">
                                <ChatInput
                                    value={inputValue}
                                    onChange={onInputChange}
                                    onSend={onSend}
                                    isStreaming={isStreaming}
                                    placeholder="Continue the thread..."
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
