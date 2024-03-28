import LoginForm from '@/components/auth/LoginForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        <div className='flex relative items-center justify-center h-screen'>
            <LoginForm />
            <div className="absolute top-4 left-4">
                <Link href='/' className='flex gap-2 items-center'>
                    <ArrowLeft size={18} />
                    <p className='text-sm md:text-base'>Back to home</p>
                </Link>
            </div>
        </div>
    )
}
