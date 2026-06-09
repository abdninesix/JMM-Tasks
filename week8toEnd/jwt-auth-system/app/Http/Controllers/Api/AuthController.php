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
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

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

        $token = JWTAuth::login($user);

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

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'token' => $token,
            'user' => new UserResource(JWTAuth::user()),
        ]);
    }

    public function me()
    {
        try {
            return response()->json([
                'status' => 'success',
                'user' => new UserResource(JWTAuth::userOrFail()),
            ]);
        } catch (JWTException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token not valid'], 401);
        }
    }

    public function logout()
    {
        JWTAuth::logout();
        return response()->json(['status' => 'success', 'message' => 'Logged out successfully']);
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::refresh();
            return response()->json([
                'status' => 'success',
                'message' => 'Token refreshed',
                'token' => $token
            ]);
        } catch (TokenExpiredException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['status' => 'error', 'message' => 'Token invalid'], 401);
        }
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $token = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => $token,
                'created_at' => now()
            ]
        );
        return response()->json([
            'status' => 'success',
            'message' => 'Password reset link sent to your email',
            'token' => $token
        ], 200);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $resetData = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$resetData) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid token or email'
            ], 400);
        }

        User::where('email', $request->email)->first()->update(['password' => Hash::make($request->password)]);

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Password has been reset successfully'
        ], 200);
    }
}
