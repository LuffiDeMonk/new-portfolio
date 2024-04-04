import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react';
import Image from 'next/image'
import { IProject } from '@/models/project'


export default function ProjectCardPopup({ data }: { data: IProject }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className='cursor-pointer hover:underline capitalize'>
                    {data.title}
                </p>
            </DialogTrigger>
            <DialogContent>
                <div className='p-5 space-y-4'>
                    <Image alt={data.title} src={data.image} width={300} height={600} className='w-full h-56 object-cover' />
                    <p className='text-sm'>{data.description}</p>
                    <Link target='_blank' href='https://www.github.com' className='flex items-center text-xs text-blue-500 underline'>
                        Live Demo <SquareArrowOutUpRight size={12} />
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}
