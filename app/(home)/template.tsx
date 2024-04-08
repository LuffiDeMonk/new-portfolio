import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { getProfile } from '@/helpers/data/fetchProfile'
import { Suspense } from 'react'

export default async function Template({ children }: { children: React.ReactNode }) {
    const profileData = await getProfile()
    return (
        <>
            <Suspense>
                <Navbar
                    email={profileData?.[0]?.email!}
                    github={profileData?.[0].github!}
                    linkedin={profileData?.[0].linkedin!}
                />
            </Suspense>
            {children}
            <Footer />
        </>
    )
}



