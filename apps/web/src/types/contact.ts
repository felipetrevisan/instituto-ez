import { z } from 'zod'

export type ContactFormSchemaMessages = {
  nameRequired: string
  emailRequired: string
  emailInvalid: string
  phoneRequired: string
  subjectRequired: string
  messageRequired: string
}

export const createContactFormSchema = (messages: ContactFormSchemaMessages) =>
  z.object({
    name: z
      .string({
        required_error: messages.nameRequired,
      })
      .min(1, { message: messages.nameRequired }),
    email: z
      .string({
        required_error: messages.emailRequired,
      })
      .email({ message: messages.emailInvalid }),
    phone: z.string({
      required_error: messages.phoneRequired,
    }),
    subject: z
      .string({
        required_error: messages.subjectRequired,
      })
      .min(1, { message: messages.subjectRequired }),
    message: z
      .string({
        required_error: messages.messageRequired,
      })
      .min(1, { message: messages.messageRequired }),
  })

export const contactFormSchema = createContactFormSchema({
  nameRequired: 'O nome é obrigatório',
  emailRequired: 'O e-mail é obrigatório',
  emailInvalid: 'Digite um e-mail válido',
  phoneRequired: 'O telefone é obrigatório',
  subjectRequired: 'O assunto é obrigatório',
  messageRequired: 'A mensagem é obrigatória',
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
