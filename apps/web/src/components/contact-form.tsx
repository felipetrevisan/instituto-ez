'use client'

import { Loader2Icon } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { toast } from '@ez/shared/ui'
import { Button } from '@ez/shared/ui/button'
import { DialogFooter, DialogTrigger } from '@ez/shared/ui/dialog'
import { Input } from '@ez/shared/ui/input'
import { Textarea } from '@ez/shared/ui/textarea'
import { useForm as useBaseForm } from '@ez/web/hooks/use-form'
import { useSite } from '@ez/web/hooks/use-site'
import { type ContactFormSchema, contactFormSchema } from '@ez/web/types/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '../server/send-email'

export function ContactForm({
  isDialog = false,
  subject = '',
  onCloseAction,
}: {
  isDialog: boolean
  subject: string
  onCloseAction: () => void
}) {
  const [focusedField, setFocusedField] = useState<string | null>('name')

  const { data: settings } = useSite()

  const { data: form } = useBaseForm(settings?.contact.form._ref || '')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })

  useEffect(() => {
    if (!subject) return

    setValue('subject', subject, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [subject, setValue])

  async function handleSendForm(formData: ContactFormSchema) {
    if (!settings?.contact?.email) {
      toast.warning('Email de destino não está configurado.')
      return false
    }

    const { data: emailData, error } = await sendEmail(formData, settings.contact.email)

    if (error) {
      toast.warning('Não foi possível enviar a mensagem')
      return false
    }

    if (emailData?.id) {
      toast.success('Mensagem enviada com sucesso')
      reset()
      onCloseAction()
      return true
    }

    toast.warning('Não foi possível enviar a mensagem')
    return false
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(handleSendForm)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
          {form?.fields.map(({ name, label, type, isRequired }) => {
            const value = watch(name as keyof ContactFormSchema)
            const hasError = !!errors[name as keyof ContactFormSchema]
            const isFocused = focusedField === name || !!value

            return (
              <motion.div
                animate={hasError ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
                className={cn('relative col-span-2')}
                key={name}
                transition={{ duration: 0.4 }}
              >
                <motion.label
                  animate={
                    isFocused
                      ? {
                          y: -30,
                          left: 10,
                          scale: 0.8,
                          opacity: 1,
                          fontSize: '20px',
                        }
                      : { y: 10, scale: 1, opacity: 0.5 }
                  }
                  className={cn(
                    'pointer-events-none absolute left-5 origin-left font-oswald font-semibold text-secondary',
                    {
                      'text-red-500': hasError,
                      'text-tertiary': isFocused,
                    },
                  )}
                  htmlFor={name}
                  transition={{ duration: 0.25 }}
                >
                  {label}
                </motion.label>
                {type === 'textarea' ? (
                  <Textarea
                    {...register(
                      name as keyof ContactFormSchema,
                      isRequired ? { required: `${label} é obrigatório` } : {},
                    )}
                    animate={{
                      borderRadius: isFocused ? '1rem' : '1.25rem',
                      height: isFocused ? 250 : 100,
                    }}
                    className={cn('transition-colors', {
                      'border-red-500': hasError,
                    })}
                    initial={{ height: 200 }}
                    onBlur={() => setFocusedField(null)}
                    onFocus={() => setFocusedField(name)}
                    rows={20}
                    style={{ resize: 'none' }}
                  />
                ) : (
                  <Input
                    type={type}
                    {...register(
                      name as keyof ContactFormSchema,
                      isRequired ? { required: `${label} é obrigatório` } : {},
                    )}
                    animate={{
                      borderRadius: isFocused ? '1rem' : '1.25rem',
                    }}
                    className={cn('transition-colors', {
                      'border-red-500': hasError,
                    })}
                    onBlur={() => setFocusedField(null)}
                    onFocus={() => setFocusedField(name)}
                    readOnly={name === 'subject' && subject !== ''}
                  />
                )}
                <AnimatePresence>
                  {hasError && (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-red-500 text-sm"
                      exit={{ opacity: 0, y: -5 }}
                      initial={{ opacity: 0, y: -5 }}
                    >
                      {errors[name as keyof ContactFormSchema]?.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
      {isDialog && (
        <DialogFooter className="justify-center gap-5">
          <DialogTrigger asChild>
            <Button
              className="w-40"
              onClick={onCloseAction}
              rounded="2xl"
              size="xl"
              theme="tertiary"
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogTrigger>
          <Button
            className="w-40"
            disabled={isSubmitting || !isValid}
            rounded="2xl"
            size="xl"
            theme="default"
            type="submit"
            variant="default"
          >
            {isSubmitting ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar'}
          </Button>
        </DialogFooter>
      )}
      {!isDialog && (
        <div className="flex flex-row md:justify-end">
          <Button
            className="w-full md:w-[200px]"
            disabled={isSubmitting || !isValid}
            rounded="full"
            shadow
            size="xl"
            type="submit"
            variant="default"
          >
            {isSubmitting ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              form?.submitButtonText
            )}
          </Button>
        </div>
      )}
    </form>
  )
}
