import Container from '@/components/dashboard/Container'
import Navbar from '@/components/dashboard/Navbar'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <Navbar />
            <Container>
                {children}
            </Container>
            <Toaster richColors position='top-right' closeButton />
        </div>
    )
}
