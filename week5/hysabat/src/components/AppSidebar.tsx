import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ChevronDown, Search } from "lucide-react";
import { sidebarItems } from "@/lib/data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Kbd } from "./ui/kbd";

export function AppSidebar() {

    const { state, toggleSidebar } = useSidebar();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = (url: string) => {
        if (state === "collapsed") {
            toggleSidebar();
        }
        navigate(url);
    }

    return (
        <Sidebar collapsible="icon" variant="floating">

            <SidebarHeader className="flex items-center p-4">
                <SidebarMenuButton asChild className='py-5'>
                    <Link to='/'>
                        <img src='/logo.svg' alt='logo' />
                        <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                    </Link>
                </SidebarMenuButton>
                {/* <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight className="size-6"/> : <PanelLeft className="size-6"/>}</Button> */}

                <SidebarMenuButton className="py-5 border">
                    <Search className="size-6" />
                    <span className="text-muted-foreground">Quick actions</span>
                    <Kbd className="ml-auto">Ctrl+Q</Kbd>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent className={`px-4 ${state === "collapsed" ? "flex items-center" : ""}`}>
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.url || item.children?.some((c) => pathname.startsWith(c.url))
                    return (
                        < Collapsible defaultOpen={isActive} className="group/collapsible" key={item.title} >
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton isActive={isActive} className="py-5 data-[active=true]:bg-theme1 data-[active=true]:text-white" onClick={() => handleClick(item.url)}>
                                    <item.icon />
                                    <span className="text-base font-semibold">{item.title}</span>
                                    {item.children && <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />}
                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            {item.children && (
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.children.map((child) => {
                                            const isActive = pathname === child.url
                                            return (
                                                <SidebarMenuSubItem key={child.title} onClick={() => handleClick(child.url)}>
                                                    <SidebarMenuButton asChild isActive={isActive} className="data-[active=true]:bg- data-[active=true]:text-theme1">
                                                        <span>{child.title}</span>
                                                    </SidebarMenuButton>
                                                    <SidebarMenuBadge className="border bg-accent">25</SidebarMenuBadge>
                                                </SidebarMenuSubItem>
                                            )
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            )}
                        </Collapsible>
                    )
                })}
            </SidebarContent>

        </Sidebar >
    )
}