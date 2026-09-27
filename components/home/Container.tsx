import { cn } from '@/lib/utils'
import React from 'react'

type ContainerProps = {
    className?: string,
    children: React.ReactNode
}

export default function Container({ className, children }: ContainerProps) {
    return (
        <main className={cn('max-w-6xl mx-auto px-6', className)}>
            {children}
        </main>
    )
}
