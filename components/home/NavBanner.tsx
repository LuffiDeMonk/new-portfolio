'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { MotionP, MotionSection } from '../motion'
import { variants } from '@/constants/animation/marquee'

export default function NavBanner() {
    const pathname = usePathname()
    return (
        <section
            className='h-[80vh] bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 flex items-center justify-center'>
            <MotionP
                variants={variants}
                initial='initial'
                whileInView='whileInView'
                viewport={{ once: true }}
                className='text-white text-5xl capitalize font-semibold tracking-wider'>
                {pathname.split('/')[1]}
            </MotionP>
        </section>
    )
}
