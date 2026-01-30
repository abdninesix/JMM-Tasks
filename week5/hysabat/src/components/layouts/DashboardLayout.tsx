import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from '../AppSidebar'

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 border p-4">
                <SidebarTrigger />
                <Outlet />Main
            </main>
            <aside className='border'>Hi</aside>
        </SidebarProvider >
    )
}

export default DashboardLayout