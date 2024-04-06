import React from 'react'
import Container from '../Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectCardLoader() {
    return (
        <Container className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {Array(6).fill(1).map((_, idx) => (
                <Skeleton key={idx} className='h-64 rounded-lg' />
            ))}
        </Container>
    )
}
