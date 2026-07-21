import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/browser";

export async function getConversationById(id: string) {
    return await prisma.conversation.findUnique({
        where: {
            id,
        },
    });
}


export async function verifyConversationOwnership(
    conversationId: string,
    userId: string,
) {
    const conversation = await getConversationById(conversationId);

    if (!conversation) {
        return null;
    }

    if (conversation.userId !== userId) {
        return null;
    }

    return conversation;
}
