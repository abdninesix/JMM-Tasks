<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile()
    {
        return response()->json([
            'success' => true,
            'user' => new UserResource(auth('api')->user())
        ]);
    }

    public function update(UserUpdateRequest $request)
    {
        $user = auth('api')->user();

        $user->update($request->only('full_name', 'email', 'phone'));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => new UserResource($user)
        ]);
    }
}
