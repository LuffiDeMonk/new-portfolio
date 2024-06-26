'use client'
import { IProject } from '@/models/project'
import Image from 'next/image'

import React from 'react'
import ProjectCardPopup from './ProjectCardPopup'
import { MotionDiv } from '@/components/motion'
import { cardVariants } from '@/constants/animation/marquee'



export default function ProjectCard({ data, custom }: { data: IProject, custom: number }) {
    return (
        <MotionDiv initial='initial' whileInView='whileInView' variants={cardVariants} custom={custom} viewport={{ once: true }} key={data._id.toString()} className='rounded-lg h-64 overflow-hidden relative group'>
            <div className="bg-black text-white text-xl font-semibold flex items-center justify-center bg-opacity-60 w-full h-full absolute top-0 -left-[100vw] group-hover:left-0 transition-all duration-500 z-10">
                <ProjectCardPopup
                    title={data.title}
                    image={data.image}
                    description={data.description}
                    liveDemo={data.liveDemo}
                    repo={data.repo}
                    skills={data.skills}
                />
            </div>
            <Image src={data.image} width={500} height={500} className='object-cover w-full h-full group-hover:scale-150 transition-all duration-500 -z-10' alt={data.title} />
        </MotionDiv>
    )
}
