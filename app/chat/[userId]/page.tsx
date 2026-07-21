import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/user-sync";
import { prisma } from "@/lib/db";
import ChatClient from "./chat-client";

interface PageProps {
    params: Promise<{ userId: string }>;
    searchParams: Promise<{ c?: string }>;
}

export default async function ChatPage({ params, searchParams }: PageProps) {
    const { userId } = await params;
    const { c: conversationId } = await searchParams;
    const { userId: authenticatedUserId } = await auth.protect();

    // Ensure user can only access their own workspace
    if (authenticatedUserId !== userId) {
        redirect(`/chat/${authenticatedUserId}`);
    }

    // Sync Clerk user with DB
    const dbUser = await getOrCreateUser();

    // Fetch all conversations for the user
    const dbConversations = await prisma.conversation.findMany({
        where: { userId: dbUser.id },
        orderBy: { updatedAt: "desc" },
    });

    // Map database conversations to a plain object structure for client component safety
    const conversations = dbConversations.map(c => ({
        id: c.id,
        title: c.title,
        userId: c.userId,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    }));

    let initialMessages = [];
    let activeConversationId = conversationId || null;

    if (activeConversationId) {
        const conversation = await prisma.conversation.findUnique({
            where: { id: activeConversationId },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        if (conversation && conversation.userId === dbUser.id) {
            initialMessages = conversation.messages.map((m) => ({
                role: m.role.toLowerCase() as "user" | "assistant",
                content: m.content,
            }));
        } else {
            // If conversation does not exist or doesn't belong to this user, clear active ID
            activeConversationId = null;
        }
    }

    return (
        <ChatClient
            userId={userId}
            initialConversations={conversations}
            activeConversationId={activeConversationId}
            initialMessages={initialMessages}
        />
    );
}
