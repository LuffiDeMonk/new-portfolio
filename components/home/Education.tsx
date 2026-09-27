import React from 'react'
import Container from './Container'
import { MotionDiv, MotionH1, MotionP } from '../motion'
import { variants } from '@/constants/animation/marquee'
import { getExperience } from '@/helpers/data/fetchExperience'

export default async function Timeline() {
    const experienceData = await getExperience()
    return (
        <Container className='my-20'>
            <h1 className='text-5xl font-bold text-center'>Experience</h1>
            <section className='relative border-s-2 border-gray-200 '>
                {experienceData.map(item => {
                    const startedFrom = new Date(item.from)
                    const endedAt = new Date(item.to)
                    return (
                        <React.Fragment key={item._id}>
                            <div className='absolute -left-2 top-1/2 -translate-y-1/2 size-3 border bg-purple-400 rounded-full animate-ping duration-1000 origin-bottom' />
                            <div className='absolute -left-2 top-1/2 -translate-y-1/2 size-3 border bg-purple-400 rounded-full' />
                            <MotionDiv variants={variants} initial='initial' whileInView='whileInView' viewport={{ once: true }} className='h-fit p-4 ml-8 rounded-xl relative space-y-2'>
                                <MotionDiv variants={variants}>
                                    <span>{`${startedFrom.toLocaleDateString('short', { month: 'short' })} ${startedFrom.getFullYear()}`}</span>
                                    <span>-</span>
                                    <span>{`${endedAt.toLocaleDateString('short', { month: 'short' })} ${endedAt.getFullYear()}`}</span>
                                </MotionDiv>
                                <MotionH1 variants={variants} className='text-xl font-semibold'>{item.companyName}</MotionH1>
                                <MotionP variants={variants} className='text-sm text-gray-300'>{item.description}</MotionP>
                            </MotionDiv>
                        </React.Fragment>
                    )
                })}
            </section>

        </Container>
    )
}
