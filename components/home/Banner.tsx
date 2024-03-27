import React from 'react'
import Container from './Container'

export default function Banner() {
    return (
        <section className='h-[80vh] md:h-screen xl:h-[120vh] bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 text-white relative'>
            <Container className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32'>
                <h1 className='text-xl sm:text-3xl md:text-5xl xl:text-6xl font-semibold text-center'>Hello This Is Prabhat</h1>
                <div className='flex items-center justify-center gap-5 xl:gap-7 mt-5'>
                    <span className='text-sm md:text-lg xl:text-xl font-semibold text-center tracking-[-0.5em]'>—————</span>
                    <p className='text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-wider'>FrontEnd Developer</p>
                </div>
            </Container>
        </section>
    )
}
