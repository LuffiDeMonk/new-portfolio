import React from 'react'
import { Poppins } from 'next/font/google'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: 'Prabhat | %s',
        default: 'Prabhat'
    }
}

const poppins = Poppins({ weight: ['400'], subsets: ['devanagari'] })

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={poppins.className}>
            {children}
        </div>
    )
}
