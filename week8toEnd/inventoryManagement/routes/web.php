<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\StudentController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function (Request $request) {
        $filters = $request->only(['search', 'category_id', 'stock']);

        $products = Product::with('category')
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($innerQuery) use ($search) {
                    $innerQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($filters['category_id'] ?? null, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($filters['stock'] ?? null, function ($query, $stockFilter) {
                if ($stockFilter === 'low') {
                    $query->where('stock_quantity', '>', 0)->where('stock_quantity', '<', 10);
                }

                if ($stockFilter === 'out') {
                    $query->where('stock_quantity', '<=', 0);
                }

                if ($stockFilter === 'available') {
                    $query->where('stock_quantity', '>=', 10);
                }
            })
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'products' => $products,
            'categories' => Category::orderBy('name')->get(),
            'filters' => $filters,
        ]);
    });

    Route::get('/cart', function () {
        return Inertia::render('Cart');
    });

    Route::post('/categories', function (Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);
        Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
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

    Route::delete('/products/{product}', function (Product $product) {
        $product->delete();
        return back();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});

// Student routes
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{student}/edit', [StudentController::class, 'edit']);
Route::put('/students/{student}', [StudentController::class, 'update']);
Route::delete('/students/{student}', [StudentController::class, 'destroy']);
Route::post('/students/{id}/restore', [StudentController::class, 'restore']);

// Course routes
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/{course}/edit', [CourseController::class, 'edit']);
Route::put('/courses/{course}', [CourseController::class, 'update']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
Route::delete('/courses/{course}', [CourseController::class, 'destroy']);

Route::get(
    '/test',
    function () {
        return Inertia::render('Sample');
    }
);