'use client'

import { addEducation } from '@/app/(protected)/dashboard/education/action'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useToastNotification from '@/helpers/customhooks/useToastNotification'
import { cn } from '@/lib/utils'
import { EducationFormValidation } from '@/validation/EducationFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = {
    type: "",
    message: ""
}

export default function EducationForm() {
    const [state, formAction] = useFormState(addEducation, initialState)
    const [isPending, startTranstition] = useTransition()
    const form = useForm<z.infer<typeof EducationFormValidation>>(
        {
            resolver: zodResolver(EducationFormValidation),
            defaultValues: {
                degree: "",
                institution: '',
                endedAt: undefined,
                startedFrom: undefined
            }
        }
    )

    const onSubmit: SubmitHandler<z.infer<typeof EducationFormValidation>> = (data) => {
        startTranstition(() => {
            formAction(data)
        })
    }

    useToastNotification(state)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='institution'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter your institution" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='degree'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Enter your degree" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-6">
                    <div className="flex-grow">
                        <FormField
                            control={form.control}
                            name="startedFrom"
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
                            name="endedAt"
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
