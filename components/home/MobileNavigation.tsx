'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { Links } from '@/constants/HomeNavlink'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { MotionDiv } from '../motion'
import { cardVariants, variants } from '@/constants/animation/marquee'

export default function MobileNavigation() {
    const pathname = usePathname()
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='ghost' size='icon' className='lg:hidden'>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="my-12 h-full flex flex-col gap-8">
                        {Links.map((item, idx) => (
                            <MotionDiv initial='initial' whileInView='whileInView' variants={cardVariants} custom={idx} key={item.id}>
                                <Link href={item.link} className={cn("text-xl pl-6 relative ", `${pathname === item.link ? "before:absolute before:top-0 before:left-0 before:content-[''] before:h-full before:w-1 before:bg-red-300" : ""}`)}>{item.name}</Link>
                            </MotionDiv>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
