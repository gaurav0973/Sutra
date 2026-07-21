"use client";

import { useState } from "react";
import Link from "next/link";
import {
    PanelLeft,
    Plus,
    Globe,
    FolderOpen,
    GitFork,
    Sparkles,
    BookOpen,
    MessageCircle,
    Trash2,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

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
    const [isOpen, setIsOpen] = useState(true); // Default open for better discoverability

    return (
        <div className="flex h-full shrink-0 z-30">
            {/* Narrow Bar (52px) */}
            <aside className="flex flex-col items-center w-[52px] bg-[#212121] border-r border-white/[0.06] py-3 gap-1 shrink-0">
                {/* Top section */}
                <div className="flex flex-col items-center gap-1">
                    <button
                        className={cn("sidebar-icon-btn", isOpen && "bg-white/[0.06] text-[#e8e4df]")}
                        onClick={() => setIsOpen(!isOpen)}
                        title="Toggle history drawer"
                    >
                        <PanelLeft size={18} />
                    </button>

                    {userId ? (
                        <Link href={`/chat/${userId}`} className="sidebar-icon-btn" title="New chat">
                            <Plus size={18} />
                        </Link>
                    ) : (
                        <button className="sidebar-icon-btn" title="New chat">
                            <Plus size={18} />
                        </button>
                    )}
                </div>

                {/* Middle nav section */}
                <div className="flex flex-col items-center gap-1 mt-4">
                    <button className="sidebar-icon-btn" title="Search">
                        <Globe size={18} />
                    </button>

                    <button className="sidebar-icon-btn" title="Projects">
                        <FolderOpen size={18} />
                    </button>

                    <button className="sidebar-icon-btn" title="Branches">
                        <GitFork size={18} />
                    </button>

                    <button className="sidebar-icon-btn" title="Starred">
                        <Sparkles size={18} />
                    </button>

                    <button className="sidebar-icon-btn" title="Library">
                        <BookOpen size={18} />
                    </button>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom section */}
                <div className="flex flex-col items-center gap-1">
                    <button
                        className={cn("sidebar-icon-btn", isOpen && "bg-white/[0.06] text-[#e8e4df]")}
                        onClick={() => setIsOpen(!isOpen)}
                        title="Chat history"
                    >
                        <MessageCircle size={18} />
                    </button>

                    {/* User avatar */}
                    <div className="w-8 h-8 flex items-center justify-center mt-1">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-full border border-white/[0.08]"
                                }
                            }}
                        />
                    </div>
                </div>
            </aside>

            {/* Expanded History Panel (240px) */}
            <div
                className={cn(
                    "h-full bg-[#1c1c1c] border-r border-white/[0.06] flex flex-col transition-all duration-200 ease-in-out overflow-hidden",
                    isOpen ? "w-60 opacity-100" : "w-0 opacity-0 border-r-0"
                )}
            >
                {/* Panel Header */}
                <div className="p-3 border-b border-white/[0.06] flex items-center justify-between shrink-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9a9590]">History</span>
                    {userId && (
                        <Link
                            href={`/chat/${userId}`}
                            className="sidebar-icon-btn h-7 w-7 rounded-md"
                            title="New chat"
                        >
                            <Plus size={16} />
                        </Link>
                    )}
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {conversations.length === 0 ? (
                        <div className="text-xs text-[#6b6560] text-center mt-8 px-4 py-2 italic">
                            No chat history
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={cn(
                                    "group flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-all cursor-pointer",
                                    conv.id === activeConversationId
                                        ? "bg-white/[0.06] text-[#e8e4df]"
                                        : "text-[#9a9590] hover:bg-white/[0.02] hover:text-[#e8e4df]"
                                )}
                            >
                                <Link
                                    href={`/chat/${userId}?c=${conv.id}`}
                                    className="flex-1 truncate text-left select-none pr-1 py-0.5"
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
                                        className="opacity-0 group-hover:opacity-100 text-[#6b6560] hover:text-red-400 transition-all h-5 w-5 flex items-center justify-center rounded shrink-0 hover:bg-white/[0.04]"
                                        title="Delete chat"
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
