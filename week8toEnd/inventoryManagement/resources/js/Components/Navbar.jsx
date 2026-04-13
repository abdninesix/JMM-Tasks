import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const storedItems = JSON.parse(window.localStorage.getItem('cartItems') || '[]');
            const totalItems = storedItems.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalItems);
        };

        updateCartCount();
        window.addEventListener('storage', updateCartCount);
        window.addEventListener('cart-updated', updateCartCount);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cart-updated', updateCartCount);
        };
    }, []);

    return (
        <nav className='flex justify-between p-8 bg-gray-800 text-white'>
            <div><strong>Inventory System</strong></div>
            <div className='flex items-center gap-4'>
                {auth.user ? (
                    <>
                        <Link href="/cart" className='rounded border border-white/30 px-3 py-1.5'>
                            Cart ({cartCount})
                        </Link>
                        <span>Welcome, {auth.user.name}</span>
                        <Link href="/logout" method="post" as="button">
                            Logout
                        </Link>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}