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
import { ChevronDown, PanelLeft, PanelRight, Search } from "lucide-react";
import { sidebarItems } from "@/lib/data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Kbd } from "./ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Logo from "./Logo";
import { Button } from "./ui/button";

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
                <SidebarMenuButton className="py-5 hover:bg-transparent">
                      <Logo/>
                </SidebarMenuButton>
                <Button variant="ghost" className="text-gray-500" onClick={toggleSidebar}>{state === "collapsed" ? <PanelRight className="size-6" /> : <PanelLeft className="size-6" />}</Button>
                <SidebarMenuButton className="py-5 border">
                    <Search className="size-6" />
                    <span className="text-muted-foreground">Quick actions</span>
                    <Kbd className="ml-auto">Ctrl+Q</Kbd>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent className={`px-4 scrollbar-none ${state === "collapsed" ? "flex items-center" : ""}`}>
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.url || item.children?.some((c) => pathname.startsWith(c.url))
                    return (
                        <Collapsible defaultOpen={isActive} className="group/collapsible" key={item.title} >
                            {state === "collapsed" ? (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton isActive={isActive} onClick={() => handleClick(item.url)} className="py-5 data-[active=true]:bg-theme1 data-[active=true]:text-white">
                                                <item.icon />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{item.title}</TooltipContent>
                                </Tooltip>
                            ) : (
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton isActive={isActive} onClick={() => handleClick(item.url)} className="py-5 data-[active=true]:bg-theme1 data-[active=true]:text-white">
                                        <item.icon />
                                        <span className="text-base font-semibold">{item.title}</span>
                                        {item.children && (
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        )}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            )}


                            {item.children && (
                                <CollapsibleContent>
                                    <SidebarMenuSub className="gap-0 m-0">
                                        {item.children.map((child, i) => {
                                            const isActive = pathname === child.url
                                            return (
                                                <SidebarMenuSubItem key={child.title}>
                                                    <SidebarMenuButton isActive={isActive} onClick={() => handleClick(child.url)} className="data-[active=true]:bg-transparent data-[active=true]:text-theme1">
                                                        <span>{child.title}</span>
                                                    </SidebarMenuButton>
                                                    {i === 1 && <SidebarMenuBadge className="border bg-accent">25</SidebarMenuBadge>}
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