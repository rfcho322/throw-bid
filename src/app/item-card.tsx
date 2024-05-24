import { Item } from "@/db/schema";
import Image from "next/image";

export function ItemCard ({ item } : { item : Item }) {
    return (
        <div key={item.id} className='relative h-[400px] bg-neutral-800 border p-8 rounded-xl'>
            <span className='absolute top-5 left-5'>{item.name}</span>
            <div style={{ position: "relative", width: "100%", paddingBottom: "75%" }}>
                <Image className='mx-auto my-8 rounded-lg' src={item.imageUrl} layout="fill" objectFit="cover" alt="logo" />
            </div>
            <span className='absolute bottom-5 left-5'>Starting Price: ${item.startingPrice / 100}</span>
        </div>
    );
}