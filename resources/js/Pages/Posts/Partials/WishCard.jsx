import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm } from "@inertiajs/react";
import { FileIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from 'react'
import { toast } from "@/Components/ui/use-toast";
import { copyTextToClipboard } from "../List";



function WishCopyBtn({ content }) {
    const [isCopied, setIsCopied] = useState(false);
    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(content)
            .then(() => {
                toast({
                    title: "Hurrray!! 😊",
                    description: 'You just copied one wish.',
                });
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (<Button onClick={handleCopyClick}>  {isCopied ? 'Copied!' : (
        <>
            <FileIcon className="animate-pulse" />Copy
        </>

    )}</Button>);
}


export function WishCard({ post }) {
    const { data, setData, errors, delete: destroy, processing, wasSuccessful } = useForm({
        id: post.id
    });

    const deleteWish = (e) => {
        e.preventDefault();
        destroy(route('posts.destroy', data.id));
    };

    useEffect(() => {
        return () => {
            toast({
                title: "Oops!!",
                description: 'You just deleted one wish.',
            });
        };
    }, [wasSuccessful]);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>My wish 🌟</CardTitle>
                <CardDescription>Turning Dreams into Reality  📨</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {post.content}
                </p>

                <InputError errors={errors} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">
                    <FileIcon className="mr-2 h-4 w-4 animate-pulse" />
                    Edit
                </Button>
                <form onSubmit={(e) => deleteWish(e)}>

                    <Button disabled={processing} variant="destructive">
                        {processing && (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <TrashIcon className="mr-2 h-4 w-4 animate-in" />
                        Remove
                    </Button>
                </form>
                <WishCopyBtn content={post.content} />
            </CardFooter>
        </Card>
    )
}
