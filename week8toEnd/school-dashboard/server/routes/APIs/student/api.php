<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {

    Route::middleware('role:Student')->prefix('student')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['success' => true, 'message' => 'Welcome to Student Dashboard']);
        });
    });

});