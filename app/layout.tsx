import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Sutra AI",
    description: "Your intelligent AI assistant powered by Sutra",
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
                inter.variable,
                jetbrainsMono.variable
            )}
        >
            <body className="min-h-full font-sans">
                {children}
            </body>
        </html>
    );
}
