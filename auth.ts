import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { LoginFormSchema } from "./schema/LoginForm"
import { connect } from "./utils/connect"
import { User } from "./models/user"
import bcrypt from 'bcryptjs'


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginFormSchema.safeParse(credentials)
                if (validatedFields.success) {
                    try {
                        await connect()
                        const { email, password } = validatedFields.data
                        const user = await User.findOne({ email })
                        if (!user) return null
                        let passwordMatch = await bcrypt.compare(password, user.password)
                        if (!passwordMatch) return null
                        return user
                    } catch (error) {
                        console.log("error", error)
                    }
                }
                return null
            }
        })
    ]
})