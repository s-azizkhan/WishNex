import { Link, Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarIcon, HeartFilledIcon, HeartIcon, ReloadIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


export function ReactionIcon({ postData, userId = null }) {

    const { data, setData, post, errors, processing, reset, wasSuccessful } = useForm({
        reactionType: 'like',
    });

    const isUserReacted = () => {
        const [value] = postData.reactions.map((reaction) => {
            if (reaction.user_id === userId) {
                return true;
            }
            return false;
        })
        return value;
    }

    const addReaction = async (e) => {
        e.preventDefault();

        if (!userId) return false;

        post(route('posts.reactions.store', {
            id: postData.id
        }));
    }
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="button" onClick={(e) => addReaction(e)} disabled={processing}>
                    {userId && isUserReacted() ? <HeartFilledIcon className='text-red-500' /> : <HeartIcon className='text-white' />}
                    {processing && (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                    {/*<Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>*/}
                    <div className="space-y-1">
                        <p className="text-sm font-semibold"> {postData.reaction_count} Reactions</p>
                        {!userId && <p className="text-sm">
                            Login to add your reaction
                        </p>}
                        <div className="flex items-center pt-2">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Last reaction 1 minute ago
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}