'use server'
import { LoginFormSchema } from "@/schema/LoginForm"
import { connect } from "@/utils/connect"
import { z } from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const login = async (prev: any, values: z.infer<typeof LoginFormSchema>) => {
    const { email, password } = values
    try {
        await signIn('credentials', { email, password, redirectTo: '/' })

    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        type: 'error',
                        message: 'Invalid Credentials'
                    }
            }
        }
        throw error
    }

}