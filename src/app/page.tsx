import { auth } from '@/auth';
import { database } from '@/db/database';
import Image from 'next/image';

export default async function Home() {

  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h2 className='text-2xl font-bold'>Items For Sale</h2>
      <div className='grid grid-cols-3 gap-6'>
        {allItems.map(item => (
          <div key={item.id} className='relative bg-neutral-800 border p-8 rounded-xl'>
            <span className='absolute top-5 left-5'>{item.name}</span>
            <Image className='mx-auto my-10 rounded-lg' src="https://placehold.co/300x300/png?text=Item+Image" width="300" height="300" alt="logo" />
            <span className='absolute bottom-5 left-5'>Starting Price: ${item.startingPrice / 100}</span>
          </div>
        ))}  
      </div>
    </main>
  );
}
