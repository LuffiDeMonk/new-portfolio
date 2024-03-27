import React from 'react'
import Container from './Container'
import { Separator } from '../ui/separator'
import { BadgeAlert, Blocks, Component } from 'lucide-react'

export default function Services() {
    return (
        <Container className='mt-20 mb-36 flex flex-col items-center justify-center gap-2'>
            <Separator orientation='vertical' className='bg-purple-500 w-[1px] h-16' />
            <p className='text-base tracking-wider uppercase text-center'>services provided</p>
            <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center leading-normal'>Build brands campaigns
                <br /> & digital projects</h2>
            <div className="grid gap-8 grid-cols 1 lg:grid-cols-3 mt-16">
                <div className='p-7 min-h-56 border border-gray-200 hover:border-blue-600 flex items-center flex-col gap-7 transition-colors duration-500'>
                    <div className='flex items-center flex-col gap-4'>
                        <BadgeAlert size={80} className='text-blue-700' />
                        <h4 className='text-center text-2xl font-semibold'>Frontend Solutions</h4>
                    </div>
                    <p className='text-center text-sm sm:text-md xl:text-base text-gray-600 leading-relaxed'>Offer tailored frontend development solutions to meet the unique needs of your clients.</p>
                </div>
                <div className='p-7 min-h-56 border border-gray-200 hover:border-blue-600 flex items-center flex-col gap-7 transition-colors duration-500'>
                    <div className='flex items-center flex-col gap-4'>
                        <Component size={80} className='text-blue-700' />
                        <h4 className='text-center text-2xl font-semibold'>User-Centric Design</h4>
                    </div>
                    <p className='text-center text-sm sm:text-md xl:text-base text-gray-600 leading-relaxed'>Offer tailored frontend development solutions to meet the unique needs of your clients.</p>
                </div>
                <div className='p-7 min-h-56 border border-gray-200 hover:border-blue-600 flex items-center flex-col gap-7 transition-colors duration-500'>
                    <div className='flex items-center flex-col gap-4'>
                        <Blocks size={80} className='text-blue-700' />
                        <h4 className='text-center text-2xl font-semibold'>Integration</h4>
                    </div>
                    <p className='text-center text-sm sm:text-md xl:text-base text-gray-600 leading-relaxed'>Offer tailored frontend development solutions to meet the unique needs of your clients.</p>
                </div>
            </div>
        </Container>
    )
}
