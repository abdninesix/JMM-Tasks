import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 border-r">Sidebar</aside>
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout