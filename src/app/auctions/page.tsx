import { auth } from '@/auth';
import { database } from '@/db/database';
import { ItemCard } from '../item-card';
import { eq } from 'drizzle-orm';
import { items } from '@/db/schema';
import { EmptyState } from './empty-state';
import { redirect } from 'next/navigation';

export default async function MyAuctionPage() {

  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
    // redirect("/");
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="space-y-8">
      <h2 className='text-4xl font-bold'>Your Current Auctions</h2>
      {hasItems ? (
        <div className='grid grid-cols-3 gap-6'>
            {allItems.map(item => (
            <ItemCard key={item.id} item={item}/>
            ))}  
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
