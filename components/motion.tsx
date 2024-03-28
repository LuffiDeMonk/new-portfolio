'use client'
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