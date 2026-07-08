import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ product, categories }) {
    const { data, setData, put, errors } = useForm({
        name: product.data.name || '',
        sku: product.data.sku || '',
        category_id: product.data.category_id || '',
        price: product.data.price || '',
        stock_quantity: product.data.stock_quantity || '',
        status: product.data.status || 'Active',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/products/${product.data.id}`, data);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label>Name</label>
                    <input type="text" className="w-full border p-2" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label>SKU (Unique)</label>
                    <input type="text" className="w-full border p-2" value={data.sku} onChange={e => setData('sku', e.target.value)} />
                    {errors.sku && <p className="text-red-500">{errors.sku}</p>}
                </div>

                <div>
                    <label>Category</label>
                    <select className="w-full border p-2" value={data.category_id} onChange={e => setData('category_id', e.target.value)}>
                        <option value="">Select Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    {errors.category_id && <p className="text-red-500">{errors.category_id}</p>}
                </div>

                <div>
                    <label>Price</label>
                    <input type="number" step="0.01" className="w-full border p-2" value={data.price} onChange={e => setData('price', e.target.value)} />
                </div>

                <div>
                    <label>Stock Quantity</label>
                    <input type="number" className="w-full border p-2" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} />
                </div>

                <div className="col-span-2">
                    <label>Status</label>
                    <select className="w-full border p-2" value={data.status} onChange={e => setData('status', e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2 mt-4">Save Product</button>
                    <Link href="/products" className="text-gray-600">Cancel</Link>
                </div>
            </form>
        </div>
    );
}