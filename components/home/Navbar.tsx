'use client'

import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Facebook, Github, Linkedin } from 'lucide-react'
import { cn } from '@/lib/utils'
import Container from './Container'

export default function Navbar() {
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
        <motion.nav
            variants={navbarVariants}
            animate={hidden ? "hidden" : "animate"}
            transition={{
                duration: 0.1
            }}
            className={cn("fixed top-0 left-0 z-[999] w-full", `${!bg ? 'bg-transparent' : 'bg-white shadow-lg'}`)}>
            <Container className="max-w-6xl mx-auto flex items-center justify-between gap-4 h-20">
                <div className="text-xl font-bold w-1/3 shrink-0 relative h-full">
                    <Image src="/logo.png" alt='banner' fill />
                </div>
                <div className="hidden lg:flex items-center justify-center gap-8 w-1/3 shrink-0">
                    <p>Home</p>
                    <p>About</p>
                    <p>Projects</p>
                    <p>Contact</p>
                </div>
                <div className="hidden lg:flex items-center justify-center gap-4 w-1/3 shrink-0">
                    <div className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Facebook size={18} />
                    </div>
                    <div className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Github size={18} />
                    </div>
                    <div className='rounded-full border border-black p-1.5 flex items-center justify-center'>
                        <Linkedin size={18} />
                    </div>
                </div>
            </Container>
        </motion.nav>
    )
}
