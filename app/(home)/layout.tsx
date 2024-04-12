import React from 'react'
import { Poppins } from 'next/font/google'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: 'Prabhat | %s',
        default: 'Prabhat'
    },
    description: "Hello, I'm a dynamic front-end developer with expertise in React. Passionate about crafting seamless user experiences, I bring a creative approach to turning design concepts into responsive and interactive web applications. Committed to staying updated with the latest industry trends, I thrive in collaborative environments, delivering clean and efficient code. Let's work together to bring your web projects to life!"
}

const poppins = Poppins({ weight: ['400'], subsets: ['devanagari'] })

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={poppins.className}>
            {children}
        </div>
    )
}
