import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatClient from "./chat-client";

interface PageProps {
    params: Promise<{ userId: string }>;
}

export default async function ChatPage({ params }: PageProps) {
    const { userId } = await params;
    const { userId: authenticatedUserId } = await auth.protect();

    // Ensure user can only access their own workspace
    if (authenticatedUserId !== userId) {
        redirect(`/chat/${authenticatedUserId}`);
    }

    return <ChatClient userId={userId} />;
}
