'use client'

import Link from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const pathname = usePathname()
    const params = useSearchParams()
    console.log(pathname)
    return (
        <div className='hidden h-screen w-64 bg-gray-300 lg:flex flex-col items-center justify-center gap-4'>
            <Link href='/#section-1'>Section 1</Link>
            <Link href='#section-2'>Section 2</Link>
            <Link href='#section-3'>Section 3</Link>
            <Link href='#section-4'>Section 4</Link>
        </div>
    )
}
