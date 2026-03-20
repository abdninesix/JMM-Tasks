import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({ email: '', password: '', });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Admin Login</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
                </div>
                <button type="submit" disabled={processing} style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }}>
                    Login
                </button>
            </form>
        </div>
    );
}