import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="p-4 flex w-full items-center justify-between">
            <span className="cursor-pointer text-2xl font-bold text-purple-500 uppercase">Auth</span>
            <div className="flex gap-4">
                <Link to="/register" className="rounded bg-purple-500 px-4 py-2 font-semibold text-white duration-100 hover:bg-purple-500/80 active:scale-90">Sign up</Link>
                <Link className="rounded px-4 py-2 font-semibold ring duration-100 hover:bg-purple-500 hover:text-white active:scale-90">Help</Link>
            </div>
        </nav>
    )
}

export default Navbar