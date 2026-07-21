import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Sutra AI — A Thread Connecting Ideas",
    description: "Step into a non-linear chat space. Explore branching paths, recall contexts, and build a connected library of your intelligence.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "dark h-full antialiased",
                outfit.variable,
                jetbrainsMono.variable
            )}
        >
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
                />
            </head>
            <body className="min-h-full font-sans">
                <ClerkProvider>
                {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
