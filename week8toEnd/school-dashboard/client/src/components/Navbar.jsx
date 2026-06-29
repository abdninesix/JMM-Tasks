import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {

    const [profileMenu, setProfileMenu] = useState(false);

    const { user, logoutMutation } = useAuth();

    return (
        <nav className="flex w-full py-2 items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-theme uppercase">School&nbsp;<span className='text-sm text-red-500'>Laravel</span></Link>
            <div className="flex gap-4">

                <Link to="/about" className="rounded px-4 py-2 font-semibold ring duration-100 hover:bg-theme hover:text-white active:scale-90">About</Link>

                {user ?
                    <>
                        <button onClick={() => setProfileMenu(prev => !prev)} className="w-10 h-10 cursor-pointer rounded-full bg-theme text-white flex items-center justify-center text-lg font-bold overflow-hidden">
                            {!user?.profile_picture ? user?.full_name?.split(" ").map(word => word.charAt(0).toUpperCase()).join("") : <img src={user?.profile_picture} className='object-cover size-full' />}
                        </button>
                        {profileMenu && (
                            <div className='absolute top-16 right-8 p-2 bg-white rounded-md border border-gray-200 flex flex-col gap-2'>
                                <Link to="/dashboard" className="font-semibold">Dashboard</Link>
                                <Link to="/profile" className="font-semibold">Profile</Link>
                                <button onClick={logoutMutation.mutate} className="text-left cursor-pointer text-red-500 font-semibold">Sign Out</button>
                            </div>
                        )}
                    </>
                    : <Link to="/login" className="rounded bg-theme px-4 py-2 font-semibold text-white duration-100 hover:bg-theme/80 active:scale-90">Sign In</Link>
                }

            </div>
        </nav>
    )
}

export default Navbar