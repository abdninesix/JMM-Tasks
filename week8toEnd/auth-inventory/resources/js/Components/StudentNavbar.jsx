import { Link } from '@inertiajs/react'
import React from 'react'

const StudentNavbar = () => {
    return (
        <div className='max-w-lg mx-auto py-2 flex justify-between'>
            <span className='text-blue-500 font-bold'>StudentApp</span>
            <div className='space-x-4 font-semibold'>
                <Link href='/students'>Students</Link>
                <Link href='/courses'>Courses</Link>
            </div>

        </div>
    )
}

export default StudentNavbar