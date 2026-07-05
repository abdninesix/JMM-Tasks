import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({ email: '', password: '', });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className='bg-blue-50 p-8 max-w-2xl mx-auto shadow-lg mt-20'>
            <h2 className='text-2xl text-center'>Admin Login</h2>
            <form onSubmit={submit} className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className='p-2 bg-white' />
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className='p-2 bg-white' />
                </div>
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                <button className='bg-green-600 text-white p-2'>
                    Login
                </button>
            </form>
        </div>
    );
}