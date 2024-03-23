import { z } from 'zod'

export const RegisterFormSchema = z.object({
    name: z.string().min(1, 'Name is required '),
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1)
}).refine(data => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword']
})