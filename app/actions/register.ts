'use server'
import { z } from 'zod'
import { RegisterFormSchema } from '@/schema/RegisterForm'
import { connect } from '@/utils/connect'
import { User } from '@/models/user'
import bcrypt from 'bcryptjs'

export const register = async (prev: FormErrorStatus, values: z.infer<typeof RegisterFormSchema>) => {
    try {
        await connect()
        const { name, email, password } = values
        const existingUser = await User.findOne({ $or: [{ name }, { email }] })
        if (existingUser) {
            return {
                type: 'error',
                message: 'Username or email already exists, please try again with different email or username'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({
            name,
            email,
            password: hashedPassword
        })
        return {
            type: 'success',
            message: 'New user created'
        }


    } catch (error) {
        console.log(error)
    }

    return {
        type: 'success',
        message: 'Form submitted successfully'
    }
}