<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_products' => Product::count(),
                'total_categories' => Category::count(),
                'low_stock_count' => Product::where('stock_quantity', '<', 10)->count(),
            ],
            'low_stock_products' => Product::where('stock_quantity', '<', 10)
                ->with('category')
                ->limit(5)
                ->get()
        ]);
    }
}
