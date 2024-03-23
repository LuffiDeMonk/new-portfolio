'use client'

import { addExperience } from '@/app/(protected)/dashboard/experience/action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ExperienceFormValidation } from '@/validation/ExperienceFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = {
    message: ''
}

export default function ExperienceForm() {
    const [state, formAction] = useFormState(addExperience, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ExperienceFormValidation>>(
        {
            resolver: zodResolver(ExperienceFormValidation),
        }
    )
    const onSubmit: SubmitHandler<z.infer<typeof ExperienceFormValidation>> = (data) => {
        startTransition(() => {
            formAction(data)
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='Enter Job Title' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='Enter Company Name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder='Enter Your Role' {...field} className='h-64' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-6">
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='from'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Started from ' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='to'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Ended at' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button>{isPending ? "Loading...." : 'Submit'}</Button>
            </form>
        </Form>
    )
}
