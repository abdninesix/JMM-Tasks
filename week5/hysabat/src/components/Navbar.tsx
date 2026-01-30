import { Button } from './ui/button'
import { useTheme } from './providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

const Navbar = () => {

    const { theme, setTheme } = useTheme();

    return (
        <div>
            <SidebarTrigger />
            <Button variant='ghost' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Moon /> : <Sun />}</Button>
        </div>
    )
}

export default Navbar