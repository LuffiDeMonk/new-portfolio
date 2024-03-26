import React from 'react'
import { Button } from '../ui/button'
import { signOut } from '@/auth'

export default function Navbar() {
    return (
        <section className='hidden xl:block shrink-0 w-64 bg-red-100 h-screen'>
            <form action={async () => {
                'use server'
                await signOut()
            }}>
                <Button>Log out</Button>
            </form>
        </section>
    )
}
