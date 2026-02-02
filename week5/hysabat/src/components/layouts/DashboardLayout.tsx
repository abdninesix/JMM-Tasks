import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../AppSidebar'
import Navbar from '../Navbar'

const DashboardLayout = () => {
    return (
        <SidebarProvider defaultOpen={true} className='space-x-2'>
            <AppSidebar />
            <main className="flex-1 flex flex-col gap-4 py-2 px-4 lg:px-2">
                <Navbar />
                {/* <Outlet /> */}
            </main>
        </SidebarProvider >
    )
}

export default DashboardLayout