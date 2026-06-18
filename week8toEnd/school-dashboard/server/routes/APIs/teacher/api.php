<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {

    Route::middleware('role:Teacher')->prefix('teacher')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['success' => true, 'message' => 'Welcome to Teacher Dashboard']);
        });
    });

});