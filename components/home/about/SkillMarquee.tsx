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
            <Container className='px-0 my-20 space-y-6 h-48 relative overflow-hidden'>

                <SkillMarqueeContainer>
                    {
                        data?.map((item) => (
                            <div className='relative size-20 mx-4' key={item._id.toString()}>
                                <img src={item.image} alt={item.title} className='w-56 h-full' />
                            </div>
                        ))
                    }
                </SkillMarqueeContainer>
            </Container>
        </>
    )
}
