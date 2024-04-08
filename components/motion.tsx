'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Marquee from 'react-fast-marquee'

const SkillMarqueeContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Marquee
            className='h-full'>
            {children}
        </Marquee>
    )
}

export default SkillMarqueeContainer

export const MotionDiv = motion.div
export const MotionH1 = motion.h1
export const MotionP = motion.p
export const MotionSection = motion.section
export const MotionSpan = motion.span
export const MotionNav = motion.nav
export const AnimationWrapper = AnimatePresence