<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'dob' => $request->dob,
            'role' => 'user',
        ]);

        $token = auth('api')->login($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User registered',
            'token' => $token,
            'user' => new UserResource($user),
        ], 201);
    }

    public function login(UserLoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'token' => $token,
            'user' => new UserResource(auth('api')->user()),
        ]);
    }

    public function me()
    {
        try {
            return response()->json([
                'status' => 'success',
                'user' => new UserResource(auth('api')->userOrFail()),
            ]);
        } catch (JWTException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token not valid'], 401);
        }
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['status' => 'success', 'message' => 'Logged out successfully']);
    }

    public function refresh()
    {
        try {
            $token = auth('api')->refresh();
            return response()->json([
                'status' => 'success',
                'message' => 'Token refreshed',
                'token' => $token
            ]);
        } catch (TokenExpiredException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token invalid'], 401);
        }
    }
}
