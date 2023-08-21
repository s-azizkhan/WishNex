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
        'author_id',
        'parent_id',
        'post_type_id',
        'visibility_id',
        'status_id',
        'enable_comment',
        'enable_reaction',
        'comment_count',
        'reaction_count',
    ];

    // Define a custom accessor for the content attribute
    public function getContentAttribute()
    {
        return 'I ' . $this->postType->name . ' ' . $this->attributes['content'];
        //return 'I wish ' . $this->postType()->name . $this->attributes['content'];
    }

    // define relations
    /**
     * Get the post author
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    /**
     * Post type
     */
    public function postType()
    {
        return $this->belongsTo(PostType::class, 'post_type_id', 'id');
    }

    /**
     * Post status
     */
    public function status()
    {
        return $this->belongsTo(PostStatus::class, 'status_id', 'id');
    }

    /**
     * Post visibility
     */
    public function visibility()
    {
        return $this->belongsTo(VisibilityType::class, 'visibility_id', 'id');
    }

    /**
     * Reactions
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'post_id', 'id');
    }

    /**
     * Comments
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }
}
