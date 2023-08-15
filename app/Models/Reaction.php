<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'reaction_type_id',
        'post_id',
        'user_id',  
    ];
}
