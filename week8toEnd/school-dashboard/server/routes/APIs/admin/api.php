<?php

use App\Http\Controllers\Api\AdminController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {

    Route::middleware('role:Admin')->prefix('admin')->group(function () {
        Route::get('/users', [AdminController::class, 'index']);
        Route::post('/users/{user}/assign-role', [AdminController::class, 'assignRole']);
        Route::delete('/users/{user}', [AdminController::class, 'destroy']);
    });

});