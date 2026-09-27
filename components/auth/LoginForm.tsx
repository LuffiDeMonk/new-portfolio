'use client'

import React, { useTransition } from 'react'
import { useFormState } from 'react-dom'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import CardWrapper from './CardWrapper'
import { LoginFormSchema } from '@/schema/LoginForm'
import { login } from '@/app/actions/login'
import FormError from './FormError'
import Spinner from '../home/Spinner'

const initialState = {
    type: '',
    message: ''
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login, initialState)
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginFormSchema>>(
        {
            resolver: zodResolver(LoginFormSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    )

    const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = (data) => {
        startTransition(() => {
            formAction(data)

        })
    }

    return (
        <CardWrapper
            cardTitle='Login'
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2'
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder='example@gmail.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder='***********' type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {state?.type !== '' && <FormError state={state} />}
                    <Button disabled={isPending} className='w-full'>
                        {
                            isPending ?
                                (<div className='flex gap-2 items-center'>
                                    <Spinner />
                                    <p>Loading...</p>
                                </div>)
                                :
                                <p>Log In</p>
                        }

                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
