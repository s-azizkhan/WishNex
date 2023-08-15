<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostMeta extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'post_id',
        'meta_key',
        'meta_value',
    ];
}
