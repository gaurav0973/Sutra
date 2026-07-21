import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ conversationId: string }> }
) {
    try {
        const { userId: clerkId } = await auth.protect();
        const { conversationId } = await params;

        // Find the database user
        const dbUser = await prisma.user.findUnique({
            where: { clerkId },
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Find the conversation and verify ownership
        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

        if (!conversation) {
            return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
        }

        if (conversation.userId !== dbUser.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Delete the conversation (messages will cascade delete automatically)
        await prisma.conversation.delete({
            where: { id: conversationId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete conversation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
