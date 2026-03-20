import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className='flex justify-between p-8 bg-gray-800 text-white'>
            <div><strong>Inventory System</strong></div>
            <div className='flex items-center gap-4'>
                {auth.user ? (
                    <>
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