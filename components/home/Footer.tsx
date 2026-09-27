import React from 'react'
import Container from './Container'
import { Button } from '../ui/button'
import { Facebook, Github, Linkedin, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Links } from '@/constants/HomeNavlink'
import Link from 'next/link'
import { getProfile } from '@/helpers/data/fetchProfile'
import { MotionDiv } from '../motion'
import { variants } from '@/constants/animation/marquee'


export default async function Footer() {
    const profileData = await getProfile()
    return (
        <footer className='h-screen bg-[#001D38] relative'>
            <Container className='h-full flex flex-col justify-around text-white'>
                <MotionDiv
                    variants={variants}
                    initial='initial'
                    whileInView='whileInView'
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center gap-6"
                >
                    <MotionDiv variants={variants}>
                        <h2 className='text-4xl xl:text-5xl text-center font-[800]'>Let&rsquo;s discuss for a project</h2>
                    </MotionDiv>
                    <MotionDiv variants={variants}>
                        <p className='text-sm text-center leading-loose'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor <br />
                            incididunt ut labore et dolore magna aliqua.</p>
                    </MotionDiv>
                    <MotionDiv variants={variants}>
                        <Link href='/contact'>
                            <Button className='px-9 py-7 rounded-none border border-transparent duration-500 bg-sky-400 hover:text-sky-400 hover:bg-black/15 hover:border-sky-400'>Start talking</Button>
                        </Link>
                    </MotionDiv>
                </MotionDiv>
                <div className="space-y-12">
                    <div className="flex items-center justify-center lg:justify-between">
                        <div className="hidden lg:flex items-center gap-12">
                            {
                                Links.slice(1, 4).map(item => (
                                    <Link key={item.id} href={item.link} className='text-sm cursor-pointer hover:text-purple-600 duration-300'>{item.name}</Link>
                                ))
                            }

                        </div>
                        <MotionDiv
                            variants={variants}
                            initial='initial'
                            whileInView='whileInView'
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-6"
                        >
                            <MotionDiv variants={variants}>
                                <Link target='_blank' media='email' href={`mailto:${profileData?.[0]?.email}`} passHref className='rounded-full border border-black p-3 hover:bg-purple-400 hover:border-transparent cursor-pointer transition-colors duration-500 flex items-center justify-center'>
                                    <Mail size={17} />
                                </Link>
                            </MotionDiv>
                            <MotionDiv variants={variants}>
                                <Link target='_blank' href={profileData?.[0]?.github!} className='rounded-full border border-black p-3 hover:bg-purple-400 hover:border-transparent cursor-pointer transition-colors duration-500 flex items-center justify-center'>
                                    <Github size={17} fill='white' />
                                </Link>
                            </MotionDiv>
                            <MotionDiv variants={variants}>
                                <Link target='_blank' href={`https://${profileData?.[0]?.linkedin}`} className='rounded-full border border-black p-3 hover:bg-purple-400 hover:border-transparent cursor-pointer transition-colors duration-500 flex items-center justify-center'>
                                    <Linkedin size={17} fill='white' />
                                </Link>
                            </MotionDiv>
                        </MotionDiv>
                    </div>
                    <Separator className='bg-stone-500' />
                </div>
            </Container>
        </footer>
    )
}
