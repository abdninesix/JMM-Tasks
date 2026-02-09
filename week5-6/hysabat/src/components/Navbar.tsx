import { Button } from './ui/button'
import { useTheme } from './providers/ThemeProvider'
import { Bell, CircleQuestionMark, LogOut, Moon, Search, Sun, MoreVertical } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd } from './ui/kbd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const { theme, setTheme } = useTheme();

    return (
        <nav className='bg-card text-muted-foreground border rounded-md shadow-sm flex items-center justify-between px-2 py-4 sm:px-4 lg:py-0'>
            <div className='flex items-center gap-2'>
                <SidebarTrigger className='pointer-events-auto' />

                <InputGroup>
                    <InputGroupInput type='text' placeholder='Search anything...' id='search' />
                    <InputGroupAddon>
                        <Search className='size-5' />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Kbd>Ctrl+K</Kbd>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className='hidden lg:flex items-center gap-2'>
                <Button variant='ghost' onClick={() => setTheme('dark')} className={theme === "dark" ? "text-theme1" : ""}><Moon className='size-5' /></Button>
                <Separator orientation="vertical" className="h-18!" />
                <Button variant='ghost' onClick={() => setTheme('light')} className={theme === "light" ? "text-theme1" : ""}><Sun className='size-5' /></Button>
                <Select defaultValue="EN">
                    <SelectTrigger className='border-0 text-base'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position='popper'>
                        <SelectItem value="EN">Eng</SelectItem>
                        <SelectItem value="AR">Arb</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant='ghost'><CircleQuestionMark className='size-5' /></Button>
                <Button variant='ghost'><Bell className='size-5' /></Button>
                <Button variant='outline' onClick={() => navigate('/login')} className='ml-2'>Logout<LogOut className='size-5' /></Button>
            </div>

            {/* Mobile Menu */}
            <div className='flex lg:hidden items-center gap-1'>
                <Button variant='ghost' size="icon"><Bell className='size-5' /></Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size="icon"> <MoreVertical className='size-5' /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
                            <span>Toggle Theme</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CircleQuestionMark className="size-4" />
                            <span>Help Center</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/login')} className="text-destructive">
                            <LogOut className="size-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav >
    )
}

export default Navbar