import React from 'react';
import Navbar from '../Components/Navbar';
import { useForm } from '@inertiajs/react';

export default function Dashboard({ products, categories }) {

    const categoryForm = useForm({
        name: '',
    });

    const productForm = useForm({
        category_id: '',
        name: '',
        sku: '',
        price: '',
        stock_quantity: '',
        description: '',
    });

    const submitCategory = (e) => {
        e.preventDefault();
        categoryForm.post('/categories', {
            onSuccess: () => categoryForm.reset(),
        });
    };

    const submitProduct = (e) => {
        e.preventDefault();
        productForm.post('/products', {
            onSuccess: () => productForm.reset(),
        });
    };

    return (
        <div>
            <Navbar />
            <div className='p-8'>
                <h1 className='text-2xl text-center p-8'>Product Inventory</h1>
                <table className='border text-left w-full'>
                    <thead>
                        <tr>
                            <th className='p-4'>ID</th>
                            <th className='p-4'>Name</th>
                            <th className='p-4'>SKU</th>
                            <th className='p-4'>Category</th>
                            <th className='p-4'>Price</th>
                            <th className='p-4'>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className={product.stock_quantity < 15 ? 'bg-red-50' : ''}>
                                <td className='p-4'>{product.id}</td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4'>{product.sku}</td>
                                <td className='p-4'>{product.category.name}</td>
                                <td className='p-4'>Rs.{product.price}</td>
                                <td className='p-4'>{product.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

                    <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                        <h3>Add New Category</h3>
                        <form onSubmit={submitCategory}>
                            <input
                                type="text" placeholder="Category Name"
                                value={categoryForm.data.name}
                                onChange={e => categoryForm.setData('name', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                            />
                            {categoryForm.errors.name && <div style={{ color: 'red' }}>{categoryForm.errors.name}</div>}
                            <button type="submit" disabled={categoryForm.processing}>
                                {categoryForm.processing ? 'Saving...' : 'Add Category'}
                            </button>
                        </form>
                    </section>

                    <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                        <h3>Add New Product</h3>
                        <form onSubmit={submitProduct}>
                            <select
                                value={productForm.data.category_id}
                                onChange={e => productForm.setData('category_id', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <input type="text" placeholder="Product Name" value={productForm.data.name} onChange={e => productForm.setData('name', e.target.value)} />
                            <input type="text" placeholder="SKU" value={productForm.data.sku} onChange={e => productForm.setData('sku', e.target.value)} />
                            <input type="number" placeholder="Price" value={productForm.data.price} onChange={e => productForm.setData('price', e.target.value)} />
                            <input type="number" placeholder="Stock" value={productForm.data.stock_quantity} onChange={e => productForm.setData('stock_quantity', e.target.value)} />

                            <button type="submit" disabled={productForm.processing} style={{ background: 'green', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                                {productForm.processing ? 'Saving...' : 'Add Product'}
                            </button>
                        </form>
                    </section>

                </div>

            </div>
        </div>
    );
}