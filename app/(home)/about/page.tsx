import NavBanner from '@/components/home/NavBanner'
import Description from '@/components/home/About'
import React from 'react'
import Services from '@/components/home/Services'
import Counter from '@/components/home/Counter'
import SkillMarquee from '@/components/home/about/SkillMarquee'
import { getGithubData } from '@/helpers/data/fetchGithubData'
import Timeline from '@/components/home/Education'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About'
}

export default async function About() {
    const githubdata = await getGithubData()
    return (
        <>
            <NavBanner />
            <Services />
            <Description />
            <SkillMarquee />
            <Timeline />
            <Counter
                public_repos={githubdata.public_repos}
                followers={githubdata.followers}
                following={githubdata.following}
            />
        </>
    )
}

