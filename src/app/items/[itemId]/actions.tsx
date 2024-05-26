'use server'

import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { Knock } from "@knocklabs/node";
import { env } from "@/env";
import { isBidOver } from "@/app/utils/bids";

const knockClient = new Knock(env.KNOCK_SECRET_KEY);

export async function createBidAction(itemId: number) {
    
    const session = await auth();
    
    const userId = session?.user?.id;
    console.log(userId);
    
    
    if (!userId) {
        throw new Error("You need to login before you can place a bid");
    }

    const item = await database.query.items.findFirst({
        where: eq(items.id, itemId),
    });

    if (!item) {
        throw new Error("Item not found");
    }

    if (isBidOver(item)) {
        throw new Error("This auction is already over.");
    }

    const latestBidValue = item.currentBid + item.bidinterval;

    await database.insert(bids).values({
        amount: latestBidValue,
        itemId,
        userId,
        timestamp: new Date(),
    })

    await database.update(items).set({
        currentBid: latestBidValue,
    }).where(eq(items.id, itemId));

    const currentBids = await database.query.bids.findMany({
        where: eq(bids.itemId, itemId),
        with: {
            user: true,
        },
    })

    const recipients: {
        id: string,
        name: string,
        email: string,
        avatar: string,
    }[] = [];

    for (const bid of currentBids) {
        if (bid.userId !== userId && !recipients.find((recipient) => recipient.id === bid.userId)) {
            recipients.push({
                id: bid.userId.toString(),
                name: bid.user.name ?? "Anonymous",
                email: bid.user.email,
                avatar: bid.user.image || "",
            });
        }
    }

    if (recipients.length > 0) {
        await knockClient.workflows.trigger('dinosaurs-loose', {
            actor: {
                id: userId,
                name: session.user.name ?? "Anonymous",
                email: session.user.email,
                avatar: session.user.image,
                collection: "users",
            },
            recipients,
            data: {
                itemId,
                bidAmount: latestBidValue,
            }
        })
    }

    revalidatePath(`/items/${items.id}`);
}