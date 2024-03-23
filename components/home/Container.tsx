import React from 'react'

export default function Container() {
    return (
        <div className='overflow-y-auto w-full h-screen' style={{ scrollBehavior: 'smooth' }}>
            <div className="h-screen w-full bg-green-100 text-5xl font-semibold" id="section-1">Section 1</div>
            <div className="h-screen w-full bg-green-100 text-5xl font-semibold" id="section-2">Section 2</div>
            <div className="h-screen w-full bg-green-100 text-5xl font-semibold" id="section-3">Section 3</div>
            <div className="h-screen w-full bg-green-100 text-5xl font-semibold" id="section-4">Section 4</div>
        </div>
    )
}
