'use client'

import React from 'react'
import Container from './Container'
import { Separator } from '../ui/separator'
import { BadgeAlert, Blocks, Component } from 'lucide-react'
import { MotionDiv } from '../motion'
import { cardVariants, variants } from '@/constants/animation/marquee'

const serviceTabs = [
    {
        id: crypto.randomUUID(),
        title: 'Frontend Solutions',
        description: 'Offer tailored frontend development solutions to meet the unique needs of your clients.',
        icon: <BadgeAlert size={80} className='text-blue-700' />

    },
    {
        id: crypto.randomUUID(),
        title: 'User-Centric Design',
        description: 'Offer tailored frontend development solutions to meet the unique needs of your clients.',
        icon: <Component size={80} className='text-blue-700' />
    },
    {
        id: crypto.randomUUID(),
        title: 'Integration',
        description: 'Offer tailored frontend development solutions to meet the unique needs of your clients.',
        icon: <Blocks size={80} className='text-blue-700' />
    }
]


export default function Services() {
    return (
        <Container className='mt-20 mb-36 flex flex-col items-center justify-center gap-2'>
            <MotionDiv
                variants={variants}
                initial='initial'
                whileInView='whileInView'
                viewport={{ once: true }}
            >
                <MotionDiv
                    variants={variants}
                    className='flex justify-center'
                >
                    <Separator
                        orientation='vertical'
                        className='bg-purple-500 w-[1px] h-16'
                    />
                </MotionDiv>
                <MotionDiv variants={variants}>
                    <p className='text-base tracking-wider uppercase text-center my-2'>
                        services provided
                    </p>
                </MotionDiv>
                <MotionDiv variants={variants}>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center leading-normal'>Build brands campaigns
                        <br /> & digital projects</h2>
                </MotionDiv>
                <div className="grid gap-8 grid-cols 1 lg:grid-cols-3 mt-16">
                    {
                        serviceTabs.map((service, idx) => (
                            <MotionDiv
                                variants={cardVariants}
                                initial='initial'
                                whileInView='whileInView'
                                custom={idx}
                                viewport={{ once: true }}
                                key={service.id}
                                className='p-7 min-h-56 border border-gray-200 hover:border-blue-600 flex items-center flex-col gap-7 transition-colors duration-500'
                            >
                                <div className='flex items-center flex-col gap-4'>
                                    {service.icon}
                                    <h4 className='text-center text-2xl font-semibold'>{service.title}</h4>
                                </div>
                                <p className='text-center text-sm sm:text-md xl:text-base text-gray-600 leading-relaxed'>{service.description}</p>
                            </MotionDiv>
                        ))
                    }
                </div>
            </MotionDiv>
        </Container>
    )
}
