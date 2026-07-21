"use server";

import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getCurrentAuthenticatedUserId = async () => {
    const { userId } = await auth.protect();
    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        }
    });
    if (!user) {
        return onBoardUserToDB();
    }
    return user;
};

export async function onBoardUserToDB() {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) throw new Error("User not found");

    const email = authenticatedUser.emailAddresses[0]?.emailAddress ?? null;
    return prisma.user.upsert({
        where: {
            clerkId: authenticatedUser.id,
        },
        create:{
            clerkId: authenticatedUser.id,
            email,
            imageUrl: authenticatedUser.imageUrl,
        },
        update: {
            email,
            clerkId: authenticatedUser.id,
            imageUrl: authenticatedUser.imageUrl,
        },
    });
}
