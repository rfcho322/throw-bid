import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction } from './actions';

export default async function CreatePage() {

    return (
        <main className="container mx-auto py-12 space-y-8">
            <h1 className='text-4xl font-bold'>
                Add an item to sell
            </h1>
            <form
                className='flex flex-col border p-8 rounded-xl space-y-4 max-w-lg'
                action={createItemAction}>
                <Input className='text-white max-w-lg bg-neutral-800' 
                    name="name" type="text" placeholder='Name your item' />
                <Input className='text-white max-w-lg bg-neutral-800' 
                name="startingPrice" type="number" step="0.01" placeholder='Place your starting price' />
                <Button className='self-end border bg-white text-black hover:text-white' type='submit'>Post Item</Button>
            </form>
        </main>
    );
}
