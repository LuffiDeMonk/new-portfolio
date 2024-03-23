'use client'

import React from 'react'
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

const initialState = {
    type: '',
    message: ''
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login, initialState)
    const form = useForm<z.infer<typeof LoginFormSchema>>(
        {
            resolver: zodResolver(LoginFormSchema),
            defaultValues: {
                email: '',
                password: ''
            }
        }
    )

    const onSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = async (data) => {
        await formAction(data)
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
                                    <Input placeholder='example@gmail.com' {...field} />
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
                                    <Input placeholder='***********' type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {state?.type !== '' && <FormError state={state} />}
                    <Button className='w-full'>Log in</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
