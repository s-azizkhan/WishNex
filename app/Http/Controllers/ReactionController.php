<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use App\Http\Requests\StoreReactionRequest;
use App\Http\Requests\UpdateReactionRequest;
use App\Models\Post;
use App\Models\ReactionType;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function add_reaction(StoreReactionRequest $request, Post $post)
    {
        $reactionType = ReactionType::where('name', $request->reactionType)->first();
        $userId = auth()->user()->id;

        // check user already had reaction to this post
        $checkPrevReaction = Reaction::where('user_id', $userId)
            ->where('post_id', $post->id)->first();

        // if hav then revers the reaction
        if ($checkPrevReaction) {
            $checkPrevReaction->delete();
            // update reaction count
            $post->update([
                'reaction_count' => $post->reaction_count - 1,
            ]);

            return redirect()->back();
        }


        $post->reactions()->create([
            'user_id' => $userId,
            'reaction_type_id' => $reactionType->id
        ]);
        // update reaction count
        $post->update([
            'reaction_count' => $post->reaction_count + 1,
        ]);
        return redirect()->back();
    }
}
