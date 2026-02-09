import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Lock, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'

const schema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof schema>

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate();

    const onSubmit = (data: LoginFormData) => {
        console.log(data)
        navigate('/')
    }

    return (
        <div className='h-dvh flex p-4'>
            {/* Left section */}
            <section className='h-full w-full lg:w-1/2 flex flex-col p-4 justify-between'>

                <Logo />

                <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center'>
                    <div className='w-full md:max-w-md flex flex-col gap-4'>

                        <div className='space-y-2'>
                            <h1 className='text-3xl font-bold'>Log In</h1>
                            <p>Login to get back to your Hysabat account.</p>
                        </div>

                        <div>
                            <Label htmlFor='username' className='font-semibold mb-2'>Username<span className='text-red-500'>*</span></Label>
                            <InputGroup>
                                <InputGroupInput type='text' placeholder='Enter username' {...register('username')} />
                                <InputGroupAddon>
                                    <User className='size-6 text-gray-400' />
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.username && <p className='text-red-500 text-sm mt-2'>{errors.username.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor='password' className='font-semibold mb-2'>Password<span className='text-red-500'>*</span></Label>
                            <InputGroup>
                                <InputGroupInput type='password' placeholder='Create a password'  {...register('password')} />
                                <InputGroupAddon>
                                    <Lock className='size-6 text-gray-400' />
                                </InputGroupAddon>
                            </InputGroup>
                            {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password.message}</p>}
                        </div>

                        <Button type='submit' className='text-white bg-theme1 hover:bg-theme1/90 py-2'>Login</Button>

                        <p className='text-center text-sm'>
                            Don't have an account? <a href='#' className='text-theme1 hover:underline'>Sign up</a>
                        </p>
                    </div>
                </form>

                <footer className='flex items-center justify-between text-sm font-semibold'>
                    <p>&copy; Hysabat Solutions {new Date().getFullYear()}</p>
                    <a href='mailto:sales@hysabat.com' className='flex items-center gap-2'><Mail className='size-4 text-gray-400' /> sales@hysabat.com</a>
                </footer>
            </section>

            {/* Right section */}
            <section className='w-full lg:w-1/2 hidden lg:flex flex-col items-center p-20 justify-center bg-linear-to-r from-theme1 to-theme2 rounded-2xl'>
                <div>
                    <img src='/content.png' alt='content' />
                </div>
                <div className='space-y-4 text-center text-white'>
                    <h2 className='text-3xl font-bold'>Transforming the Future of Resource Planning</h2>
                    <p className='text-xl'>Empowering businesses with smarter resource management and real-time insights. HYSABAT ERP helps you optimize every resource, minimize waste, and drive operational efficiency. Gain full visibility into projects, anticipate resource needs, and respond swiftly to market changes.</p>
                </div>
            </section>
        </div>
    )
}

export default Login

