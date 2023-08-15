<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostStatus;
use App\Models\PostType;
use App\Models\VisibilityType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Auth::user()->posts()->with(['visibility', 'status'])->get();
        return Inertia::render('Posts/List', [
            'posts' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $post_statuses = PostStatus::all();
        $post_visibilities = VisibilityType::all();
        $post_type = PostType::where(['name' => 'wish'])->first();

        return Inertia::render('Posts/Create', [
            'postStatuses' => $post_statuses,
            'postVisibilities' => $post_visibilities,
            'postType' => $post_type
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'content' => 'bail|required|string|max:255',
            'postTypeId' => 'bail|required|uuid',
            'visibilityId' => 'bail|required|uuid',
            'postTypeId' => 'bail|required|uuid',
            'enableComment' => 'bail|boolean',
            'enableReaction' => 'bail|boolean',
        ]);


        $data = [
            'content' => $request->content,
            'post_type_id' => $request->postTypeId,
            'visibility_id' => $request->visibilityId,
            'status_id' => $request->postStatusId,
            'enable_comment' => $request->enableComment,
            'enable_reaction' => $request->enableReaction,
        ];

        Auth::user()->posts()->create($data);

        return Redirect::route('posts.create')->with(['message' => strtoupper($request->postType) . ' created!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $data = $post->with(['visibility', 'status'])->get();
        dd($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post_statuses = PostStatus::all();
        $post_visibilities = VisibilityType::all();
        $post_type = PostType::where(['name' => 'wish'])->first();

        return Inertia::render('Posts/Edit', [
            'postStatuses' => $post_statuses,
            'postVisibilities' => $post_visibilities,
            'postType' => $post_type,
            'postData' => $post
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // validate request
        $request->validate([
            'content' => 'bail|required|string|max:255',
            'postTypeId' => 'bail|required|uuid',
            'visibilityId' => 'bail|required|uuid',
            'postTypeId' => 'bail|required|uuid',
            'enableComment' => 'bail|boolean',
            'enableReaction' => 'bail|boolean',
        ]);

        $data = [
            'content' => $request->content,
            'post_type_id' => $request->postTypeId,
            'visibility_id' => $request->visibilityId,
            'status_id' => $request->postStatusId,
            'enable_comment' => $request->enableComment,
            'enable_reaction' => $request->enableReaction
        ];

        // update
        $post->update($data);

        // redirect to index
        return Redirect::route('posts.index')->with(['message' => strtoupper($request->postType) . ' updated!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->author_id === Auth::user()->id) {
            Post::destroy($post->id);
        }
        return Redirect::route('posts.index')->with(['message' => 'Wish deleted!']);
    }
}
