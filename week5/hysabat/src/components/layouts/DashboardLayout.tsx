import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 border p-4">Sidebar</aside>
            <main className="flex-1 border p-4">
                <Outlet />
            </main>
            <aside className='border'>Hi</aside>
        </div>
    )
}

export default DashboardLayout