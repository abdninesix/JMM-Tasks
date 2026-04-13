import React from 'react';
import Navbar from '../Components/Navbar';
import { useForm, router, Head } from '@inertiajs/react';

export default function Dashboard({ products, categories, filters = {} }) {

    const categoryForm = useForm({
        name: '',
    });

    const filterForm = useForm({
        search: filters.search ?? '',
        category_id: filters.category_id ?? '',
        stock: filters.stock ?? '',
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

    const submitFilters = (e) => {
        e.preventDefault();

        router.get('/dashboard', {
            search: filterForm.data.search || undefined,
            category_id: filterForm.data.category_id || undefined,
            stock: filterForm.data.stock || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        filterForm.setData({
            search: '',
            category_id: '',
            stock: '',
        });

        router.get('/dashboard', {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleAddToCart = (product) => {
        const existingItems = JSON.parse(window.localStorage.getItem('cartItems') || '[]');
        const matchingItem = existingItems.find(item => item.id === product.id);

        const updatedItems = matchingItem
            ? existingItems.map(item => item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item)
            : [
                ...existingItems,
                {
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    price: Number(product.price),
                    category: product.category?.name || 'Uncategorized',
                    quantity: 1,
                },
            ];

        window.localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cart-updated'));
    };

    return (
        <>
            <Head title='Dashboard' />
            <Navbar />
            <div className='p-8'>
                <h1 className='text-2xl text-center p-8'>Product Inventory</h1>
                <section className='mb-8 rounded border p-4'>
                    <form onSubmit={submitFilters} className='flex flex-col gap-4 md:flex-row md:items-end'>
                        <div className='flex flex-1 flex-col gap-2'>
                            <label className='text-sm font-medium'>Search</label>
                            <input
                                type="text"
                                placeholder="Search by name, SKU, or description"
                                value={filterForm.data.search}
                                onChange={e => filterForm.setData('search', e.target.value)}
                                className='rounded border p-2'
                            />
                        </div>

                        <div className='flex flex-col gap-2 md:w-56'>
                            <label className='text-sm font-medium'>Category</label>
                            <select
                                value={filterForm.data.category_id}
                                onChange={e => filterForm.setData('category_id', e.target.value)}
                                className='rounded border p-2'
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-2 md:w-56'>
                            <label className='text-sm font-medium'>Stock Status</label>
                            <select
                                value={filterForm.data.stock}
                                onChange={e => filterForm.setData('stock', e.target.value)}
                                className='rounded border p-2'
                            >
                                <option value="">All Stock Levels</option>
                                <option value="available">Available (10+)</option>
                                <option value="low">Low Stock (&lt; 10)</option>
                                <option value="out">Out of Stock</option>
                            </select>
                        </div>

                        <div className='flex gap-3'>
                            <button type="submit" className='rounded bg-blue-600 px-4 py-2 text-white'>
                                Apply
                            </button>
                            <button type="button" onClick={resetFilters} className='rounded border px-4 py-2'>
                                Reset
                            </button>
                        </div>
                    </form>

                    <p className='mt-4 text-sm text-gray-600'>
                        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                    </p>
                </section>

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
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id} className={product.stock_quantity < 10 ? 'bg-red-100' : ''}>
                                    <td className='p-4'>{product.id}</td>
                                    <td className='p-4'>{product.name}</td>
                                    <td className='p-4'>{product.sku}</td>
                                    <td className='p-4'>{product.category.name}</td>
                                    <td className='p-4'>Rs.{product.price}</td>
                                    <td className='p-4'>{product.stock_quantity}</td>
                                    <td className='p-4'>
                                        <div className='flex flex-wrap gap-3'>
                                            <button type="button" className='cursor-pointer hover:underline' onClick={() => handleAddToCart(product)}>
                                                Add to Cart
                                            </button>
                                            <button type="button" className='text-red-500 cursor-pointer hover:underline' onClick={() => handleDelete(product.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className='p-6 text-center text-gray-500'>
                                    No products match the current search and filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className='flex'>
                    <section className='w-1/2 p-4'>
                        <h3 className='text-2xl mb-4'>Add New Category</h3>
                        <form onSubmit={submitCategory} className='flex flex-col gap-4'>
                            <input
                                type="text"
                                placeholder="Category Name"
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
        </>
    );
}