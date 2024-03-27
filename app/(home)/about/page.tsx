import NavBanner from '@/components/home/NavBanner'
import Description from '@/components/home/About'
import React from 'react'
import Services from '@/components/home/Services'
import Counter from '@/components/home/Counter'

export default function About() {
    return (
        <>
            <NavBanner />
            <Services />
            <Description />
            <Counter />
        </>
    )
}

