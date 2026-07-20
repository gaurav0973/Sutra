"use client";

import { useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

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
    placeholder = "How can I help you today?",
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
            {/* Text area */}
            <div className="px-4 pt-3 pb-1">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={isStreaming}
                    rows={1}
                    className="w-full resize-none bg-transparent text-sm text-[#e8e4df] placeholder-[#6b6560] outline-none disabled:opacity-50"
                    style={{ maxHeight: "200px" }}
                />
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-end px-3 pb-2.5 pt-1 gap-2">
                {/* Model badge */}
                <span className="text-xs text-[#9a9590] select-none px-2 py-1 rounded-md bg-white/[0.03]">
                    Sutra · Fast
                </span>

                {/* Send button */}
                <button
                    type="button"
                    onClick={onSend}
                    disabled={isStreaming || !value.trim()}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#c4956a] hover:bg-[#d4a57a] transition-colors text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Send message"
                >
                    <SendHorizonal size={16} />
                </button>
            </div>
        </div>
    );
}
