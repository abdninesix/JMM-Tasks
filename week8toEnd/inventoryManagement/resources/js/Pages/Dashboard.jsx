import React from 'react';
import Navbar from '../Components/Navbar';
import { useForm, router } from '@inertiajs/react';

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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
            });
        }
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
                            <th className='p-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className={product.stock_quantity < 10 ? 'bg-red-100' : ''}>
                                <td className='p-4'>{product.id}</td>
                                <td className='p-4'>{product.name}</td>
                                <td className='p-4'>{product.sku}</td>
                                <td className='p-4'>{product.category.name}</td>
                                <td className='p-4'>Rs.{product.price}</td>
                                <td className='p-4'>{product.stock_quantity}</td>
                                <td className='p-4'><button className='text-red-500 cursor-pointer hover:underline' onClick={()=>handleDelete(product.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='flex'>

                    <section className='w-1/2 p-4'>
                        <h3 className='text-2xl mb-4'>Add New Category</h3>
                        <form onSubmit={submitCategory} className='flex flex-col gap-4'>
                            <input
                                type="text" placeholder="Category Name"
                                value={categoryForm.data.name}
                                onChange={e => categoryForm.setData('name', e.target.value)}
                                className='p-2'
                            />
                            {categoryForm.errors.name && <div style={{ color: 'red' }}>{categoryForm.errors.name}</div>}
                            <button type="submit" disabled={categoryForm.processing} className='bg-green-600 text-white p-2 w-fit'>
                                {categoryForm.processing ? 'Saving...' : 'Add Category'}
                            </button>
                        </form>
                    </section>

                    <section className='w-1/2 p-4'>
                        <h3 className='text-2xl mb-4'>Add New Product</h3>
                        <form onSubmit={submitProduct} className='flex flex-col gap-4'>
                            <select
                                value={productForm.data.category_id}
                                onChange={e => productForm.setData('category_id', e.target.value)}
                                className='p-2'
                            >
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>

                            <input type="text" placeholder="Product Name" value={productForm.data.name} onChange={e => productForm.setData('name', e.target.value)} className='p-2' />
                            <input type="text" placeholder="SKU" value={productForm.data.sku} onChange={e => productForm.setData('sku', e.target.value)} className='p-2' />
                            <input type="number" placeholder="Price" value={productForm.data.price} onChange={e => productForm.setData('price', e.target.value)} className='p-2' />
                            <input type="number" placeholder="Stock" value={productForm.data.stock_quantity} onChange={e => productForm.setData('stock_quantity', e.target.value)} className='p-2' />

                            <button type="submit" disabled={productForm.processing} className='bg-green-600 text-white p-2 w-fit'>
                                {productForm.processing ? 'Saving...' : 'Add Product'}
                            </button>
                        </form>
                    </section>

                </div>

            </div>
        </div>
    );
}