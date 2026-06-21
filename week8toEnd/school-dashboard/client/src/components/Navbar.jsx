import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleSignout = () => {
        logout();
        toast.success("You are logged out!")
        navigate("/login")
    }

    return (
        <nav className="paddingClass flex w-full items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-theme uppercase">School&nbsp;<span className='text-base text-red-500'>Laravel</span></Link>
            <div className="flex gap-4">
                {user ?
                    <>
                        <Link to="/profile" className="w-10 h-10 rounded-full bg-theme text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                            {!user.profile_picture ? user.full_name?.split(" ").map(word => word.charAt(0).toUpperCase()).join("") : <img src={user.profile_picture} className='object-cover size-full' />}
                        </Link>
                        <button onClick={handleSignout} className="cursor-pointer rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90">Sign Out</button>
                    </>
                    : <Link to="/register" className="rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90">Sign Up</Link>
                }
                <Link to="/about" className="rounded px-4 py-2 font-semibold ring duration-100 hover:bg-theme hover:text-white active:scale-90">About</Link>
            </div>
        </nav>
    )
}

export default Navbar