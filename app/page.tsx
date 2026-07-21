"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ArrowRight, GitFork, Globe, FolderOpen, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
    const { userId, isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn && userId) {
            router.push(`/chat/${userId}`);
        }
    }, [isLoaded, isSignedIn, userId, router]);

    // Loading / redirecting state
    if (!isLoaded || (isSignedIn && userId)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="compass-rose" />
                    <span className="font-light tracking-[0.25em] text-xs text-muted-foreground animate-pulse">
                        SUTRA
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="landing-hero relative flex min-h-screen flex-col text-foreground">
            {/* Decorative rope lines */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="rope-line-deco" style={{ top: "15%", left: "3%", width: "30%", transform: "rotate(-1.5deg)" }} />
                <div className="rope-line-deco" style={{ top: "35%", right: "5%", width: "25%", transform: "rotate(1deg)", animationDelay: "2s" }} />
                <div className="rope-line-deco" style={{ top: "60%", left: "8%", width: "20%", transform: "rotate(-0.5deg)", animationDelay: "4s" }} />
                <div className="rope-line-deco" style={{ top: "82%", right: "10%", width: "22%", transform: "rotate(1.5deg)", animationDelay: "6s" }} />
            </div>

            {/* Header — Wood plank nav */}
            <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="compass-rose" style={{ width: "32px", height: "32px" }} />
                        <span className="font-semibold text-lg tracking-wide text-foreground">
                            Sutra
                        </span>
                    </div>

                    <nav className="flex items-center gap-3">
                        {isSignedIn ? (
                            <>
                                <Link
                                    href={`/chat/${userId}`}
                                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-border")}
                                >
                                    Go to Chat
                                </Link>
                                <div className="flex items-center justify-center w-8 h-8">
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 rounded-full border border-border"
                                            }
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/sign-in"
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "border-border")}
                            >
                                Sign In
                            </Link>
                        )}
                    </nav>
                </div>
                {/* Wood plank header bottom */}
                <div className="wood-plank-divider" />
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center items-center px-6 py-24 z-10">
                <div className="max-w-3xl text-center flex flex-col items-center">
                    {/* Tagline pill */}
                    <div className="tagline-pill mb-6">
                        <span className="pulse-dot" />
                        A thread connecting ideas
                    </div>

                    {/* Compass logo */}
                    <div className="sutra-logo-mark mb-6">
                        <span className="text-5xl" style={{ color: "var(--rope-tan)" }}>✦</span>
                        <div className="sutra-logo-orbit" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
                        Sutra AI
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
                        Step into a non-linear chat space. Explore branching paths,
                        recall contexts, and build a connected library of your intelligence.
                    </p>

                    {/* Rope divider */}
                    <div className="rope-divider w-32 mx-auto mt-8" />

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {isSignedIn ? (
                            <Link href={`/chat/${userId}`} className="cta-button group">
                                Enter Workspace
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <Link href="/sign-in" className="cta-button group">
                                Get Started
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}

                        <a href="#features" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "cta-secondary")}>
                            <Compass className="size-4" />
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="mt-32 max-w-5xl w-full">
                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-8 justify-center">
                        <div className="rope-divider flex-1 max-w-16" />
                        <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold">
                            Features
                        </span>
                        <div className="rope-divider flex-1 max-w-16" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <Card className="feature-card border-border">
                            <CardHeader className="p-0 mb-3">
                                <div className="feature-icon">
                                    <GitFork className="size-5" />
                                </div>
                                <CardTitle className="text-base text-foreground">
                                    Branching Conversations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                    Fork prompts and explore different lines of reasoning. Never lose track of your creative branches.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="feature-card border-border">
                            <CardHeader className="p-0 mb-3">
                                <div className="feature-icon">
                                    <Globe className="size-5" />
                                </div>
                                <CardTitle className="text-base text-foreground">
                                    Semantic Research
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                    Enriched search queries grounding AI responses with real-world accuracy from live web intelligence.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="feature-card border-border">
                            <CardHeader className="p-0 mb-3">
                                <div className="feature-icon">
                                    <FolderOpen className="size-5" />
                                </div>
                                <CardTitle className="text-base text-foreground">
                                    Organized Workspace
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                    Store conversations in workspaces, search threads historically, and bookmark critical knowledge.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Why Sutra — Bridge Section */}
                <div className="mt-24 max-w-2xl w-full">
                    <Card className="bridge-section border-border text-center">
                        <CardHeader className="p-0 mb-4 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <Compass className="size-4" style={{ color: "var(--caramel)" }} />
                                <span className="text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: "var(--caramel)" }}>
                                    Why Sutra
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                                In Sanskrit, <em className="text-foreground font-medium not-italic">Sutra</em> means
                                &quot;thread&quot; — the fundamental connector of ideas.
                                Just as threads weave into rope and ropes bind bridges together,
                                your conversations build into knowledge.
                                Every thought connected, every insight preserved.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer with wood plank */}
            <footer className="z-10">
                <div className="wood-plank-divider" />
                <div className="py-6 text-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Sutra AI · A thread connecting ideas
                    </p>
                </div>
            </footer>
        </div>
    );
}
