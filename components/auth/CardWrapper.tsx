import React from 'react'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SocialLogin from './SocialLogin'

type CardWrapperProps = {
    children: React.ReactNode,
    cardTitle: string,
    socialIcons?: boolean,
}

export default function CardWrapper({ cardTitle, children }: CardWrapperProps) {
    return (
        <Card className='w-96 rounded-lg drop-shadow-lg'>
            <CardHeader>
                <CardTitle className='text-center'>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter
                className='flex items-center justify-center'
            >
            </CardFooter>
        </Card>
    )
}
