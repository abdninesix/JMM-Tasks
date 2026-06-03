import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <form className="mx-auto w-96 space-y-4 rounded bg-purple-500/5 px-4 py-8 shadow-lg">
            <h1 className="text-center text-3xl font-semibold text-gray-500">Login</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="username" className="font-semibold text-purple-500">Username</label>
                <input placeholder="Enter username" type="text" id="username" className="rounded bg-white p-2 outline-purple-500" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="password" className="font-semibold text-purple-500">Password</label>
                <input placeholder="Enter password" type="password" id="password" className="rounded bg-white p-2 outline-purple-500" />
            </div>
            <p className="mt-6 text-sm">Don't have an account? <Link to="/register" className="text-purple-500 hover:underline">Sign up</Link></p>
            <button type="button" className="cursor-pointer rounded bg-purple-500 px-4 py-2 font-semibold text-white duration-100 hover:bg-purple-500/80 active:scale-90">Sign in</button>
        </form>
    )
}

export default Login