import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import SkillForm from '@/components/dashboard/skills/SkillForm'
import React from 'react'


export default async function Skills() {
    return (
        <>
            <Heading title='Add Skills' />
            <FormContainer>
                <SkillForm />
            </FormContainer>
        </>
    )
}
