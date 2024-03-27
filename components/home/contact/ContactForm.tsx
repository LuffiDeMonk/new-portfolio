'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ContactFormValidation } from '@/validation/ContactFormValiation'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function ContactForm() {
    const form = useForm<z.infer<typeof ContactFormValidation>>({
        resolver: zodResolver(ContactFormValidation),
        defaultValues: {
            name: '',
            title: '',
            description: '',
            email: ''
        }
    })
    const onSubmit: SubmitHandler<z.infer<typeof ContactFormValidation>> = (data) => {
        console.log(data)
    }
    return (
        <div className='col-span-4 space-y-5'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
                    <FormField
                        name='description'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter your message" className="h-56 w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center flex-col md:flex-row justify-between gap-6">
                        <div className="w-full xl:basis-1/2">
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full xl:basis-1/2">
                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        name='title'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='p-6 border border-blue-600 text-blue-600 bg-transparent rounded-none hover:bg-blue-600 hover:text-white hover:border-transparent transition-colors duration-500'>Send Message</Button>
                </form>
            </Form>
        </div>
    )
}
