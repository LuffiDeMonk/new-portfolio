import Container from '@/components/dashboard/Container'
import Navbar from '@/components/dashboard/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <Navbar />
            <Container>
                {children}
            </Container>
        </div>
    )
}
