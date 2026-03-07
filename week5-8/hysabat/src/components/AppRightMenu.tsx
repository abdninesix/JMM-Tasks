import { Plus, ShoppingCart, Ticket } from "lucide-react"

const AppRightMenu = () => {
    return (
        <aside className='hidden lg:block h-dvh lg:pl-12'>
            <div className='fixed right-0 top-2/5 p-2 space-y-2 bg-card shadow-sm border rounded-l-xl'>
                <Ticket size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1' />
                <ShoppingCart size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1' />
                <Plus size={28} className='cursor-pointer p-1 rounded-full text-white bg-theme1' />
            </div>
        </aside>
    )
}

export default AppRightMenu