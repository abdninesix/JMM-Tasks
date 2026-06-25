import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

const SidebarLayout = () => {
    return (
        <div className='paddingClass space-y-4'>
            <Navbar />
            <div className='flex flex-1 gap-4'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default SidebarLayout