'use client'

import { addProject } from '@/app/(protected)/dashboard/projects/action'
import Spinner from '@/components/home/Spinner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useToastNotification from '@/helpers/customhooks/useToastNotification'
import { ProjectFormValidation } from '@/validation/ProjectFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = {
    type: '',
    message: ''
}

export default function ProjectForm() {
    const [state, formAction] = useFormState(addProject, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof ProjectFormValidation>>({
        resolver: zodResolver(ProjectFormValidation),
        defaultValues: {
            description: '',
            skills: '',
            title: '',
            image: undefined,
            liveDemo: '',
            repo: ''
        }
    })
    const fileRef = form.register('image')

    const onSubmit: SubmitHandler<z.infer<typeof ProjectFormValidation>> = async (data) => {
        const newData = new FormData()
        newData.append('title', data.title),
            newData.append('description', data.description)
        newData.append('skills', data.skills)
        newData.append('image', data.image[0])
        newData.append('liveDemo', data.liveDemo)
        newData.append('repo', data.repo)

        startTransition(() => {
            formAction(newData)
        })
    }

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
                                <Input {...field} placeholder='Enter your project title' />
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
                                <Textarea {...field} placeholder='Enter your project description' className='h-32' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='image'
                    render={() => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...fileRef}
                                    type='file'
                                    placeholder='Enter your project description'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='liveDemo'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='Enter live link of the project' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='repo'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='Enter github link of the project' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='skills'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='Technologies used in the project' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>
                    {isPending ?
                        <div className='flex items-center gap-2'>
                            <Spinner />
                            <p>Loading</p>
                        </div> :
                        <p>Submit</p>
                    }
                </Button>
            </form>
        </Form>
    )
}
