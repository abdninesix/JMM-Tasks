<?php

use App\Http\Controllers\AuthController;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

// Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// Authenticated Routes
Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'products' => Product::with('category')->latest()->get(),
            'categories' => Category::all()
        ]);
    });

    Route::post('/categories', function (Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);
        Category::create([
            'name' => $validated['name'],
            'slug' => \Illuminate\Support\Str::slug($validated['name']),
        ]);
        return back();
    });

    Route::post('/products', function (Request $request) {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string',
            'sku' => 'required|unique:products,sku',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'description' => 'nullable|string',
        ]);
        Product::create($validated);
        return back();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});