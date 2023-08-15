<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostStatus extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    const POST_STATUS_TYPES = [
        'draft' => 'Draft',
        'published' => 'Published',
        'archived' => 'Archived',
        'deleted' => 'Deleted',
    ];
}
