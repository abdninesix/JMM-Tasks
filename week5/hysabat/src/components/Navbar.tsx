import { Button } from './ui/button'
import { useTheme } from './providers/ThemeProvider'
import { Bell, CircleQuestionMark, LogOut, Moon, Search, Sun } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd } from './ui/kbd';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Navbar = () => {

    const { theme, setTheme } = useTheme();

    return (
        <Card className='p-0'>
            <nav className='flex items-center justify-between p-4'>
                <div className='flex gap-2'>
                    <SidebarTrigger className='size-10' />

                    <InputGroup>
                        <InputGroupInput type='text' placeholder='Search anything...' id='search' />
                        <InputGroupAddon>
                            <Search className='size-6 text-gray-400' />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Kbd>Ctrl+K</Kbd>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div className='flex'>
                    <Button variant='ghost' onClick={() => setTheme('dark')} className={theme === "dark" ? "text-theme1" : ""}><Moon /></Button>
                    <Button variant='ghost' onClick={() => setTheme('light')} className={theme === "light" ? "text-theme1" : ""}><Sun /></Button>
                    <Select>
                        <SelectTrigger>
                            <SelectValue defaultValue="ENG" />
                        </SelectTrigger>
                        <SelectContent position='popper'>
                            <SelectItem value="EN">ENG</SelectItem>
                            <SelectItem value="AR">ARB</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant='ghost' ><CircleQuestionMark /></Button>
                    <Button variant='ghost' ><Bell /></Button>
                    <Button variant='outline' >Logout<LogOut /></Button>
                </div>
            </nav>
        </Card>
    )
}

export default Navbar