import { Item } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "./utils/currency";
import { format } from "date-fns";
import { isBidOver } from "./utils/bids";
import { Badge } from "@/components/ui/badge";

export function ItemCard({ item }: { item: Item }) {

    return (
        <div key={item.id} className='relative bg-neutral-800 border py-5 px-5 rounded-xl'> {/* remove h-[400px] */}
            <span className="text-lg">{item.name}</span>
            <div className='relative w-auto h-[300px] mt-5 mb-5'>
                <Image className='bg-white rounded-xl object-cover' loading="lazy" fill sizes="(max-width: 300px) 100vw, 33vw" src={item.imageUrl} alt="logo" />
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    Starting Price: <span className="font-bold text-green-500">${formatCurrency(item.startingPrice)}</span>
                </div>
                <div>
                    {isBidOver(item) ? (
                        <>
                            <p className="text-red-500">Bidding is over.</p>
                        </>

                    ) : (
                        <>
                            Ends On: <span className="font-bold">{format(item.endDate, "eeee M/dd/yy")}</span>
                        </>
                    )}
                </div>
            </div>
            <button className="absolute inset-0 bg-neutral-900 text-black py-2 px-4 rounded-xl bg-opacity-0 hover:bg-opacity-90 transition-colors duration-300 cursor-default group">
                <Link href={`/items/${item.id}`}
                    className="border opacity-0 group-hover:opacity-100 bg-white text-black w-fit mx-auto px-4 py-3 font-bold rounded-lg hover:bg-neutral-950 hover:text-white transition-colors duration-200">
                    {isBidOver(item) ? "View Bid" : "Place Bid"}
                </Link>
            </button>
        </div>
    );
}