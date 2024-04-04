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
export const AnimationWrapper = AnimatePresence