<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function changePassword(PasswordUpdateRequest $request)
    {
        $user = auth('api')->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Current password is incorrect'], 400);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['success' => true, 'message' => 'Password changed successfully']);
    }
}
