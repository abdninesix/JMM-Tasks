import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='paddingClass space-y-4'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout