import React from 'react'
import Container from '@/components/home/Container'
import { ISkill } from '@/models/skill'
import { FetchSkills } from '@/helpers/data/fetchSkills'
import Image from 'next/image'
import SkillMarqueeContainer from '@/components/motion'


export default async function SkillMarquee() {
    const data: Array<ISkill> | undefined = await FetchSkills()
    return (
        <Container className='my-20 bg-gray-100 h-48 relative overflow-hidden'>
            <SkillMarqueeContainer>
                {
                    data?.map((item) => (
                        <div className='relative size-20 mx-4' key={item._id.toString()}>
                            <img color='gray' src={item.image} width={300} height={300} alt={item.title} className='w-full h-full grayscale' />
                        </div>
                    ))
                }
            </SkillMarqueeContainer>
        </Container>
    )
}
