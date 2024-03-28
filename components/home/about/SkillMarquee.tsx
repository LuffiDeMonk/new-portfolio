import React from 'react'
import Container from '@/components/home/Container'
import { ISkill } from '@/models/skill'
import { FetchSkills } from '@/helpers/data/fetchSkills'
import Image from 'next/image'
import { MotionDiv } from '@/components/motion'

export default async function SkillMarquee() {

    const variants = {
        animate: {
            x: [0, "-100%"],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 100,
                    ease: "linear",
                },
            },
        },
    }

    const data: Array<ISkill> | undefined = await FetchSkills()
    return (
        <Container className='my-20 bg-gray-100 h-48 relative overflow-hidden'>
            <MotionDiv
                variants={variants}
                animate='animate'
                className="h-full absolute flex justify-center items-center gap-3 flex-nowrap"
            >
                {
                    data?.map(item => (
                        <div className='relative size-40' key={item._id.toString()}>
                            <Image color='gray' src={item.image} width={300} height={300} alt={item.title} className='w-full h-full grayscale' />
                        </div>
                    ))
                }
                {
                    data?.map(item => (
                        <div className='relative size-32' key={item._id.toString()}>
                            <Image color='gray' src={item.image} width={100} height={100} alt={item.title} className='w-full h-full grayscale' />
                        </div>
                    ))
                }
            </MotionDiv>
        </Container>
    )
}
