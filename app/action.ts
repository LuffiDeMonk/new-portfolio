'use server'

import EmailTemplate from "@/components/template/EmailTemplate"
import { ContactFormValidation } from "@/validation/ContactFormValiation"
import nodemailer from 'nodemailer'
import { z } from "zod"

export const sendEmail = async (prev: any, formData: z.infer<typeof ContactFormValidation>) => {
    const validatedFields = ContactFormValidation.safeParse(formData)
    if (!validatedFields.success) {
        return {
            type: 'error',
            message: 'Invalid inputs'
        }
    }
    const { title, description, email, name } = validatedFields.data

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })
    try {
        const testResults = await transport.verify()
    } catch (err) {
        return {
            type: 'error',
            message: 'An error occured while verifying SMTP server'
        }
    }

    try {
        await transport.sendMail({
            from: email,
            to: process.env.SMTP_EMAIL,
            subject: title,
            html:
                `
            <body>
            <h3>Email sent by: ${name}</h3>
            <p>Address:${email}</p>
            <p>${description}</p>
            </body>
            `

        })
        return {
            type: 'success',
            message: 'Email send successfully '
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Error occured while sending email'
        }
    }
}