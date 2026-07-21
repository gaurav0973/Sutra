"use client";

import { useUser } from "@clerk/nextjs";
import { ChatInput } from "./chat-input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    const displayName = user?.firstName || "Friend";
    const prompts = [
        "Plan my week with focused deep-work blocks.",
        "Summarize this project into a one-page brief.",
        "Draft a launch checklist for my app.",
    ];

    return (
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
            <div className="mb-6 text-center flex flex-col items-center">
                {/* Compass rose logo */}
                <div className="sutra-logo-mark mb-4">
                    <span className="text-4xl text-accent">✦</span>
                    <div className="sutra-logo-orbit" />
                </div>

                <Badge variant="rope" className="mb-3">
                    A thread connecting ideas
                </Badge>

                {/* Greeting */}
                <h1 className="text-[32px] sm:text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground">
                    Good {greeting},{" "}
                    <span className="bg-gradient-to-r from-accent via-[#D4B59D] to-accent bg-clip-text text-transparent">
                        {displayName}
                    </span>
                </h1>
                <p className="mt-3 text-sm leading-normal text-muted-foreground max-w-md">
                    Weave a new thread — ask a question, shape an idea, or explore a thought.
                </p>

                {/* Rope divider */}
                <div className="rope-divider w-24 mx-auto mt-4" />
            </div>

            <div className="w-full max-w-3xl">
                <ChatInput
                    value={inputValue}
                    onChange={onInputChange}
                    onSend={onSend}
                    isStreaming={isStreaming}
                />

                {/* Prompt suggestions using shadcn Card component */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {prompts.map((prompt) => (
                        <Card
                            key={prompt}
                            onClick={() => onInputChange(prompt)}
                            className="prompt-card border-border cursor-pointer transition-all hover:-translate-y-0.5"
                        >
                            <CardContent className="p-0">
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {prompt}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
