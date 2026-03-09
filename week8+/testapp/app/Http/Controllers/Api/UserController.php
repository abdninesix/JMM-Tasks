<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(Profile::all());
    }
}
