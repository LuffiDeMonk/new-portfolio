import React from 'react'
import { ShieldAlertIcon, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormErrorTypes = {
    state?: FormErrorStatus
}

export default function FormError({ state }: FormErrorTypes) {
    return (
        <div className={cn('p-3 flex gap-2 items-center text-xs', `${state?.type === 'success' ? "bg-cyan-100" : "bg-destructive"}`)}>
            {state?.type === "success" ? <CheckCircle size={15} /> : <ShieldAlertIcon />}
            <p>{state?.message}</p>
        </div>
    )
}
