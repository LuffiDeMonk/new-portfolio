import React from 'react'
import Image from 'next/image'

import { Button } from '../ui/button'

export default function SocialLogin() {
    return (
        <div className='my-2'>
            <Button variant='ghost' className='w-full'>
                <Image src='/google.svg' alt='Google' width={20} height={20} />
                <p className='text-sm ml-2'>Sign In with Google</p>
            </Button>
        </div>
    )
}
