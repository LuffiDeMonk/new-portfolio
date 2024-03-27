
import React from 'react'
import Container from './Container'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function About() {
    return (
        <Container className='lg:h-[120vh] relative flex flex-col lg:flex-row items-center justify-center gap-5 mt-12 xl:mt-32'>
            <div className="hidden xl:block absolute top-0 right-6 size-80">
                <Image width={500} height={500} alt="dots" src="/dots.png" className='object-cover w-full h-full' />
            </div>

            <div
                className="hidden xl:block absolute top-3 left-1/2 -translate-x-1/2  text-[18rem] font-extrabold -z-50 text-gray-100">About</div>

            {/* about section */}
            <div className='basis-1/2 flex md:justify-center flex-col gap-6'>
                <h1 className='text-5xl font-bold'>About Me</h1>
                <p className='text-sm text-gray-400 leading-loose'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa corporis nihil vel nemo eligendi quidem, non ad magni, assumenda totam quos hic nisi dolorum perferendis qui officiis velit beatae sapiente.</p>
                <Button className='w-fit p-6 rounded-none bg-blue-500 hover:text-blue-500 hover:bg-transparent hover:border hover:border-blue-500 transition-all duration-300'>Download CV</Button>
            </div>
            {/* hero image */}
            <div className='w-full lg:basis-1/2 h-96 sm:h-[28rem] lg:h-[32rem] relative'>
                <Image src='/about.png.webp' width={300} height={300} alt='about' className='w-full h-full object-cover' />
            </div>
        </Container>
    )
}
