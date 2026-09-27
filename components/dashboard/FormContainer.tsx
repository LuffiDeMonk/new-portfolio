import { cn } from '@/lib/utils'
import React from 'react'

type FormContainerProps = {
    children: React.ReactNode,
    className?: string
}

export default function FormContainer({ children, className }: FormContainerProps) {
    return (
        <section className={cn('mt-6', className)}>
            {children}
        </section>
    )
}
