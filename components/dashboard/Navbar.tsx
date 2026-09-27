'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from '@/auth'
import Image from 'next/image'
import { Power } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Links } from '@/constants/DashboardLink'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/(protected)/dashboard/action'


export default function Navbar() {
    const pathname = usePathname()
    return (
        <section className='hidden xl:flex flex-col gap-4 shrink-0 w-64 bg-gray-100 h-screen sticky top-0 p-2'>
            <Link href='/'>
                <Image src="/logo.png" alt='Logo' width={500} height={500} className='w-full h-20 object-cover' />
            </Link>
            <ul className="flex-grow flex flex-col p-5 gap-8">
                {
                    Links.map(link => (
                        <li key={link.id}>
                            <Link href={link.link} className={cn(`${pathname === link.link ? "underline underline-offset-8" : ""}`)}>{link.name}</Link>
                        </li>
                    ))
                }
            </ul>
            <form action={logout} className='space-y-4'>
                <Separator />
                <Button className='flex items-center justify-normal gap-2 hover:bg-transparent' variant='ghost'> <Power /> Log out</Button>
            </form>
        </section>
    )
}
