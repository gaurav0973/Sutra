"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ArrowRight, Globe, GitFork, FolderOpen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
    const { userId, isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && userId) {
            router.push(`/chat/${userId}`);
        }
    }, [isLoaded, isSignedIn, userId, router]);

    // Prevent rendering of landing page while auth is loading or if user is authenticated
    if (!isLoaded || (isSignedIn && userId)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] text-[#e8e4df]">
                <div className="flex flex-col items-center gap-4">
                    <span className="greeting-accent text-3xl animate-pulse">✺</span>
                    <span className="font-serif font-light tracking-widest text-sm animate-pulse">SUTRA</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col justify-between bg-gradient-to-b from-[#1a1a1a] via-[#1c1a18] to-[#121212] text-[#e8e4df] overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] h-[600px] w-[800px] rounded-full bg-[#c4956a]/[0.03] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[500px] rounded-full bg-[#c4956a]/[0.02] blur-[100px] pointer-events-none" />

            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#1a1a1a]/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <span className="greeting-accent text-lg">✺</span>
                        <span className="font-serif font-light text-xl tracking-wider text-[#e8e4df]">
                            SUTRA
                        </span>
                    </div>

                    <nav className="flex items-center gap-4">
                        {isSignedIn ? (
                            <>
                                <Link
                                    href={`/chat/${userId}`}
                                    className={cn(
                                        buttonVariants({ variant: "outline", size: "sm" }),
                                        "border-white/[0.08] hover:border-white/10 dark:border-white/[0.08] dark:bg-white/[0.02]"
                                    )}
                                >
                                    Go to Chat
                                </Link>
                                <div className="flex items-center justify-center w-8 h-8">
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 rounded-full border border-white/[0.08]"
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/sign-in"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "sm" }),
                                    "border-white/[0.08] hover:border-white/10 dark:border-white/[0.08] dark:bg-white/[0.02]"
                                )}
                            >
                                Sign In
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Hero Content */}
            <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 z-10">
                <div className="max-w-3xl text-center flex flex-col items-center">
                    {/* Animated Tagline */}
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#c4956a]/20 bg-[#c4956a]/5 px-3 py-1 text-xs text-[#c4956a] backdrop-blur-sm">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c4956a] animate-pulse" />
                        A thread connecting ideas
                    </div>

                    {/* Main Title */}
                    <h1 className="mt-4 text-5xl md:text-7xl font-serif font-light tracking-tight text-white leading-tight">
                        Weave Conversations with{" "}
                        <span className="block mt-2 bg-gradient-to-r from-[#c4956a] via-[#e8e4df] to-[#c4956a] bg-clip-text text-transparent font-normal">
                            Sutra AI
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-base md:text-lg text-[#9a9590] max-w-xl font-light leading-relaxed">
                        Step into a non-linear chat space. Explore branching paths, recall contexts contextually, and build a connected library of your intelligence.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {isSignedIn ? (
                            <Link
                                href={`/chat/${userId}`}
                                className={cn(
                                    buttonVariants({ variant: "default", size: "lg" }),
                                    "h-11 px-8 rounded-none bg-[#c4956a] hover:bg-[#b0855e] text-white flex items-center gap-2 group transition-all"
                                )}
                            >
                                Enter Workspace
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <Link
                                href="/sign-in"
                                className={cn(
                                    buttonVariants({ variant: "default", size: "lg" }),
                                    "h-11 px-8 rounded-none bg-[#c4956a] hover:bg-[#b0855e] text-white flex items-center gap-2 group transition-all"
                                )}
                            >
                                Get Started
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-32 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="flex flex-col p-6 rounded-none border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm transition-all hover:border-[#c4956a]/30 hover:bg-white/[0.02] group">
                        <div className="h-10 w-10 flex items-center justify-center rounded-none bg-[#c4956a]/10 border border-[#c4956a]/20 text-[#c4956a] mb-4 group-hover:bg-[#c4956a]/20 transition-all">
                            <GitFork className="size-5" />
                        </div>
                        <h3 className="font-serif font-light text-lg text-white mb-2">Branching Conversations</h3>
                        <p className="text-sm text-[#9a9590] leading-relaxed font-light">
                            Fork prompts and explore different lines of reasoning. Never lose track of your creative branches.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col p-6 rounded-none border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm transition-all hover:border-[#c4956a]/30 hover:bg-white/[0.02] group">
                        <div className="h-10 w-10 flex items-center justify-center rounded-none bg-[#c4956a]/10 border border-[#c4956a]/20 text-[#c4956a] mb-4 group-hover:bg-[#c4956a]/20 transition-all">
                            <Globe className="size-5" />
                        </div>
                        <h3 className="font-serif font-light text-lg text-white mb-2">Semantic Research</h3>
                        <p className="text-sm text-[#9a9590] leading-relaxed font-light">
                            Enriched search queries querying live web intelligence to ground AI responses with real-world accuracy.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col p-6 rounded-none border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm transition-all hover:border-[#c4956a]/30 hover:bg-white/[0.02] group">
                        <div className="h-10 w-10 flex items-center justify-center rounded-none bg-[#c4956a]/10 border border-[#c4956a]/20 text-[#c4956a] mb-4 group-hover:bg-[#c4956a]/20 transition-all">
                            <FolderOpen className="size-5" />
                        </div>
                        <h3 className="font-serif font-light text-lg text-white mb-2">Organized Workspace</h3>
                        <p className="text-sm text-[#9a9590] leading-relaxed font-light">
                            Store your conversations inside workspaces, search historical threads, and mark critical knowledge with stars.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/[0.06] bg-[#121212]/50 py-6 text-center text-xs text-[#6b6560] z-10">
                <p>&copy; {new Date().getFullYear()} Sutra AI. All rights reserved.</p>
            </footer>
        </div>
    );
}
