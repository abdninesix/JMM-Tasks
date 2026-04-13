import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(window.localStorage.getItem('cartItems') || '[]');
        setCartItems(storedItems);
    }, []);

    const syncCart = (updatedItems) => {
        setCartItems(updatedItems);
        window.localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cart-updated'));
    };

    const updateQuantity = (id, nextQuantity) => {
        if (nextQuantity <= 0) {
            syncCart(cartItems.filter(item => item.id !== id));
            return;
        }

        syncCart(cartItems.map(item => item.id === id ? { ...item, quantity: nextQuantity } : item));
    };

    const removeItem = (id) => {
        syncCart(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        syncCart([]);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <Head title='Cart' />
            <Navbar />

            <div className='mx-auto max-w-6xl p-8'>
                <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-3xl font-semibold'>Shopping Cart</h1>
                        <p className='mt-2 text-sm text-gray-600'>Frontend-only cart stored in your browser.</p>
                    </div>

                    <div className='flex gap-3'>
                        <Link href="/dashboard" className='rounded border px-4 py-2'>
                            Continue Shopping
                        </Link>
                        <button type="button" onClick={clearCart} disabled={cartItems.length === 0} className='rounded bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-red-300'>
                            Clear Cart
                        </button>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <section className='rounded border border-dashed p-12 text-center'>
                        <h2 className='text-xl font-medium'>Your cart is empty</h2>
                        <p className='mt-2 text-gray-600'>Add products from the dashboard to see them here.</p>
                        <Link href="/dashboard" className='mt-6 inline-flex rounded bg-slate-900 px-4 py-2 text-white'>
                            Browse Products
                        </Link>
                    </section>
                ) : (
                    <div className='grid gap-8 lg:grid-cols-[2fr_1fr]'>
                        <section className='overflow-hidden rounded border'>
                            <table className='w-full text-left'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='p-4'>Product</th>
                                        <th className='p-4'>Category</th>
                                        <th className='p-4'>Price</th>
                                        <th className='p-4'>Quantity</th>
                                        <th className='p-4'>Total</th>
                                        <th className='p-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id} className='border-t'>
                                            <td className='p-4'>
                                                <div className='font-medium'>{item.name}</div>
                                                <div className='text-sm text-gray-500'>SKU: {item.sku}</div>
                                            </td>
                                            <td className='p-4'>{item.category}</td>
                                            <td className='p-4'>Rs.{item.price}</td>
                                            <td className='p-4'>
                                                <div className='flex w-fit items-center rounded border'>
                                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className='px-3 py-1'>-</button>
                                                    <span className='min-w-12 px-3 py-1 text-center'>{item.quantity}</span>
                                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className='px-3 py-1'>+</button>
                                                </div>
                                            </td>
                                            <td className='p-4'>Rs.{(item.price * item.quantity).toFixed(2)}</td>
                                            <td className='p-4'>
                                                <button type="button" onClick={() => removeItem(item.id)} className='text-red-500 hover:underline'>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <aside className='h-fit rounded border bg-gray-50 p-6'>
                            <h2 className='text-xl font-semibold'>Summary</h2>
                            <div className='mt-6 flex items-center justify-between'>
                                <span>Items</span>
                                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                            </div>
                            <div className='mt-3 flex items-center justify-between'>
                                <span>Subtotal</span>
                                <span>Rs.{subtotal.toFixed(2)}</span>
                            </div>
                            <div className='mt-6 border-t pt-4'>
                                <button type="button" className='w-full rounded bg-emerald-600 px-4 py-3 text-white'>
                                    Checkout Soon
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </>
    );
}