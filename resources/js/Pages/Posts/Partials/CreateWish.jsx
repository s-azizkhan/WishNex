import { Button } from "@/components/ui/button";
import { toast } from "@/Components/ui/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InputError from "@/Components/InputError";
import { FilePlusIcon, FileTextIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToastAction } from "@/Components/ui/toast";
import { Switch } from "@/components/ui/switch"

export function CreateWishForm({ postStatuses, postVisibilities, postType, postData = null }) {
    const { data, setData, post, errors, processing, reset, wasSuccessful, patch } = useForm({
        content: postData?.content.removeFirstTwoWords() || '',
        postTypeId: postData?.post_type_id || postType.id,
        visibilityId: postData?.visibility_id || postVisibilities[0].id,
        postStatusId: postData?.status_id || postStatuses[0].id,
        enableComment: postData?.enable_comment || false,
        enableReaction: postData?.enable_reaction || false
    });


    useEffect(() => {
        return () => {
            reset('content');
        };
    }, [wasSuccessful]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (postData) {
            patch(route('posts.update', postData.id));
        } else {
            post(route('posts.store'));
        }

        toast({
            title: "Hurray! 🎉🥳",
            description: `Your wish has been ${postData ? 'updated' : 'created'} `,
            action: (!postData &&
                <ToastAction altText="View All wishes">
                    <Link href={route('posts.index')}>
                        View All wishes
                    </Link>
                </ToastAction>
            ),
        });
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
                    <p className="text-sm text-muted-foreground">
                        {/*print the content here*/}
                        I wish {data.content}
                    </p>
                    <InputError message={errors.content} className="mt-2" />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="visibilityId">Choose your Wish Visibility</Label>
                    <Select
                        name="visibilityId"
                        onValueChange={(value) => setData('visibilityId', value)}
                        value={data.visibilityId}
                        required
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            {postVisibilities.map((visibility) => (
                                <SelectItem value={visibility.id} key={visibility.id}>{visibility.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.visibilityId} className="mt-2" />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="postStatusId">Choose your Wish Status</Label>
                    <Select
                        name="postStatusId"
                        onValueChange={(value) => setData('postStatusId', value)}
                        value={data.postStatusId}
                        required
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Choose Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {postStatuses.map((postStatus) => (
                                <SelectItem value={postStatus.id} key={postStatus.id}>{postStatus.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.postStatusId} className="mt-2" />
                </div>

                <div className="grid w-full gap-1.5">
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={data.enableComment}
                            onClick={() => setData('enableComment', !data.enableComment)}
                            name="enableComment"
                            id="enableComment"
                        />
                        <Label htmlFor="enableComment">Enable Comment on Wish</Label>

                        <Switch
                            checked={data.enableReaction}
                            onClick={() => setData('enableReaction', !data.enableReaction)}
                            name="enableReaction"
                            id="enableReaction"
                        />
                        <Label htmlFor="enableReaction">Enable Reaction on Wish</Label>
                    </div>
                    <InputError message={errors.enableComment} className="mt-2" />
                    <InputError message={errors.enableReaction} className="mt-2" />
                </div>

                <div className="grid w-full gap-1.5">
                </div>

                <Button disabled={processing}>
                
                    {processing && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {postData ? <FileTextIcon className="mr-2 h-4 w-4in" /> : <FilePlusIcon className="mr-2 h-4 w-4in" />}
                    {postData ? 'Update' : 'Create'} your wish
                </Button>
            </form>

            {/*<Link href={route('posts.index')}>
                <Button variant="outline" className="mt-4  animate-pulse font-bold">
                    <ChevronRightIcon className="mr-2 h-4 w-4" /> View All wishes
                </Button>
            </Link>*/}

        </>
    );
}
