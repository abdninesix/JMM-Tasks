import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../AppSidebar'
import Navbar from '../Navbar'

const DashboardLayout = () => {
    return (
        <SidebarProvider defaultOpen={true} className='space-x-2'>
            <AppSidebar />
            <main className="flex-1 p-2">
                <Navbar />
                <Outlet />
            </main>
            <aside className='hidden lg:block border'>Hi</aside>
        </SidebarProvider >
    )
}

export default DashboardLayout