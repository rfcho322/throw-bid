import { Item } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "./utils/currency";

export function ItemCard({ item }: { item: Item }) {
    return (
        <div key={item.id} className='relative bg-neutral-800 border py-5 px-5 rounded-xl'> {/* remove h-[400px] */}
            <span className="absolute top-5 left-5 text-lg">{item.name}</span>
            {/* <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
                <Image className='mx-auto my-8 rounded-lg bg-white' src={item.imageUrl} layout="fill" objectFit="cover" alt="logo" />
            </div> */}
            <div className='relative w-auto h-[300px] my-10'>
                <Image className='bg-white rounded-xl' src={item.imageUrl} layout="fill" objectFit="cover" alt="logo" />
            </div>
            <div className='absolute bottom-5 left-5 text-lg'>
                Starting Price: <span className="font-bold">${formatCurrency(item.startingPrice)}</span>
            </div>
            <button className="absolute inset-0 bg-neutral-900 text-black py-2 px-4 rounded-xl opacity-0 hover:opacity-90 transition-opacity duration-300 cursor-default group">
                <Link href={`/items/${item.id}`} className="border bg-white text-black w-fit mx-auto px-4 py-3 font-bold rounded-lg hover:bg-neutral-950 hover:text-white transition-colors duration-200">
                    Place Bid
                </Link>
            </button>
        </div>
    );
}