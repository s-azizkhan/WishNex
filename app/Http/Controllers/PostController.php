<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Error;
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
        $data = Auth::user()->posts;
        return Inertia::render('Posts/List', [
            'posts' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:255',
            'postType' => 'required|in:wish,idea,attachment,confession',
        ]);


        $data = [
            'content' => 'I ' . $request->postType . ' ' . $request->content,
            'post_type' => $request->postType,
        ];

        Auth::user()->posts()->create($data);

        return Redirect::route('posts.create')->with(['message' => strtoupper($request->postType) . ' created!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
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
