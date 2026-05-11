<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('task1', [StudentController::class, 'task1']);
Route::get('task2', [StudentController::class, 'task2']);
Route::get('task3', [StudentController::class, 'task3']);
Route::get('task4', [StudentController::class, 'task4']);
Route::get('task5', [StudentController::class, 'task5']);
Route::get('dashboard', [DashboardController::class, 'index']);