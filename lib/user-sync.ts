import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getOrCreateUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) {
        throw new Error("Unauthorized");
    }

    let user = await prisma.user.findUnique({
        where: { clerkId: clerkUser.id },
    });

    if (!user) {
        const email = clerkUser.emailAddresses[0]?.emailAddress;
        if (!email) {
            throw new Error("Clerk user does not have an email address");
        }

        user = await prisma.user.create({
            data: {
                clerkId: clerkUser.id,
                email,
                name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || clerkUser.username || null,
                imageUrl: clerkUser.imageUrl || null,
            },
        });
    }

    return user;
}
