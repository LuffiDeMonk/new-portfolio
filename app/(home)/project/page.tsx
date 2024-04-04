import Container from '@/components/home/Container'
import NavBanner from '@/components/home/NavBanner'
import ProjectCard from '@/components/home/project/ProjectCard'
import { IProject, Project } from '@/models/project'
import { connect } from '@/utils/connect'
import React from 'react'


const getProject = async () => {
    await connect()

    const projectData: Array<IProject> = await Project.find()
    return projectData
}

export default async function Projectss() {
    const data = await getProject()
    return (
        <>
            <NavBanner />
            <Container className='my-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                {
                    data.map((item) => (
                        <ProjectCard data={item} key={item._id} />
                    ))
                }
            </Container>
        </>
    )
}
