'use client'
import React from 'react'
import Container from './Container'
import CountUp from 'react-countup'

export default function Counter() {
    return (
        <Container className='flex flex-col md:flex-row items-center justify-center gap-10 mt-12 md:mt-0'>
            {Array(3).fill(1).map((_, idx) => (
                <div key={idx} className="w-full min-h-56 md:w-1/3  flex flex-col gap-3 items-center justify-center border border-gray-100 hover:border-blue-500 transition-colors duration-500">
                    <CountUp
                        className='text-6xl font-semibold text-purple-400'
                        start={0}
                        end={78}
                        duration={10}
                    />
                    <p className='text-base'>Total Projects</p>
                </div>
            ))}
        </Container>
    )
}
