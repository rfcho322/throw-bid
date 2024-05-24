'use server'

import { database } from '@/db/database';
import { items } from '@/db/schema';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export async function createItemAction(
{ 
    imageUrl, 
    name, 
    startingPrice 
}: { 
    imageUrl: string, 
    name: string, 
    startingPrice: number 
}) {
    const session = await auth();

    if (!session) {
        throw new Error("Unauthorized");
    }

    const user = session.user;

    if (!user || !user.id) {
        throw new Error("Unauthorized");
    }

    await database.insert(items).values({
        name,
        startingPrice,
        imageUrl,
        userId: user.id,
    });

    redirect("/");
}