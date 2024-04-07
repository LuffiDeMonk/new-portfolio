
import React from 'react'
import Container from './Container'
import { Button } from '../ui/button'
import Image from 'next/image'
import { getProfile } from '@/helpers/data/fetchProfile'
import { MotionDiv } from '../motion'
import { AboutVariants, AboutVariants2 } from '@/constants/animation/marquee'



export default async function About() {
    const profile = await getProfile()
    return (
        <Container className='lg:h-[120vh] relative flex flex-col lg:flex-row items-center justify-center gap-5 mt-12 xl:mt-32 overflow-hidden'>
            <div className="hidden xl:block absolute top-0 right-6 size-80">
                <MotionDiv variants={AboutVariants} initial='initial' whileInView='whileInView' viewport={{ once: true }}>
                    <Image width={500} height={500} alt="dots" src="/dots.png" className='object-cover w-full h-full' />
                </MotionDiv>
            </div>

            <div className="hidden xl:block absolute top-3 left-1/2 -translate-x-1/2 -z-50">
                <MotionDiv
                    variants={AboutVariants}
                    initial='initial'
                    whileInView='whileInView'
                    viewport={{ once: true }}
                >
                    <p className='text-[18rem] font-extrabold text-gray-100'>About</p>
                </MotionDiv>
            </div>

            {/* about section */}
            <MotionDiv
                variants={AboutVariants2}
                initial='initial'
                whileInView='whileInView'
                viewport={{ once: true }}
                className='basis-1/2 flex md:justify-center flex-col gap-6'
            >
                <MotionDiv variants={AboutVariants2}>
                    <h1 className='text-5xl font-bold'>About Me</h1>
                </MotionDiv>
                <MotionDiv variants={AboutVariants2}>
                    <p className='text-sm text-gray-400 leading-loose'>{profile?.[0]?.description}</p>
                </MotionDiv>
                <MotionDiv variants={AboutVariants2}>
                    <Button className='w-fit p-6 rounded-none bg-blue-500 hover:text-blue-500 hover:bg-transparent hover:border hover:border-blue-500 transition-all duration-300'>Download CV</Button>
                </MotionDiv>
            </MotionDiv>
            {/* hero image */}
            <MotionDiv
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className='w-full lg:basis-1/2 h-96 sm:h-[28rem] lg:h-[32rem] bg-gradient-to-r from-blue-500 to-purple-500 relative'>
                <Image src='/portfolio.png' width={300} height={300} alt='about' className='w-full h-full object-cover' />
            </MotionDiv>
        </Container>
    )
}
