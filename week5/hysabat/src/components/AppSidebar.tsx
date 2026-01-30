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
import { ChevronDown, PanelLeft, PanelRight } from "lucide-react";
import { sidebarItems } from "@/lib/data";

export function AppSidebar() {

    const { state, toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">

            <SidebarHeader className={`flex ${state === "collapsed" ? "flex-col-reverse" : "flex-row"} py-4`}>
                <SidebarMenuButton asChild>
                    <Link to='/' className='flex'>
                        <img src='/logo.svg' alt='logo' />
                        <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                    </Link>
                </SidebarMenuButton>
                {/* <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight className="size-6"/> : <PanelLeft className="size-6"/>}</Button> */}
            </SidebarHeader>

            <SidebarContent>
                {sidebarItems.map((item) => (
                    <SidebarMenuButton asChild key={item.title}>
                        <Link to={item.url} className='flex'>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            <ChevronDown />
                        </Link>
                    </SidebarMenuButton>
                ))}
            </SidebarContent>

            <SidebarFooter />

        </Sidebar>
    )
}