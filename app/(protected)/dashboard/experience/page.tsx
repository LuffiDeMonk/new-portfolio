import ExperienceForm from '@/components/dashboard/Experience/ExperienceForm'
import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import React from 'react'

export default function WorkExperience() {
    return (
        <>
            <Heading
                title='Work Experience'
            />
            <FormContainer>
                <ExperienceForm />
            </FormContainer>
        </>
    )
}
