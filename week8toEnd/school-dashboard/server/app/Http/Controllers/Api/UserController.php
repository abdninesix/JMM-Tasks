<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordUpdateRequest;
use App\Http\Requests\ProfilePictureRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

        $user->update([
            'full_name' => formatName($request->full_name),
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

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

    public function uploadPicture(ProfilePictureRequest $request)
    {
        $user = auth('api')->user();

        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $path = $request->file('image')->store('uploads/profiles', 'public');

        $user->update(['profile_picture' => $path]);

        return response()->json([
            'success' => true,
            'message' => 'Profile picture uploaded successfully',
            'image_url' => asset('storage/' . $path)
        ]);
    }
}
