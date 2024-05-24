import { auth } from '@/auth';
import { database } from '@/db/database';
import { ItemCard } from './item-card';

export default async function Home() {

  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h2 className='text-2xl font-bold'>Items For Sale</h2>
      <div className='grid grid-cols-3 gap-6'>
        {allItems.map(item => (
          <ItemCard key={item.id} item={item}/>
        ))}  
      </div>
    </main>
  );
}
