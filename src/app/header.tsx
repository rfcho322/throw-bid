'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationCell, NotificationFeedPopover, NotificationIconButton } from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { formatCurrency } from "./utils/currency";

export function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const session = useSession();

    const userId = session?.data?.user?.id;

    return (
        <div className="bg-neutral-950 text-white py-2">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="https://placehold.co/50x50/png?text=Logo" width="50" height="50" alt="logo" />
                        Throw Bid
                    </Link>
                    {userId && (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link href="/"
                                className="flex items-center justify-center gap-2 rounded-sm px-2 py-2 hover:text-slate-400 hover:ring hover:ring-slate-400">
                                All Auctions
                            </Link>
                            <Link href="/auctions"
                                className="flex items-center justify-center gap-2 rounded-sm px-2 py-2 hover:text-slate-400 hover:ring hover:ring-slate-400">
                                My Auctions
                            </Link>
                            <Link href="/items/create"
                                className="flex items-center justify-center gap-2 rounded-sm px-2 py-2 hover:text-slate-400 hover:ring hover:ring-slate-400">
                                Create Auction
                            </Link>
                        </div>
                    )}
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    {userId && (
                        <>
                            <NotificationIconButton
                                ref={notifButtonRef}
                                onClick={(e) => setIsVisible(!isVisible)}
                            />
                            <NotificationFeedPopover
                                buttonRef={notifButtonRef}
                                isVisible={isVisible}
                                onClose={() => setIsVisible(false)}
                                renderItem={({ item, ...props }) => (
                                    <NotificationCell
                                        key={item.id}
                                        {...props}
                                        item={item}
                                        // @ts-ignore
                                        avatar={<Avatar>
                                            <AvatarImage src={item.actors[0].properties?.avatar ?? "/default_avatar.webp"} alt="@user avatar" />
                                        </Avatar>}
                                    >
                                        <div className="flex gap-3 items-center text-gray-300 text-sm">
                                            <div>Out bid by <span className="font-bold"> ${formatCurrency(item.data.bidAmount)}</span></div>
                                            <Link
                                                onClick={() => setIsVisible(false)} 
                                                href={`/items/${item?.data?.itemId}`}
                                                className="font-bold bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-sm transition-colors duration-100"
                                            >
                                                Inspect Bid
                                            </Link>
                                        </div>
                                    </NotificationCell>
                                )}
                            />
                        </>
                    )}

                    {session?.data?.user.image && (
                        <Avatar>
                            <AvatarImage src={session.data.user.image} alt="@user avatar" />
                            <AvatarFallback>TB</AvatarFallback>
                        </Avatar>
                    )}

                    <div>{session?.data?.user?.name}</div>
                    <div>
                        {userId ? (
                            <Button className="border bg-white text-black hover:text-white"
                                type="submit"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Sign Out
                            </Button>
                        ) : (
                            <Button className="border bg-white text-black hover:text-white"
                                type="submit"
                                onClick={() => signIn("google")}
                            >
                                Sign In with Google
                            </Button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}