import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import SkillForm from '@/components/dashboard/skills/SkillForm'
import { GetSkills } from '@/helpers/data/fetchSkills'
import { ISkill } from '@/models/skill'
import { Document } from 'mongoose'
import React from 'react'

type API = {
    message: string,
    skills: ISkill[]
}

export default async function Skills() {
    const data: API = await GetSkills()
    return (
        <>
            <Heading title='Add Skills' />
            <FormContainer>
                <SkillForm />
            </FormContainer>
            <div>
                {
                    data.skills.map(skill => (
                        <h1 key={skill._id.toString()}>{skill.title}</h1>
                    ))
                }
            </div>
        </>
    )
}
