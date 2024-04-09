import Container from '@/components/home/Container'
import NavBanner from '@/components/home/NavBanner'
import AddressContainer from '@/components/home/contact/AddressContainer'
import ContactForm from '@/components/home/contact/ContactForm'
import { MotionDiv } from '@/components/motion'
import { variants } from '@/constants/animation/marquee'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: 'Contact'
}
export default function Contact() {
    return (
        <>
            <NavBanner />
            <Container className='my-20 '>
                <MotionDiv className='grid xl:grid-cols-6 gap-4 xl:gap-8' variants={variants} initial='initial' whileInView='whileInView' viewport={{ once: true }}>
                    <ContactForm />
                    <AddressContainer />
                </MotionDiv>
            </Container>
        </>
    )
}
