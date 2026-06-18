<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);

        Route::get('/user/profile', [UserController::class, 'profile']);
        Route::put('/user/profile', [UserController::class, 'update']);
        Route::post('/user/change-password', [UserController::class, 'changePassword']);
        Route::post('/user/upload-picture', [UserController::class, 'uploadPicture']);
    });
});

Route::middleware(['auth:api', 'isAdmin'])->group(function () {
    Route::get('/admin/users', function () {
        return response()->json([
            'status' => 'success',
            'users' => \App\Http\Resources\UserResource::collection(\App\Models\User::all())
        ]);
    });
});