import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import { Suspense } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense>
                <Navbar />
            </Suspense>
            {children}
            <Footer />
        </>
    )
}



