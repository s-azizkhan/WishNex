<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'posts';

    protected $primaryKey = 'id';

    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'content',
        'post_type',
        'author_id',
        'parent_id',
    ];

    // define enum for post type
    const POST_TYPE = [
        'wish',
        'idea',
        'attachment',
        'confession',
    ];

    // define relations
    /**
     * Get the post author
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }
}
