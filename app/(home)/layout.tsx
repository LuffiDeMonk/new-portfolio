import Navbar from '@/components/home/Navbar'
import React from 'react'
import { Poppins } from 'next/font/google'
import Footer from '@/components/home/Footer'

const poppins = Poppins({ weight: ['400'], subsets: ['devanagari'] })

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={poppins.className}>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
