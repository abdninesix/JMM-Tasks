import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ products, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get('/products', { search }, { preserveState: true, replace: true });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const deleteProduct = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(`/products/${id}`);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link href="/products/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                    + Add Product
                </Link>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or SKU..."
                    className="border rounded p-2 w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="w-full border shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">SKU</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Stock</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.data.map((product) => (
                        <tr key={product.id} className="border-t">
                            <td className="p-3 font-mono text-sm">{product.sku}</td>
                            <td className="p-3">
                                <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
                                    {product.name}
                                </Link>
                            </td>
                            <td className="p-3">{product.category_name}</td>
                            <td className={`p-3 ${product.is_low_stock ? 'text-red-600 font-bold' : ''}`}>
                                {product.stock_quantity}
                            </td>
                            <td className="p-3">{product.status}</td>
                            <td className="p-3 text-center">
                                <Link href={`/products/${product.id}/edit`} className="text-indigo-600 mr-2">Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className="text-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <div className="mt-6 flex gap-2">
                {products.meta.links.map((link, index) => (
                    <Link 
                        key={index}
                        href={link.url}
                        className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div> */}
        </div>
    );
}