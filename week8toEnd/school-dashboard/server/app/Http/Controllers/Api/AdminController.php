<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with('roles')->get());
    }

    public function assignRole(Request $request, User $user)
    {
        $role = Role::where('name', $request->role)->firstOrFail();

        $user->roles()->syncWithoutDetaching([$role->id]);

        return response()->json([
            'success' => true,
            'message' => "Role {$request->role} assigned to {$user->full_name}"
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['success' => true, 'message' => 'User deleted']);
    }
}
