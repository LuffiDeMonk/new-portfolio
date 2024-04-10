'use client'

import React from 'react'
import { MotionDiv } from '../motion'
import { AboutVariants2 } from '@/constants/animation/marquee'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function DownloadButton() {
    return (
        <MotionDiv variants={AboutVariants2}>
            <Link href="/Resume.pdf" download='myResume'>
                <Button className='w-fit p-6 rounded-none bg-blue-500 hover:text-blue-500 hover:bg-transparent hover:border hover:border-blue-500 transition-all duration-300'>Download CV</Button>
            </Link>
        </MotionDiv>
    )
}
