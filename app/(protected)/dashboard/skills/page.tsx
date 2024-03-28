import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import SkillForm from '@/components/dashboard/skills/SkillForm'
import { FetchSkills } from '@/helpers/data/fetchSkills'
import { ISkill } from '@/models/skill'
import React from 'react'


export default async function Skills() {
    const data: Array<ISkill> | undefined = await FetchSkills()
    return (
        <>
            <Heading title='Add Skills' />
            <FormContainer>
                <SkillForm />
            </FormContainer>
            {
                data?.map(item => (
                    <div key={item._id.toString()}>{item.title}</div>
                ))
            }
        </>
    )
}
