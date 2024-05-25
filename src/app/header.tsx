import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
    const session = await auth();

    return (
        <div className="bg-neutral-950 text-white py-2">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="https://placehold.co/50x50/png?text=Logo" width="50" height="50" alt="logo" />
                        Throw Bid
                    </Link>
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
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    <div>{session?.user?.name}</div>
                    <div>{session ? <SignOut /> : <SignIn />}</div>
                </div>
            </div>
        </div>
    )
}