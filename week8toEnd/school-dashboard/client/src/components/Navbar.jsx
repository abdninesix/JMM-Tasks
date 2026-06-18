import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleSignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("You are logged out!")
        navigate("/login")
    }

    return (
        <nav className="p-4 flex w-full items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-theme uppercase">School&nbsp;<span className='text-base text-red-500'>Laravel</span></Link>
            <div className="flex gap-4">
                {user
                    ? <button onClick={handleSignout} className="cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90">Sign Out</button>
                    : <Link to="/register" className="rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90">Sign Up</Link>
                }
                <Link to="/about" className="rounded px-4 py-2 font-semibold ring duration-100 hover:bg-theme hover:text-white active:scale-90">About</Link>
            </div>
        </nav>
    )
}

export default Navbar