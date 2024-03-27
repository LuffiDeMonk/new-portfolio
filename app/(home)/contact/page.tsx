import Container from '@/components/home/Container'
import NavBanner from '@/components/home/NavBanner'
import AddressContainer from '@/components/home/contact/AddressContainer'
import ContactForm from '@/components/home/contact/ContactForm'
import React from 'react'

export default function Contact() {
    return (
        <>
            <NavBanner />
            <Container className='my-20 grid xl:grid-cols-6 gap-4 xl:gap-8'>
                <ContactForm />
                <AddressContainer />
            </Container>
        </>
    )
}
