'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Container from './Container'

export default function Timeline() {
    return (
        <Container className='my-12'>
            <section className='relative border-s-4 border-gray-200 '>
                <div className='absolute -left-4 top-1/2 -translate-y-1/2 size-7 border bg-green-400 rounded-full animate-ping duration-1000 origin-bottom' />
                <div className='absolute -left-4 top-1/2 -translate-y-1/2 size-7 border bg-green-400 rounded-full' />
                <div className='h-fit p-4 ml-8 rounded-xl relative space-y-2'>
                    <time>25th December - 1st March</time>
                    <h1 className='text-xl font-semibold'>Hunchha Digital</h1>
                    <p className='text-sm text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ab animi, fugit cupiditate placeat, natus repudiandae exercitationem voluptatem distinctio ipsa dolores voluptas eius possimus similique maiores veritatis nostrum quo molestiae!</p>
                </div>

            </section>

        </Container>
    )
}
