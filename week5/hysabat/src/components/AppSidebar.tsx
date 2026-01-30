import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ChevronDown, PanelLeft, PanelRight } from "lucide-react";
import { sidebarItems } from "@/lib/data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export function AppSidebar() {

    const { state, toggleSidebar } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">

            <SidebarHeader className={`flex items-center ${state === "collapsed" ? "flex-col-reverse" : "flex-row"} p-4`}>
                <SidebarMenuButton asChild>
                    <Link to='/' className='py-6'>
                        <img src='/logo.svg' alt='logo' />
                        <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
                    </Link>
                </SidebarMenuButton>
                {/* <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight className="size-6"/> : <PanelLeft className="size-6"/>}</Button> */}
            </SidebarHeader>

            <SidebarContent className={`flex items-center px-4 ${state === "collapsed" ? "" : "gap-0"}`}>
                {sidebarItems.map((item) => (
                    <SidebarMenuButton asChild key={item.title} className="py-6">
                        <Link to={item.url}>
                            <div ><item.icon /></div>
                            <span className="text-lg font-semibold">{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </Link>
                    </SidebarMenuButton>
                ))}

                {/* {sidebarItems.map((item) => (
                    <Collapsible defaultOpen className="group/collapsible" key={item.title}>
                        <SidebarGroup>
                            <SidebarGroupLabel asChild className="text-lg font-semibold">
                                <CollapsibleTrigger>
                                    <item.icon />
                                    {item.title}
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent />
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))} */}

            </SidebarContent>

            <SidebarFooter />

        </Sidebar>
    )
}