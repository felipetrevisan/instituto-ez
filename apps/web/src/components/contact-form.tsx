'use client'

import { Loader2Icon } from '@ez/shared/icons'
import { cn } from '@ez/shared/lib/utils'
import { Button } from '@ez/shared/ui/button'
import { DialogFooter, DialogTrigger } from '@ez/shared/ui/dialog'
import { Input } from '@ez/shared/ui/input'
import { Textarea } from '@ez/shared/ui/textarea'
import { useForm as useBaseForm } from '@ez/web/hooks/use-form'
import { useSite } from '@ez/web/hooks/use-site'
import { type ContactFormSchema, createContactFormSchema } from '@ez/web/types/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Comment } from 'react-loader-spinner'
import { toast } from 'sonner'
import { sendEmail } from '../server/send-email'

export function ContactForm({
  isDialog = false,
  subject = '',
  formRef,
  onCloseAction,
  sendButtonLabel,
}: {
  isDialog: boolean
  subject: string
  formRef: string
  sendButtonLabel: string
  onCloseAction: () => void
}) {
  const [focusedField, setFocusedField] = useState<string | null>('name')
  const { data: settings } = useSite()
  const { data: form, isPending } = useBaseForm(formRef)
  const t = useTranslations('DialogContact')
  const locale = useLocale()

  const schema = useMemo(
    () =>
      createContactFormSchema({
        nameRequired: t('nameRequired'),
        emailRequired: t('emailRequired'),
        emailInvalid: t('emailInvalid'),
        phoneRequired: t('phoneRequired'),
        subjectRequired: t('subjectRequired'),
        messageRequired: t('messageRequired'),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
    mode: 'all',
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
      toast.warning(t('emailNotConfigured'))
      return false
    }

    const { data: emailData, error } = await sendEmail(
      formData,
      settings.contact.email,
      settings?.logo,
      locale,
    )

    if (error) {
      toast.warning(t('sendEmailError'))
      return false
    }

    if (emailData?.id) {
      toast.success(t('sendEmailSuccess'))
      reset()
      onCloseAction()
      return true
    }

    toast.warning(t('sendEmailError'))
    return false
  }

  return (
    <form className="w-full">
      <div
        className={cn('grid gap-4 py-4', {
          'justify-center': isPending,
        })}
      >
        {isPending && (
          <Comment
            ariaLabel={t('loadingAria')}
            backgroundColor="var(--tertiary)"
            color="#fff"
            height="80"
            visible={true}
            width="80"
            wrapperStyle={{}}
          />
        )}
        <div className="grid grid-cols-1 items-baseline gap-8 md:grid-cols-2">
          {form?.fields.map(({ name, label, type, isRequired }) => {
            const value = watch(name as keyof ContactFormSchema)
            const hasError = !!errors[name as keyof ContactFormSchema]
            const isFocused = focusedField === name || !!value

            return (
              <motion.div
                animate={hasError ? { x: [0, -5, 5, -5, 0] } : { x: 0 }}
                className="relative col-span-2"
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
                    'pointer-events-none absolute left-5 origin-left font-inter font-semibold text-foreground',
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
                      isRequired ? { required: `${label} ${t('isRequired')}` } : {},
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
                    required={isRequired}
                    rows={20}
                    style={{ resize: 'none' }}
                  />
                ) : (
                  <Input
                    type={type}
                    {...register(
                      name as keyof ContactFormSchema,
                      isRequired ? { required: `${label} ${t('isRequired')}` } : {},
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
                    required={isRequired}
                  />
                )}
                <AnimatePresence>
                  {hasError && (
                    <motion.p
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 font-semibold text-red-500 text-sm"
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
      {isDialog && !isPending && (
        <DialogFooter className="justify-center gap-5">
          <DialogTrigger asChild>
            <Button onClick={onCloseAction} rounded="full" size="lg" theme="tertiary" type="button">
              {t('cancelButton')}
            </Button>
          </DialogTrigger>
          <Button
            disabled={isSubmitting || !isValid}
            onClick={handleSubmit(handleSendForm)}
            rounded="full"
            size="lg"
            theme="default"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> {t('loadingButton')}
              </>
            ) : (
              sendButtonLabel
            )}
          </Button>
        </DialogFooter>
      )}
      {!isDialog && !isPending && (
        <div className="flex flex-row md:justify-end">
          <Button
            className="w-full md:w-[200px]"
            disabled={isSubmitting || !isValid}
            rounded="full"
            shadow
            size="lg"
            type="submit"
            variant="default"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> {t('loadingButton')}
              </>
            ) : (
              t('sendButton')
            )}
          </Button>
        </div>
      )}
    </form>
  )
}
