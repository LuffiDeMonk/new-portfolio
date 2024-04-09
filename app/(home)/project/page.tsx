import NavBanner from '@/components/home/NavBanner'
import ProjectCardLoader from '@/components/home/project/ProjectCardLoader'
import ProjectContainer from '@/components/home/project/ProjectContainer'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Projects'
}

export default function Projects() {
    return (
        <>
            <NavBanner />
            <Suspense fallback={<ProjectCardLoader />}>
                <ProjectContainer />
            </Suspense>
        </>
    )
}
