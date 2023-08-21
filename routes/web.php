<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Run artisan cmd to setup on fresh install
 */
Route::get('/install', function () {
    Artisan::call('migrate:fresh');
    Artisan::call('optimize');
    return redirect()->route('home');
});
Route::get('/cc', function () {
    Artisan::call('optimize');
    return redirect()->route('home');
});


Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/wish-list', [HomeController::class, 'wishList'])->name('public.wish.list');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // reactions route
    Route::post('add-reaction/{post}', [ReactionController::class, 'add_reaction'])->name('posts.reactions.store');
    
    // comments route
    Route::post('add-comment/{post}', [CommentController::class, 'add_comment'])->name('posts.comments.store');

    // post routes
    Route::resource('posts', PostController::class);
});

require __DIR__ . '/auth.php';
