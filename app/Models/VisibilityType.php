<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisibilityType extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    const VISIBILITY_TYPES = [
        'public' => 'Public',
        'private' => 'Private',
        'only_me' => 'Only Me',
        'only_connection' => 'Only Connection',
    ];

    // relations
    public function posts()
    {
        return $this->hasMany(Post::class, 'visibility_id', 'id');
    }
}
