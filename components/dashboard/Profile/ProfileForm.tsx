'use client'

import { addProfile } from '@/app/(protected)/dashboard/profile/action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ProfileFormValidation } from '@/validation/ProfileFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = {
    message: ''
}

export default function ProfileForm() {
    const [state, formAction] = useFormState(addProfile, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ProfileFormValidation>>({
        resolver: zodResolver(ProfileFormValidation),
        defaultValues: {
            description: '',
            email: "",
            github: '',
            firstName: '',
            lastName: '',
            linkedin: '',
            phone: ''
        }
    })

    const onSubmit: SubmitHandler<z.infer<typeof ProfileFormValidation>> = async (data) => {
        startTransition(() => {
            formAction(data)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                {/* first and last name */}
                <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-6">
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='firstName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='First Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='lastName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Last Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* phone number */}
                <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='Phone number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                {/* description */}
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder='Description' {...field} className='h-64' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* social links */}
                <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-6">
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='github'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Github link' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name='linkedin'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Linkedin link' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button>{isPending ? 'Loading...' : 'Submit'}</Button>
            </form>
        </Form>
    )
}
