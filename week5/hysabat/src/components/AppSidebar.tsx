import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ChevronDown, PanelLeft, PanelRight, Search } from "lucide-react";
import { sidebarItems } from "@/lib/data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Kbd } from "./ui/kbd";

export function AppSidebar() {

    const { state, toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">

            <SidebarHeader className="flex-col items-center gap-4 p-4">
                <SidebarMenuButton asChild>
                    <Link to='/' className='py-5'>
                        <img src='/logo.svg' alt='logo' />
                        <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                    </Link>
                </SidebarMenuButton>
                {/* <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight className="size-6"/> : <PanelLeft className="size-6"/>}</Button> */}

                <SidebarMenuButton className="py-5 border">
                    <Search className="size-6" />
                    <span className="text-gray-500">Quick actions</span>
                    <Kbd className="ml-auto">Ctrl+Q</Kbd>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent className={`px-4 ${state === "collapsed" ? "flex items-center" : ""}`}>
                {sidebarItems.map((item) => (
                    <Collapsible defaultOpen={false} className="group/collapsible" key={item.title}>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="py-5">
                                <item.icon />
                                <span className="text-lg font-semibold">{item.title}</span>
                                {item.children && <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {item.children && (
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.children.map((child) => (
                                        <SidebarMenuSubItem key={child.title}>
                                            <SidebarMenuButton asChild>
                                                <Link to={child.url}>{child.title}</Link>
                                            </SidebarMenuButton>
                                            <SidebarMenuBadge>25</SidebarMenuBadge>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        )}
                    </Collapsible>
                ))}
            </SidebarContent>

        </Sidebar>
    )
}