import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
            <div><strong>Inventory System</strong></div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {auth.user ? (
                    <>
                        <span>Welcome, {auth.user.name}</span>
                        <Link href="/logout" method="post" as="button" style={{ cursor: 'pointer' }}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <Link href="/login" style={{ color: '#fff' }}>Login</Link>
                )}
            </div>
        </nav>
    );
}