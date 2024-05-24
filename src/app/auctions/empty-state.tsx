import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EmptyState() {
    return(
        <div className="space-y-8 flex flex-col items-center">
            <Image src="/empty.svg" width="300" height="300" alt="empty"/>
            <h2 className="text-2xl font-bold">You have no auction items yet.</h2>
            <Button asChild
                className="border bg-white text-black hover:text-white"
            >
                <Link href="/items/create">Create Auction</Link>
            </Button>
        </div>
    );
}