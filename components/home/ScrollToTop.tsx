'use client'
import { useScroll, useMotionValueEvent, motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export default function ScrollToTop() {
    const { scrollY, scrollYProgress } = useScroll()
    const [hide, setHide] = useState(false)

    const scrollToTopVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    useMotionValueEvent(scrollY, 'change', (latest) => {
        let previous = scrollY.getPrevious() as number
        if (latest > previous) {
            setHide(true)
        }
        if (latest === 0) {
            setHide(false)
        }
    })

    const scrollToTop = () => {
        if (window !== undefined) {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
    return (
        <motion.section
            variants={scrollToTopVariants}
            animate={hide ? 'visible' : 'hidden'}
            onClick={scrollToTop} className='cursor-pointer size-10 bg-white fixed bottom-10 border-l-2 right-10 z-20 flex items-center justify-center border-2 border-gray-200 rounded-full'>
            <ChevronUp />
        </motion.section>
    )
}
