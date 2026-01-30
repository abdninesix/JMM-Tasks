import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { PanelLeft, PanelRight } from "lucide-react";

export function AppSidebar() {

    const { state, toggleSidebar } = useSidebar();

    return (
            <Sidebar collapsible="icon" variant="inset" className="border rounded-r-2xl">

                <SidebarHeader className={`flex ${state === "collapsed" ? "flex-col-reverse" : "flex-row"}`}>
                    <SidebarMenuButton asChild>
                        <Link to='/' className='flex'>
                            <img src='/logo.svg' alt='logo' className="shrink-0" />
                            <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                        </Link>
                    </SidebarMenuButton>
                    <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight /> : <PanelLeft />}</Button>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>

                <SidebarFooter />

            </Sidebar>
    )
}