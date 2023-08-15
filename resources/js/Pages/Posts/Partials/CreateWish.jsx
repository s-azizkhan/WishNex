import { Button } from "@/components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InputError from "@/Components/InputError";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";

export function CreateWishForm() {
    const { data, setData, post, errors, processing, reset, wasSuccessful } = useForm({
        content: '',
        postType: 'wish',
    });

    useEffect(() => {
        return () => {
            reset('content');
            toast({
                title: "Hurra! 🎉🥳",
                description: 'Your wish has been created.',
            });
        };
    }, [wasSuccessful]);


    const onSubmit = (e) => {
        e.preventDefault();

        post(route('posts.store'));
    };

    return (
        <>
            <form onSubmit={onSubmit} className="w-2/3 space-y-6">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="content">I wish for...</Label>
                    <Textarea
                        id="content"
                        name="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                        placeholder="Type your wish here."
                    />
                    <InputError message={errors.content} className="mt-2" />
                    <p className="text-sm text-muted-foreground">
                        {/*print the content here*/}
                        I wish {data.content}
                    </p>

                    
                     <Label htmlFor="content">I wish for...</Label>
                    <Textarea
                        id="content"
                        name="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                        placeholder="Type your wish here."
                    />
                    <InputError message={errors.content} className="mt-2" />

                </div>

                <Button disabled={processing}>
                    {processing && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create
                </Button>
            </form>

            <Link href={route('posts.index')}>
                <Button variant="outline" className="mt-4">
                    <ChevronRightIcon className="mr-2 h-4 w-4" /> View All wishes
                </Button>
            </Link>

        </>
    );
}
