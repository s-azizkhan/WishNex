import { Link, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { ReactionIcon } from "@/Components/ReactionIcon";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button, Button as MyBtn } from "@/components/ui/button"
import InputError from "./InputError";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";


export const PublicWishCard = ({ postData, cardTitle, cardLink, cardCTA, userId = null }) => {

    const { data: commentData, setData: setCommentData, post, errors, processing, reset, wasSuccessful } = useForm({
        content: '',
        postId: postData.id
    });

    useEffect(() => {
        return () => {
            reset('content');
        };
    }, [wasSuccessful]);

    const onThoughtSubmit = (e) => {
        e.preventDefault();

        if (!userId || !postData.enable_comment) {
            toast({
                title: "Opps!",
                description: "The comment feature is currently disabled for this.",
                duration: 1000,
                isClosable: true
            })
            return false;
        }

        post(route('posts.comments.store', {
            id: postData.id
        }));

        document.addEventListener('keydown', e => console.log(
            'altKey                : ' + e.altKey + '\n' +
            'charCode (Deprecated) : ' + e.charCode + '\n' +
            'code                  : ' + e.code + '\n' +
            'ctrlKey               : ' + e.ctrlKey + '\n' +
            'isComposing           : ' + e.isComposing + '\n' +
            'key                   : ' + e.key + '\n' +
            'keyCode (Deprecated)  : ' + e.keyCode + '\n' +
            'location              : ' + e.location + '\n' +
            'metaKey               : ' + e.metaKey + '\n' +
            'repeat                : ' + e.repeat + '\n' +
            'shiftKey              : ' + e.shiftKey + '\n' +
            'which (Deprecated)    : ' + e.which + '\n' +
            'isTrusted             : ' + e.isTrusted + '\n' +
            'type                  : ' + e.type
        ));

        const Podium = {};
        Podium.keydown = function (k) {
            var oEvent = document.createEvent('KeyboardEvent');

            // Chromium Hack
            Object.defineProperty(
                oEvent,
                'keyCode',
                {
                    get: function () {
                        return this.keyCodeVal;
                    }
                }
            );
            Object.defineProperty(
                oEvent,
                'which',
                {
                    get: function () {
                        return this.keyCodeVal;
                    }
                }
            );

            if (oEvent.initKeyboardEvent) {
                oEvent.initKeyboardEvent("keydown", true, true, document.defaultView,
                    false, false, false, false, k, k);
            }
            else {
                oEvent.initKeyEvent("keydown", true, true, document.defaultView,
                    false, false, false, false, k, 0);
            }

            oEvent.keyCodeVal = k;

            if (oEvent.keyCode !== k) {
                alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
            }

            document.dispatchEvent(oEvent);
        }

        toast({
            title: "Hurray! 🎉🥳",
            description: `Your thoughts has been submitted, the author will be notified.`,
            duration: 1500,
            isClosable: true
        });
    };


    const [createdAt, setCreatedAt] = useState(new Date(postData.created_at));

    const formattedSharedTime = moment(postData.created_at).fromNow();

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {cardTitle}
                </h3>
                <p className="mt-2 text-gray-800 dark:text-gray-400">
                    {postData.content}
                </p>
                {cardLink && <Link className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-blue-500 hover:text-blue-700" href={cardLink}>
                    {cardCTA}
                    <svg className="w-2.5 h-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </Link>}
            </div>
            <div className="flex bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
                <p className="mt-1 flex content-center items-center text-sm text-gray-500 dark:text-gray-500">
                    Shared {' '} {formattedSharedTime}

                    <span>
                        <ReactionIcon key={postData.id} postData={postData} userId={userId} />
                    </span>

                    <span className="cursor-pointer">
                        {postData.enable_comment === 1 && <Dialog>
                            <DialogTrigger accessKey="comment" asChild>
                                <ChatBubbleIcon />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Comments</DialogTitle>
                                    <DialogDescription>
                                        Encourage others to share their thoughts & ideas, help others out, and more.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={onThoughtSubmit} >
                                    <div className="grid gap-4 py-4">
                                        <Textarea
                                            placeholder="Add your thoughts... here"
                                            required
                                            key={postData.id}
                                            value={commentData.content}
                                            onChange={(e) => setCommentData('content', e.target.value)}
                                            data-isfocused={true}
                                            autoComplete="content"
                                            className="col-span-3" />

                                        <InputError className="mt-2" />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Add thoughts </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>}
                    </span>
                </p>

                {/*Reaction button*/}
            </div>
        </div>
    );
}