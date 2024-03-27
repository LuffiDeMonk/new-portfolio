import React from 'react'

export default function EmailTemplate({ description }: { description: string }) {
    return (
        <div>
            <p className='text-xl'>{description}</p>
        </div>
    )
}
