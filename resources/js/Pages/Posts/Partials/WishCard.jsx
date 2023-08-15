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
import { Link, useForm } from "@inertiajs/react";
import { ClipboardIcon, Pencil2Icon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from 'react'
import { toast } from "@/Components/ui/use-toast";
import { copyTextToClipboard } from "../List";
import { Badge } from "@/components/ui/badge"



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
            <ClipboardIcon className="animate-pulse" />Copy
        </>

    )}</Button>);
}


export function WishCard({ postData }) {
    const { data, setData, errors, delete: destroy, processing, wasSuccessful } = useForm({
        id: postData.id
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
                <CardTitle>
                    My {postData.post_type.name} 🌟
                    <Badge className="ml-2" >
                        {postData.status.name}
                    </Badge>

                    <Badge className="ml-2" variant="secondary" >
                        {postData.visibility.name}
                    </Badge>
                </CardTitle>
                <CardDescription>Turning Dreams into Reality  📨</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {postData.content}
                </p>

                <InputError errors={errors} />
            </CardContent>
            <CardFooter className="flex justify-between">
                <form onSubmit={(e) => deleteWish(e)}>

                    <Button disabled={processing} variant="destructive">
                        {processing && (
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <TrashIcon className="mr-2 h-4 w-4 animate-in" />
                        Remove
                    </Button>
                </form>
                <Link href={route('posts.edit', postData.id)}>
                    <Button variant="outline">
                        <Pencil2Icon className="mr-2 h-4 w-4 animate-pulse" />
                        Edit
                    </Button>
                </Link>
                <WishCopyBtn content={postData.content} />
            </CardFooter>
        </Card>
    )
}
