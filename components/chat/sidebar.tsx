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
import { UserButton } from "@clerk/nextjs";

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
    );
}
