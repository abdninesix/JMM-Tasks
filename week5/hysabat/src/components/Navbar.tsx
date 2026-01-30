import { Button } from './ui/button'
import { useTheme } from './providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {

    const { theme, setTheme } = useTheme();
    
    return (
        <div>
            <Button variant='ghost' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Moon /> : <Sun />}</Button>
        </div>
    )
}

export default Navbar