<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactionType extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    const REACTION_TYPES = [
        'like' => 'Like',
        'love' => 'Love',
        'me_too' => 'Me Too',
        'support' => 'Support',
        'us_bro' => 'Us Bro',
    ];
}
