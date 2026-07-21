import { prisma } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/browser";

export async function loadConversationMessages(conversationId: string) {
    return await prisma.message.findMany({
        where: {
            conversationId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}


type SaveMessageInput = {
    conversationId: string;
    role: Role;
    content: string;
};

export async function saveConversationMessage({
    conversationId,
    role,
    content,
}: SaveMessageInput) {
    return await prisma.message.create({
        data: {
            conversationId,
            role,
            content,
        },
    });
}


export function toLangGraphMessages(messages: {
    role: Role;
    content: string;
}[]) {
    return messages.map((message) => ({
        role:
            message.role === Role.USER
                ? "user"
                : "assistant",
        content: message.content,
    }));
}

