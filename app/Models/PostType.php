<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostType extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'post_types';

    protected $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = [
        'name',
    ];

    const POST_TYPE = [
        'wish',
        'idea',
        'attachment',
        'confession',
    ];
}
