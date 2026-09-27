'use server'

import EmailTemplate from "@/components/template/EmailTemplate"
import { ContactFormValidation } from "@/validation/ContactFormValiation"
import nodemailer from 'nodemailer'
import { z } from "zod"

export interface SendPortfolioEmailInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

const RECIPIENT_EMAIL = "thapaprabhat4@gmail.com";

/**
 * Direct Server Action to send email from the portfolio email modal to thapaprabhat4@gmail.com
 */
export async function sendPortfolioEmail(
  input: SendPortfolioEmailInput
): Promise<SendEmailResponse> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const subject = input.subject?.trim() || "Portfolio Inquiry";
  const message = input.message?.trim();

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields (name, email, and message).",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  const smtpUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

  if (!smtpUser || !smtpPass) {
    return {
      success: false,
      message:
        "SMTP credentials are not configured in environment variables (SMTP_EMAIL / SMTP_PASSWORD). Please configure them in .env.local to enable direct Gmail SMTP delivery, or use the direct mailto client.",
    };
  }

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transport.sendMail({
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: RECIPIENT_EMAIL,
      subject: `[Portfolio] ${subject} — from ${name}`,
      text: `Sender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #09090b; color: #f4f4f5; border-radius: 16px; border: 1px solid #27272a;">
          <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-family: monospace; letter-spacing: 2px; color: #22d3ee; text-transform: uppercase;">08 / DIRECT INQUIRY TRANSMISSION</span>
            <h2 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 8px 0 4px 0;">New Message from Portfolio</h2>
            <p style="font-size: 13px; color: #a1a1aa; margin: 0;">Delivered to <strong>${RECIPIENT_EMAIL}</strong></p>
          </div>
          <table style="width: 100%; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            <tr>
              <td style="width: 90px; color: #71717a; font-weight: 600;">Sender:</td>
              <td style="color: #ffffff; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="color: #71717a; font-weight: 600;">Email:</td>
              <td><a href="mailto:${email}" style="color: #22d3ee; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #71717a; font-weight: 600;">Subject:</td>
              <td style="color: #e4e4e7;">${subject}</td>
            </tr>
          </table>
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <span style="font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; display: block; margin-bottom: 8px;">Message Content:</span>
            <p style="margin: 0; color: #f4f4f5; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
          <div style="border-top: 1px solid #27272a; padding-top: 16px; font-size: 12px; color: #71717a;">
            <p style="margin: 0;">Hit "Reply" in your email client to respond directly to ${name} (${email}).</p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: `Your message was sent successfully to ${RECIPIENT_EMAIL}!`,
    };
  } catch (error: any) {
    console.error("Failed to send email via SMTP:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred while sending the email.",
    };
  }
}

/**
 * Original sendEmail function for useFormState backward compatibility
 */
export const sendEmail = async (prev: any, formData: z.infer<typeof ContactFormValidation>) => {
    const validatedFields = ContactFormValidation.safeParse(formData)
    if (!validatedFields.success) {
        return {
            type: 'error',
            message: 'Invalid inputs'
        }
    }
    const { title, description, email, name } = validatedFields.data

    const smtpUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

    if (!smtpUser || !smtpPass) {
        return {
            type: 'error',
            message: 'SMTP credentials are not configured in environment variables'
        }
    }

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
    })
    try {
        await transport.verify()
    } catch (err) {
        return {
            type: 'error',
            message: 'An error occured while verifying SMTP server'
        }
    }

    try {
        await transport.sendMail({
            from: `"${name}" <${smtpUser}>`,
            replyTo: email,
            to: process.env.SMTP_RECEIVER || RECIPIENT_EMAIL,
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
            message: 'Email sent successfully'
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Error occured while sending email'
        }
    }
}