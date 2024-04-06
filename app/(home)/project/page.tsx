import NavBanner from '@/components/home/NavBanner'
import ProjectCardLoader from '@/components/home/project/ProjectCardLoader'
import ProjectContainer from '@/components/home/project/ProjectContainer'
import { Suspense } from 'react'


export default async function Projectss() {
    return (
        <>
            <NavBanner />
            <Suspense fallback={<ProjectCardLoader />}>
                <ProjectContainer />
            </Suspense>
        </>
    )
}
