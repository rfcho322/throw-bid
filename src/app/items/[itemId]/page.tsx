import { formatCurrency } from '@/app/utils/currency';
import { Button } from '@/components/ui/button';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { formatDistance } from 'date-fns';
import { eq } from 'drizzle-orm';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function FormatDate(timeStamp: Date) {
    return formatDistance(timeStamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({ params: { itemId }, }: { params: { itemId: string } }) {

    const item = await database.query.items.findFirst({
        where: eq(items.id, parseInt(itemId)),
    });

    if (!item) {
        return (
            <div className='flex flex-col items-center space-y-8  mt-12'>
                <Image src="/empty.svg" width="300" height="300" alt="empty" />
                <h1 className='text-4xl font-bold'>Item not found</h1>
                <p className='text-center'>We couldn&apos;t find the item you&apos;re looking for.<br /> Please check the URL and try again.</p>
                <Button asChild
                    className="border bg-white text-black hover:text-white"
                >
                    <Link href="/">Back to Home Page</Link>
                </Button>
            </div>
        );
    }

    // const bids = [
    //     {
    //         id: 1,
    //         amount: 100,
    //         userName: "John",
    //         timeStamp: new Date(),
    //     },
    //     {
    //         id: 2,
    //         amount: 200,
    //         userName: "Alice",
    //         timeStamp: new Date(),
    //     },
    //     {
    //         id: 3,
    //         amount: 300,
    //         userName: "Bob",
    //         timeStamp: new Date(),
    //     }

    // ];

    const bids = [];
    const hasBids = bids.length > 0;

    return (
        <main className="space-y-8">
            <h1 className='text-4xl'>
                Auction for <span className='font-extrabold'>{item.name}</span>
            </h1>
            <div className='flex flex-wrap gap-8'>
                <div className='flex-1 space-y-4'>
                    <div className='relative w-[400px] h-[400px]'>
                        <Image className='mx-auto rounded-lg bg-white' src={item.imageUrl} layout="fill" objectFit="cover" alt="logo" />
                    </div>
                    <div className='flex flex-col gap-2 text-xl'>
                        <div>
                            Starting Price: <span className='font-bold'>${formatCurrency(item.startingPrice)}</span>
                        </div>
                        <div>
                            Bid Interval: <span className='font-bold'>${formatCurrency(item.bidinterval)}</span>
                        </div>
                    </div>
                </div>
                <div className='flex-1 space-y-4 border rounded-xl p-7'>
                    <h2 className='text-2xl font-bold'>Current Bids</h2>
                {hasBids ? (
                    <>
                        <ul className='flex flex-col gap-4'>
                            {bids.map((bid) => (
                                <li key={bid.id}
                                    className='bg-neutral-800 rounded-xl p-5'
                                >
                                    <div className='flex gap-4'>
                                        <div>
                                            <span className='font-bold'>{bid.userName}</span> bid {" "}
                                            <span className='font-bold'>${bid.amount}</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                                            <Clock className='w-5 h-5'/> 
                                            {FormatDate(bid.timeStamp)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>    

                ) : (
                    <div className="space-y-4 flex flex-1 flex-col items-center">
                        <Image className='mt-8' src="/no-bid.svg" width="300" height="300" alt="empty"/>
                        <h2 className="text-2xl font-bold">No bids yet</h2>
                        <Button className='border bg-white text-black hover:text-white'>Place a Bid</Button>
                    </div>
                )}
                </div>
            </div>
        </main>
    );
}

