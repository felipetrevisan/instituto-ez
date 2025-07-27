'use server'

import { EmailTemplate } from '@ez/web/components/email-template'
import { env } from '@ez/web/config/env'
import type { ContactFormSchema } from '@ez/web/types/contact'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail(formData: ContactFormSchema, email: string) {
  const { data, error } = await resend.emails.send({
    from: `Contato ${email}`,
    to: [email],
    replyTo: formData.email,
    subject: formData.subject,
    react: EmailTemplate(formData),
  })

  return { data, error }
}
