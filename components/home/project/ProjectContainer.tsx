import React from 'react'
import Container from '../Container'
import ProjectCard from './ProjectCard'

import { getProject } from '@/helpers/data/fetchProject'

export default async function ProjectContainer() {
    const data = await getProject()

    return (
        <Container className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {
                data?.map((item) => (
                    <ProjectCard data={item} key={item._id} />
                ))
            }
        </Container>
    )
}
