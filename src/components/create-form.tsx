'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { LoaderCircleIcon } from 'lucide-react';
import { DatePickerDemo } from '@/components/date-picker';
import { createItemAction } from '@/app/items/create/actions';

export default function CreateForm() {
    
    const [date, setDate] = useState<Date | undefined>();

    const [file, setFile] = useState<File>();

    const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item);
    }
    // WE CHECK IF FILE OBJECT EXISTS   
    // console.log(file);

    const upload = async () => {
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("upload_preset", "throw_bid");
        const res = await fetch("https://api.cloudinary.com/v1_1/dkku4m4ll/image/upload", {
            method: "POST",
            body: formData,
        });

        const resImage = await res.json();
        return resImage.url;
    }

    return (
        <main className="space-y-8">
            <h1 className='text-4xl font-bold'>
                Add an item to sell
            </h1>
            <form
                className='flex flex-col border p-8 rounded-xl space-y-4 max-w-lg'
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (!date) {
                        return;
                    }
                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);

                    const url = await upload();
                    const name = formData.get("name") as string;
                    const startingPrice = parseInt(formData.get("startingPrice") as string);
                    const priceWithCents = Math.floor(startingPrice * 100);

                    await createItemAction({
                        imageUrl: url,
                        name,
                        startingPrice: priceWithCents,
                        endDate: date,
                    });
                }}>
                <Input className='text-white max-w-lg bg-neutral-800' 
                    name="name" type="text" placeholder='Name your item' />
                <Input className='text-white max-w-lg bg-neutral-800' 
                    name="startingPrice" type="number" step="0.01" placeholder='Place your starting price' />
                <Input className='max-w-lg bg-neutral-800'
                    name="file" type="file" 
                    onChange={handleImage}/>
                <DatePickerDemo 
                    date={date}
                    setDate={setDate}
                />
                <LoadingButton />
            </form>
        </main>
    );
}

export function LoadingButton () {
    const { pending } = useFormStatus();
    return (
        <Button className='flex gap-2 self-end border bg-white text-black hover:text-white' 
            type='submit' disabled={pending}>
            {pending && <LoaderCircleIcon className='animate-spin'/> } Post Item 
        </Button>
    );
}
