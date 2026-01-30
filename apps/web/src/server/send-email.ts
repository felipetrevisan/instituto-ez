'use server'

import type { SanityAsset } from '@ez/shared/types'
import { EmailTemplate, getEmailMessages } from '@ez/web/components/emails/email-template'
import { env } from '@ez/web/config/env'
import type { ContactFormSchema } from '@ez/web/types/contact'
import { Resend } from 'resend'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendEmail(
  formData: ContactFormSchema,
  email: string,
  logo?: SanityAsset,
  locale?: string,
) {
  const messages = getEmailMessages(locale)

  const { data, error } = await resend.emails.send({
    from: `${messages.fromLabel} <${email}>`,
    to: [email],
    replyTo: formData.email,
    subject: formData.subject,
    react: EmailTemplate({ ...formData, logo, locale }),
  })

  return { data, error }
}
