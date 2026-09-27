'use client'

import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Facebook, Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from './Container'
import Link from 'next/link'
import { Links } from '@/constants/HomeNavlink'
import MobileNavigation from './MobileNavigation'
import { MotionNav } from '../motion'

type NavbarProps = {
    email: string,
    github: string,
    linkedin: string
}

export default function Navbar({ email, github, linkedin }: NavbarProps) {
    const pathname = usePathname()
    const [hidden, setHidden] = useState(false)
    const [bg, setBg] = useState(false)

    const navbarVariants = {
        hidden: {
            y: '-100%'
        },
        animate: {
            y: 0,

        }

    }

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        let previous = scrollY.getPrevious()
        if (latest > previous! && latest > 60) {
            setHidden(true)
        }
        else {
            setHidden(false)
        }
        if (latest < 20) {
            setBg(false)
        } else {
            setBg(true)
        }
    })


    return (
        <MotionNav
            variants={navbarVariants}
            animate={hidden ? "hidden" : "animate"}
            transition={{
                duration: 0.1
            }}
            className={cn("fixed top-0 left-0 z-40 w-full", `${!bg ? 'bg-transparent' : 'bg-white shadow-lg'}`)}>
            <Container className="max-w-6xl mx-auto flex items-center justify-between gap-4 h-20">
                <Link href='/' className="focus-visible:outline-none focus-visible:ring-tranparent text-xl font-bold w-fit lg:w-1/3 shrink-0 relative h-full">
                    <Image src="/logo.png" alt='banner' width={500} height={300} className='w-32 h-20 object-cover' />
                </Link>
                <div className="hidden lg:flex items-center justify-center gap-8 w-1/3 shrink-0">
                    {
                        Links.map(item => (
                            <React.Fragment key={item.id}>
                                <Link className={cn("focus-visible:outline-none focus-visible:ring-transparent relative", `${item.link === pathname ? "before:absolute before:content-[''] before:w-full before:h-0.5 before:rounded-l-full before:rounded-r-full before:bg-red-500 before:-bottom-1 before:left-1/2 before:-translate-x-1/2" : "hover:after:absolute hover:after:content-[''] after:w-full after:transition after:duration-500 after:origin-right after:scale-x-0 hover:after:scale-x-100  hover:after:h-0.5 hover:after:rounded-l-full hover:after:rounded-r-full hover:after:bg-red-500 hover:after:-bottom-1 after:left-1/2 hover:after:-translate-x-1/2"}`)} href={item.link}>{item.name}</Link>
                            </React.Fragment>
                        ))
                    }
                </div>
                <div className="hidden lg:flex items-center justify-end gap-4 w-1/3 shrink-0">
                    <Link href={`mailto:${email}`} target='_blank' className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Mail size={18} />
                    </Link>
                    <Link href={github} target='_blank' className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Github size={18} />
                    </Link>
                    <Link href={`https://${linkedin}`} target='_blank' className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Linkedin size={18} />
                    </Link>
                </div>
                <MobileNavigation />
            </Container>
        </MotionNav>
    )
}
