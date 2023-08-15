<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostStatus;
use App\Models\VisibilityType;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


class HomeController extends Controller
{

    public function index()
    {
        // get post that have published & public
        $visibilityId = VisibilityType::where('name', 'public')->first('id');
        $statusId = PostStatus::where('name', 'published')->first('id');

        $posts = Post::where('visibility_id', $visibilityId->id)->where('status_id', $statusId->id)->with(['reactions'])->orderBy('created_at', 'desc')->limit(15)->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'postsData' => $posts,
            'postsData' => $posts,
            'cardCTA' => "Join Our Caring Community",
            'cardLink' => route('register'),
            'cardTitle' => ' Shared Hopes and Dreams 🌟',
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function wishList()
    {
        // get post that have published & public
        $visibilityId = VisibilityType::where('name', 'public')->first('id');
        $statusId = PostStatus::where('name', 'published')->first('id');

        $posts = Post::where('visibility_id', $visibilityId->id)->where('status_id', $statusId->id)->with(['reactions'])->orderBy('created_at', 'desc')->limit(30)->get();

        // check if user is logged in
        if (Auth::check()) {
            return Inertia::render('Common/ExploreWish', [
                'postsData' => $posts,
                'cardCTA' => "Join Our Caring Community",
                'cardLink' => route('register'),
                'cardTitle' => ' Shared Hopes and Dreams 🌟',
            ]);
        } else {

            return Inertia::render('PublicWishList', [
                'postsData' => $posts,
                'cardCTA' => "Join Our Caring Community",
                'cardLink' => route('register'),
                'cardTitle' => ' Shared Hopes and Dreams 🌟',
            ]);
        }
    }
}
