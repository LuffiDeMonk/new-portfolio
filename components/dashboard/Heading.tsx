import { cn } from '@/lib/utils'
import React from 'react'

type HeadingProps = {
    title: string,
    className?: string
}

export default function Heading({ title, className }: HeadingProps) {
    return (
        <h1 className={cn("text-3xl font-semibold", className)}>
            {title}
        </h1>
    )
}
