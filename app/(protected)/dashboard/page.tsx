import { IProject, Project } from '@/models/project'
import { connect } from '@/utils/connect'
import Image from 'next/image'
import React from 'react'

// type IProject = {
//     title: string,
//     description: string,
//     image: string,
//     skills: string,
//     _id: string
// }

const getProject = async () => {
    if (!process.env.MONGODB_URL) return []
    const conn = await connect()
    if (!conn) return []

    const projectData: Array<IProject> = await Project.find()
    return projectData || []
}

export default async function Dashboard() {
    const projects = await getProject()

    return (
        <div>
            {projects.map(project => (
                <div key={project._id.toString()} className='mb-10'>
                    <Image src={project.image} alt={project.skills} width={500} height={500} />
                </div>
            ))}
        </div>
    )
}
