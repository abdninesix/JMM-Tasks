import React from 'react'

const Banner = ({ text }) => {
    return (
        <div className='relative h-36 md:h-80 -mx-8 md:-mx-16 lg:-mx-32 xl:-mx-48'>
            <img src="/waves.svg" alt="banner" className='size-full bg-myblue rotate-180' />
            <h1 className="absolute text-myblue bottom-4 md:bottom-10 left-8 md:left-16 lg:left-32 xl:left-48 w-full text-5xl font-bold">{text}</h1>
        </div>
    )
}

export default Banner