import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ChatIndexPage() {
    const { userId } = await auth.protect();
    redirect(`/chat/${userId}`);
}
