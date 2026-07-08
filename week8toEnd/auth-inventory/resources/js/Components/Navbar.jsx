import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className='flex items-center justify-between px-8 py-4 bg-gray-800 text-white'>
            <div><strong>Inventory System</strong></div>
            <div className='flex items-center gap-4'>
                {auth.user ? (
                    <>
                        <Link href="/dashboard" className='rounded border border-white/30 px-3 py-1.5'>
                            Dashboard
                        </Link>
                        <Link href="/products" className='rounded border border-white/30 px-3 py-1.5'>
                            Products
                        </Link>
                        <Link href="/categories" className='rounded border border-white/30 px-3 py-1.5'>
                            Categories
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