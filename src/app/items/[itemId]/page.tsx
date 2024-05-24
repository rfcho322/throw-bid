import { Button } from '@/components/ui/button';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';

export default async function ItemPage({ params: { itemId }, } : { params: { itemId: string } }) {

    const item = await database.query.items.findFirst({
        where: eq(items.id, parseInt(itemId)),
    });

    if (!item) {
        return(
            <div className='flex flex-col items-center space-y-8  mt-12'>
                <Image src="/empty.svg" width="300" height="300" alt="empty"/>
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

    return (
        <main className="space-y-8">
            <h1 className='text-4xl font-bold'>
                Auction for {`"${item.name}"`}
            </h1>
            <div className='relative w-[300px] h-[300px]'>
                <Image className='mx-auto rounded-lg bg-white' src={item.imageUrl} layout="fill" objectFit="cover" alt="logo" />   
            </div>

            <div className='text-xl'>
                Starting Price of <span className='font-bold'>${item.startingPrice}</span>
            </div>
        </main>
    );
}

