
const Logo = () => {
    return (
        <div className='w-full flex gap-2 items-center'>
            <img src='/logo.svg' alt='logo' />
            <span className='bg-clip-text text-transparent uppercase text-2xl font-bold bg-linear-to-r from-theme1 to-theme2'>Hysabat</span>
        </div>
    )
}

export default Logo