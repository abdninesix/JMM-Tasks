<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    // The "fillable" property defines which columns can be 
    // changed using the Post::create() or $post->update() methods.
    protected $fillable = [
        'title',
        'description',
        'author'
    ];
}
