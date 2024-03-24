
import FormContainer from '@/components/dashboard/FormContainer'
import Heading from '@/components/dashboard/Heading'
import ProjectForm from '@/components/dashboard/Projects/ProjectForm'
import React from 'react'

export default function Projects() {
    return (
        <>
            <Heading
                title='Add Projects'
            />
            <FormContainer>
                <ProjectForm />
            </FormContainer>
        </>
    )
}
