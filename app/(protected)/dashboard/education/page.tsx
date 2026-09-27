import EducationForm from '@/components/dashboard/Education/EducationForm'
import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import React from 'react'

export default function Education() {
    return (
        <>
            <Heading
                title='Add Education'
            />
            <FormContainer>
                <EducationForm />
            </FormContainer>
        </>
    )
}
