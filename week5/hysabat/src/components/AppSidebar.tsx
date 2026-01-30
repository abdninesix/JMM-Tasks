import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function AppSidebar() {
    return (
        <Sidebar>

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to='/' className='flex'>
                                <img src='/logo.svg' alt='logo' />
                                <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter />

        </Sidebar>
    )
}