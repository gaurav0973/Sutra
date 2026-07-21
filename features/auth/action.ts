"use server";

import { auth } from "@clerk/nextjs/server";

export const getCurrentAuthenticatedUserId = async () => {
    const { userId } = await auth.protect();
    if (!userId) {
        return null;
    }
    return userId;
};
