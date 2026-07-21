"use client";

import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    isStreaming: boolean;
    placeholder?: string;
}

export function ChatInput({
    value,
    onChange,
    onSend,
    isStreaming,
    placeholder = "Weave a new thread...",
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
        }
    }, [value]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    }

    return (
        <div className="chat-input-container">
            <div className="px-4 pt-3 pb-1.5">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={isStreaming}
                    rows={1}
                    className="min-h-10 w-full resize-none bg-transparent px-0.5 text-sm leading-normal text-foreground placeholder:text-muted-foreground/50 outline-none disabled:opacity-50"
                    style={{ maxHeight: "200px" }}
                />
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-border/40 px-3 pb-2.5 pt-2">
                {/* Model badge using shadcn Badge component */}
                <Badge variant="rope" className="font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    Sutra · Fast
                </Badge>

                <span className="hidden text-[11px] text-muted-foreground/50 sm:inline">
                    Enter to send · Shift+Enter for newline
                </span>

                <Button
                    type="button"
                    size="icon-sm"
                    onClick={onSend}
                    disabled={isStreaming || !value.trim()}
                    className="rounded-lg transition-all disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                        background: "linear-gradient(135deg, var(--caramel), var(--coffee))",
                        color: "#F3E9DC",
                        boxShadow: "0 2px 8px var(--knot-glow)",
                    }}
                    title="Send message"
                >
                    <SendHorizonal size={15} />
                </Button>
            </div>
        </div>
    );
}
