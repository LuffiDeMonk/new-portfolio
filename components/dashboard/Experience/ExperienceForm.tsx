'use client'

import { addExperience } from '@/app/(protected)/dashboard/experience/action'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import useToastNotification from '@/helpers/customhooks/useToastNotification'
import { format } from "date-fns"
import { ExperienceFormValidation } from '@/validation/ExperienceFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'

const initialState = {
    message: '',
    type: ''
}

export default function ExperienceForm() {
    const [state, formAction] = useFormState(addExperience, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ExperienceFormValidation>>(
        {
            resolver: zodResolver(ExperienceFormValidation),
            defaultValues: {
                companyName: '',
                description: '',
                title: '',
                from: undefined,
                to: undefined
            }
        }
    )
    const onSubmit: SubmitHandler<z.infer<typeof ExperienceFormValidation>> = (data) => {
        startTransition(() => {
            formAction(data)
            form.reset()
        })
    }

    // changing toast state based on server action state
    useToastNotification(state)

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
                                <Textarea placeholder='Describe your role in the organization' {...field} className='h-64' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-6">
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name="from"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn(`${field.value ? "text-black" : "text-gray-400"}`)}>
                                                    {!field.value ? "Select your joining date" : format(field.value, 'PPP')}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name="to"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn(`${field.value ? "text-black" : "text-gray-400"}`)}>
                                                    {!field.value ? "Select your ending date" : format(field.value, 'PPP')}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
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
