import React from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: ['400'], subsets: ['devanagari'] })

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={poppins.className}>
            {children}
        </div>
    )
}
