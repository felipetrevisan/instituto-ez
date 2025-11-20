'use server'

import type { SanityAsset } from '@ez/shared/types'
import { EmailTemplate } from '@ez/web/components/emails/email-template'
import { env } from '@ez/web/config/env'
import type { ContactFormSchema } from '@ez/web/types/contact'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail(formData: ContactFormSchema, email: string, logo?: SanityAsset) {
  const { data, error } = await resend.emails.send({
    from: `Contato - Site <${email}>`,
    to: [email],
    replyTo: formData.email,
    subject: formData.subject,
    react: EmailTemplate({ ...formData, logo }),
  })

  return { data, error }
}
