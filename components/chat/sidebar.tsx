"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import {
    MessageCircle,
    PanelLeft,
    Plus,
    Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Conversation {
    id: string;
    title: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

interface SidebarProps {
    conversations?: Conversation[];
    activeConversationId?: string | null;
    onDeleteConversation?: (id: string) => Promise<void>;
    userId?: string;
}

export function Sidebar({
    conversations = [],
    activeConversationId = null,
    onDeleteConversation,
    userId,
}: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="z-30 flex h-full shrink-0">
            {/* Icon rail with vertical rope line */}
            <aside className="relative flex w-14 shrink-0 flex-col items-center gap-2 border-r border-sidebar-border bg-sidebar/95 py-3 backdrop-blur-xl">
                {/* Vertical rope line */}
                <div className="sidebar-rope-line" />

                {/* Top actions */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                    <button
                        className={cn(
                            "sidebar-icon-btn",
                            isOpen && "bg-sidebar-accent text-foreground",
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        title="Toggle history drawer"
                    >
                        <PanelLeft size={18} />
                    </button>

                    {userId ? (
                        <Link
                            href={`/chat/${userId}`}
                            className="sidebar-icon-btn"
                            title="New thread"
                        >
                            <Plus size={18} />
                        </Link>
                    ) : (
                        <button className="sidebar-icon-btn" title="New thread">
                            <Plus size={18} />
                        </button>
                    )}
                </div>

                <div className="flex-1" />

                {/* Bottom actions */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <button
                        className={cn(
                            "sidebar-icon-btn",
                            isOpen && "bg-sidebar-accent text-foreground",
                        )}
                        onClick={() => setIsOpen(!isOpen)}
                        title="Chat history"
                    >
                        <MessageCircle size={18} />
                    </button>

                    <div className="mt-1 flex h-8 w-8 items-center justify-center">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox:
                                        "h-8 w-8 rounded-full border border-border",
                                },
                            }}
                        />
                    </div>
                </div>
            </aside>

            {/* History drawer — parchment styled */}
            <div
                className={cn(
                    "h-full overflow-hidden border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl transition-all duration-250 ease-in-out",
                    isOpen ? "w-68 opacity-100" : "w-0 border-r-0 opacity-0",
                )}
            >
                {/* Drawer header with rope divider */}
                <div className="flex shrink-0 items-center justify-between border-b border-sidebar-border px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: "var(--rope-tan)" }}>⚬</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            Threads
                        </span>
                    </div>
                    {userId && (
                        <Link
                            href={`/chat/${userId}`}
                            className="sidebar-icon-btn h-7 w-7"
                            title="New thread"
                        >
                            <Plus size={14} />
                        </Link>
                    )}
                </div>

                {/* Conversation list */}
                <div className="flex-1 space-y-1 overflow-y-auto p-2">
                    {conversations.length === 0 ? (
                        <div className="mt-8 flex flex-col items-center gap-3 px-4 py-6 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
                                <MessageCircle size={16} className="text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">No threads yet</p>
                                <p className="mt-1 text-[10px] text-muted-foreground/60">
                                    Start a conversation to weave your first thread
                                </p>
                            </div>
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={cn(
                                    "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-180",
                                    conv.id === activeConversationId
                                        ? "text-foreground border"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent",
                                )}
                                style={conv.id === activeConversationId ? {
                                    background: "var(--knot-glow)",
                                    borderColor: "color-mix(in oklab, var(--rope-tan) 25%, transparent)",
                                } : undefined}
                            >
                                <Link
                                    href={`/chat/${userId}?c=${conv.id}`}
                                    className="flex-1 select-none truncate py-0.5 pr-1 text-left text-[13px]"
                                >
                                    {conv.title}
                                </Link>

                                {onDeleteConversation && (
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            await onDeleteConversation(conv.id);
                                        }}
                                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                                        title="Delete thread"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
