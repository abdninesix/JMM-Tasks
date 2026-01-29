import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

const schema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

interface LoginError {
    username?: string;
    password?: string;
}

const Login = () => {

    const navigate = useNavigate();

    const [error, setError] = useState<LoginError>({});

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const result = schema.safeParse({
            username: (e.target as HTMLFormElement).username.value,
            password: (e.target as HTMLFormElement).password.value,
        });
        if (!result.success) {
            setError(result.error.issues.reduce((acc, curr) => ({ ...acc, [curr.path[0]]: curr.message, }), {}));
            return;
        }
        setError({});
        navigate('/');
    };

    return (
        <div className='h-screen flex p-4 overflow-hidden'>
            {/* Left section */}
            <section className='h-full w-full lg:w-1/2 flex flex-col p-4 justify-between'>

                <a href='/' className='flex w-30 lg:w-fit'>
                    <img src='/src/assets/logo.svg' alt='logo' />
                    <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-sky-400 to-sky-900'>Hysabat</span>
                </a>

                <form onSubmit={handleSubmit} className='flex items-center justify-center'>
                    <div className='w-full md:max-w-md flex flex-col gap-4 text-gray-600'>

                        <div className='space-y-2'>
                            <h1 className='text-3xl font-bold text-black'>Log In</h1>
                            <p>Login to get back to your Hysabat account.</p>
                        </div>

                        <div>
                            <label htmlFor='username' className='text-sm font-bold'>Username<span className='text-red-600 ml-1'>*</span></label>
                            <div className='flex items-center gap-2 p-2 border-2 border-gray-300 focus-within:border-sky-500 rounded-md'>
                                <User className='text-gray-400' />
                                <Input type='text' placeholder='Enter username' id='username' />
                            </div>
                            {error.username && <p className='text-red-600 text-sm'>{error.username}</p>}
                        </div>

                        <div>
                            <label htmlFor='password' className='text-sm font-bold'>Password<span className='text-red-600 ml-1'>*</span></label>
                            <div className='flex items-center gap-2 p-2 border-2 border-gray-300 focus-within:border-sky-500 rounded-md'>
                                <Lock className='text-gray-400' />
                                <Input type='password' placeholder='Create a password' id='password' />
                            </div>
                            {error.password && <p className='text-red-600 text-sm'>{error.password}</p>}
                        </div>

                        <Button type='submit' className='bg-theme1 hover:bg-theme1/90 py-2'>Login</Button>

                        <p className='text-center text-sm'>
                            Don't have an account? <a href='/#' className='text-theme1'>Sign up</a>
                        </p>
                    </div>
                </form>

                <footer className='flex flex-col-reverse md:flex-row items-center justify-between gap-2 text-sm text-gray-600 font-semibold'>
                    <p>&copy; Hysabat Solutions {new Date().getFullYear()}</p>
                    <a href='mailto:sales@hysabat.com' className='flex items-center gap-2'><Mail size={16} className='text-gray-400' /> sales@hysabat.com</a>
                </footer>
            </section>

            {/* Right section */}
            <section className='w-full lg:w-1/2 hidden lg:flex flex-col items-center p-20 justify-center bg-linear-to-r from-theme1 to-theme2 rounded-2xl'>
                <div>
                    <img src='/src/assets/content.png' alt='content' />
                </div>
                <div className='space-y-4 text-center text-white'>
                    <h2 className='text-3xl'>Transforming the Future of Resource Planning</h2>
                    <p className='text-xl'>Empowering businesses with smarter resource management and real-time insights. HYSABAT ERP helps you optimize every resource, minimize waste, and drive operational efficiency. Gain full visibility into projects, anticipate resource needs, and respond swiftly to market changes.</p>
                </div>
            </section>
        </div>
    )
}

export default Login

