'use client'
import { addSkill } from '@/app/(protected)/dashboard/skills/action'
import Spinner from '@/components/home/Spinner'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useToastNotification from '@/helpers/customhooks/useToastNotification'
import { SkillFormValidation } from '@/validation/SkillFormValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = {
    type: '',
    message: ''
}

export default function SkillForm() {
    const [state, formAction] = useFormState(addSkill, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof SkillFormValidation>>({
        resolver: zodResolver(SkillFormValidation),
        defaultValues: {
            image: undefined,
            title: ''
        }
    })
    const fileRef = form.register('image')

    const onSubmit: SubmitHandler<z.infer<typeof SkillFormValidation>> = (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('image', data.image[0])
        startTransition(() => {
            formAction(formData)
        })
    }

    // useEffect(() => {
    //     if (state.type === 'success') {
    //         toast.success(state.message)
    //     }
    //     if (state.type === 'error') {
    //         toast.error(state.message)
    //     }
    // }, [state])

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
                                <Input {...field} placeholder="Enter your skill" />
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
                                <Input type='file' accept="image/*" {...fileRef} />
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
