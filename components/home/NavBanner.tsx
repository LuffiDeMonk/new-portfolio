'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavBanner() {
    const pathname = usePathname()
    return (
        <section className='h-[80vh] bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 flex items-center justify-center text-white text-5xl capitalize font-semibold tracking-wider'>{pathname.split('/')[1]}</section>
    )
}
