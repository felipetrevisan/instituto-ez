'use server'

import { EmailTemplate, getEmailMessages } from '@ez/web/components/emails/email-template'
import { env } from '@ez/web/config/env'
import { getSiteSettings } from '@ez/web/server/catalog'
import { type ContactFormSchema, contactFormSchema } from '@ez/web/types/contact'
import { Resend } from 'resend'

/**
 * Envia a mensagem do formulário de contato. O destinatário vem das configurações
 * do site (painel) — nunca do navegador, para a action não virar um relay de e-mail.
 */
export async function sendEmail(formData: ContactFormSchema, locale?: string) {
  if (!env.RESEND_API_KEY) {
    return { data: null, error: { message: 'RESEND_API_KEY não configurada' } }
  }

  const parsed = contactFormSchema.safeParse(formData)
  if (!parsed.success) return { data: null, error: { message: 'Dados inválidos' } }

  const { contact } = await getSiteSettings()
  const resend = new Resend(env.RESEND_API_KEY)
  const messages = getEmailMessages(locale)

  const { data, error } = await resend.emails.send({
    from: `${messages.fromLabel} <${contact.email}>`,
    to: [contact.email],
    replyTo: parsed.data.email,
    subject: parsed.data.subject,
    react: EmailTemplate({ ...parsed.data, locale }),
  })

  return { data, error }
}
