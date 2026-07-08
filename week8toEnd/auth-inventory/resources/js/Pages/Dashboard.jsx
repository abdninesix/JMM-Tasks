import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

export default function Dashboard({ stats, low_stock_products }) {
    return (
        <>
            <Navbar />
            <div className="p-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Inventory Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Products</p>
                        <p className="text-3xl font-semibold">{stats.total_products}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Total Categories</p>
                        <p className="text-3xl font-semibold">{stats.total_categories}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                        <p className="text-sm text-gray-500 uppercase font-bold">Low Stock Alert</p>
                        <p className="text-3xl font-semibold text-red-600">{stats.low_stock_count}</p>
                        <p className="text-xs text-gray-400">Items with less than 10 units</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h2 className="font-bold text-gray-700">Low Stock Items</h2>
                        <Link href="/products" className="text-blue-600 text-sm hover:underline">
                            View All Products
                        </Link>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-sm text-gray-500 uppercase border-b">
                                <th className="p-4">Product</th>
                                <th className="p-4">SKU</th>
                                <th className="p-4">Current Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {low_stock_products.length > 0 ? (
                                low_stock_products.map(product => (
                                    <tr key={product.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{product.name}</td>
                                        <td className="p-4 text-gray-600">{product.sku}</td>
                                        <td className="p-4 text-red-600 font-bold">{product.stock_quantity}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-400">
                                        All products are well-stocked!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}