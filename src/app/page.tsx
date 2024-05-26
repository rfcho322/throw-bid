import { database } from '@/db/database';
import { ItemCard } from './item-card';

export default async function Home() {

  const allItems = await database.query.items.findMany();

  return (
    <main className="space-y-8">
      <h2 className='text-4xl font-bold'>Items For Sale</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {allItems.map(item => (
          <ItemCard key={item.id} item={item}/>
        ))}  
      </div>
    </main>
  );
}
