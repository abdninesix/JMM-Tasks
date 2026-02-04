import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../AppSidebar'
import Navbar from '../Navbar'
import { Plus, ShoppingCart, Ticket } from 'lucide-react'

const DashboardLayout = () => {
    return (
        <SidebarProvider defaultOpen={true} className='space-x-2'>
            <AppSidebar />
            <main className="flex-1 flex flex-col gap-4 py-2 px-4 lg:px-2">
                <Navbar />
                <Outlet />
            </main>
            <aside className='h-dvh'>
                <div className='sticky right-0 top-2/5 p-2 space-y-2 bg-card shadow-sm border rounded-l-xl'>
                    <Ticket size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1'/>
                    <ShoppingCart size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1'/>
                    <Plus size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1'/>
                </div>
            </aside>
        </SidebarProvider >
    )
}

export default DashboardLayout