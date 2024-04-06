import React from 'react'
import Container from '@/components/home/Container'
import { ISkill } from '@/models/skill'
import { FetchSkills } from '@/helpers/data/fetchSkills'
import Image from 'next/image'
import SkillMarqueeContainer from '@/components/motion'


export default async function SkillMarquee() {
    const data: Array<ISkill> | undefined = await FetchSkills()
    return (
        <>
            <Container className='px-0 my-20 space-y-2 h-60 relative overflow-hidden'>
                <h1 className='text-5xl font-bold text-center'>Skills</h1>
                <SkillMarqueeContainer>
                    {
                        data?.map((item) => (
                            <div className='relative size-20 mx-4' key={item._id.toString()}>
                                <Image width={300} height={100} src={item.image} alt={item.title} className='w-full grayscale h-full' />
                            </div>
                        ))
                    }
                </SkillMarqueeContainer>
            </Container>
        </>
    )
}
