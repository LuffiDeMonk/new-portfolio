'use client'
import React from 'react'
import Container from './Container'
import CountUp from 'react-countup'
import { MotionDiv } from '../motion'
import { cardVariants } from '@/constants/animation/marquee'

type CounterProps = {
    public_repos: number,
    following: number,
    followers: number
}

export default function Counter({ public_repos, followers, following }: CounterProps) {
    const data_array = [
        {
            id: crypto.randomUUID(),
            title: 'Public Repositories',
            value: public_repos
        },
        {
            id: crypto.randomUUID(),
            title: 'Followers',
            value: followers
        },
        {
            id: crypto.randomUUID(),
            title: 'Following',
            value: following
        }
    ]
    return (
        <Container className='flex flex-col md:flex-row items-center justify-center gap-10 mt-12 pb-32 md:mt-0'>
            {data_array.map((data, idx) => (
                <MotionDiv
                    variants={cardVariants}
                    initial='initial'
                    whileInView='whileInView'
                    custom={idx}
                    viewport={{ once: true }}
                    key={idx}
                    className="w-full min-h-56 md:w-1/3  flex flex-col gap-3 items-center justify-center border border-gray-100 hover:border-blue-500 transition-colors duration-500"
                >
                    <CountUp
                        className='text-6xl font-semibold text-purple-400'
                        start={0}
                        end={data.value}
                        duration={10}
                    />
                    <p className='text-base'>{data.title}</p>
                </MotionDiv>
            ))}
        </Container>
    )
}
