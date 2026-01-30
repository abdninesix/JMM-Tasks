import { Button } from './ui/button'
import { useTheme } from './providers/ThemeProvider'
import { Moon, Search, Sun } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Kbd } from './ui/kbd';
import { Card } from './ui/card';

const Navbar = () => {

    const { theme, setTheme } = useTheme();

    return (
        <Card>
            <nav className='flex items-center justify-between'>
                <div className='flex'>
                    <SidebarTrigger className='size-10' />

                    <InputGroup>
                        <InputGroupInput type='text' placeholder='Search...' id='search' />
                        <InputGroupAddon>
                            <Search className='size-6 text-gray-400' />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Kbd>Ctrl+K</Kbd>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div className='flex'>
                    <Button variant='ghost' onClick={() => setTheme('dark')}><Moon /></Button>
                    <Button variant='ghost' onClick={() => setTheme('light')}><Sun /></Button>

                </div>
            </nav>
        </Card>
    )
}

export default Navbar