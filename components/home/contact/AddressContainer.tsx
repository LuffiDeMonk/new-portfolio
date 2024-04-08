import { MotionDiv } from '@/components/motion'
import { variants } from '@/constants/animation/marquee'
import { HomeIcon, MailIcon, Phone } from 'lucide-react'
import React from 'react'

export default function AddressContainer() {
    return (
        <MotionDiv variants={variants} className='col-span-2 space-y-8'>
            <MotionDiv variants={variants} className="flex gap-3">
                <HomeIcon size={35} className='text-gray-200' />
                <div className='space-y-0.5'>
                    <h3 className='text-xs sm:text-base'>Koteshwor, Kathmandu</h3>
                    <p className='text-[10px] sm:text-sm text-gray-600'>Opposite to Mahadevsthan Temple</p>
                </div>
            </MotionDiv>
            <MotionDiv variants={variants} className="flex gap-3">
                <Phone size={35} className='text-gray-200' />
                <div className='space-y-0.5'>
                    <h3 className='text-xs sm:text-base'>(+977) 9804902664</h3>
                    <p className='text-[10px] sm:text-sm text-gray-600'>Mon to Fri 9am to 6pm</p>
                </div>
            </MotionDiv>
            <MotionDiv variants={variants} className="flex gap-3">
                <MailIcon size={35} className='text-gray-200' />
                <div className='space-y-0.5'>
                    <h3 className='text-xs sm:text-base'>thapaprabhat4@gmail.com</h3>
                    <p className='text-[10px] sm:text-sm text-gray-600'>Send us your query anytime</p>
                </div>
            </MotionDiv>
        </MotionDiv>
    )
}
