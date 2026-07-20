"use client";

import {
    PanelLeft,
    Plus,
    Globe,
    FolderOpen,
    GitFork,
    Sparkles,
    BookOpen,
    MessageCircle,
} from "lucide-react";

export function Sidebar() {
    return (
        <aside className="flex flex-col items-center w-[52px] bg-[#212121] border-r border-white/[0.06] py-3 gap-1 shrink-0">
            {/* Top section */}
            <div className="flex flex-col items-center gap-1">
                <button className="sidebar-icon-btn" title="Toggle sidebar">
                    <PanelLeft size={18} />
                </button>

                <button className="sidebar-icon-btn" title="New chat">
                    <Plus size={18} />
                </button>
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
                <button className="sidebar-icon-btn" title="Chat history">
                    <MessageCircle size={18} />
                </button>

                {/* User avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c4956a] to-[#8b6b4a] flex items-center justify-center text-xs font-semibold text-white mt-1">
                    G
                </div>
            </div>
        </aside>
    );
}
