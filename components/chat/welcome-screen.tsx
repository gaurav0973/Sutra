"use client";

import { ChatInput } from "./chat-input";
import { useUser } from "@clerk/nextjs";

interface WelcomeScreenProps {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSend: () => void;
    isStreaming: boolean;
}

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
}

export function WelcomeScreen({
    inputValue,
    onInputChange,
    onSend,
    isStreaming,
}: WelcomeScreenProps) {
    const greeting = getGreeting();
    const { user } = useUser();
    const displayName = user?.firstName || "Gaurav";

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* Greeting */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-[#e8e4df]">
                    <span className="greeting-accent mr-2">✺</span>
                    {greeting}, {displayName}
                </h1>
            </div>

            {/* Input bar */}
            <div className="w-full max-w-2xl">
                <ChatInput
                    value={inputValue}
                    onChange={onInputChange}
                    onSend={onSend}
                    isStreaming={isStreaming}
                />
            </div>
        </div>
    );
}
