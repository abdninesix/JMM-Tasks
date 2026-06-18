<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {
    
    Route::prefix('user')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::put('/profile', [UserController::class, 'update']);
        Route::post('/change-password', [UserController::class, 'changePassword']);
        Route::post('/upload-picture', [UserController::class, 'uploadPicture']);
    });

});