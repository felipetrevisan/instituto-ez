'use client'

import { Dialog } from '@ez/web/components/ui/dialog'
import { useContactDialog } from '@ez/web/hooks/use-contact-dialog'
import { useSiteSettings } from '@ez/web/hooks/use-site-settings'
import { cn } from '@ez/web/lib/utils'
import { sendEmail } from '@ez/web/server/send-email'
import { type ContactFormSchema, createContactFormSchema } from '@ez/web/types/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2, Mail, Phone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { type ReactNode, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

/** Botão de chamada que abre o formulário de contato já com o assunto preenchido. */
export function ContactButton({
  children,
  subject,
  variant = 'primary',
  className,
}: {
  children: ReactNode
  subject?: string
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const { open } = useContactDialog()
  const label = typeof children === 'string' ? children : undefined

  return (
    <button
      className={cn(variant === 'primary' ? 'ez-btn' : 'ez-btn-ghost', className)}
      onClick={() => open(subject ?? label)}
      type="button"
    >
      {children}
      {variant === 'primary' && <ArrowRight aria-hidden className="size-4 shrink-0" />}
    </button>
  )
}

const fieldClass =
  'peer w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pt-6 pb-2 text-[15px] text-white outline-none transition focus:border-[color:var(--accent)] focus:bg-white/[0.07] read-only:text-white/70'
const labelClass =
  'pointer-events-none absolute top-2 left-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45 peer-focus:text-[color:var(--accent)]'

function ContactForm({ subject, onDone }: { subject: string; onDone: () => void }) {
  const t = useTranslations('DialogContact')
  const locale = useLocale()
  const site = useSiteSettings()

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
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({ resolver: zodResolver(schema), mode: 'onTouched' })

  useEffect(() => {
    if (subject) setValue('subject', subject, { shouldValidate: true })
  }, [subject, setValue])

  const onSubmit = async (formData: ContactFormSchema) => {
    const { data, error } = await sendEmail(formData, locale)
    if (error || !data?.id) {
      toast.warning(t('sendEmailError'))
      return
    }
    toast.success(t('sendEmailSuccess'))
    reset()
    onDone()
  }

  const fields = [
    { name: 'name', label: t('nameLabel'), type: 'text', autoComplete: 'name' },
    { name: 'email', label: t('emailLabel'), type: 'email', autoComplete: 'email' },
    { name: 'phone', label: t('phoneLabel'), type: 'tel', autoComplete: 'tel' },
    { name: 'subject', label: t('subjectLabel'), type: 'text', autoComplete: 'off' },
  ] as const

  return (
    <form className="grid gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            className={cn('relative', field.name === 'subject' && 'sm:col-span-2')}
            key={field.name}
          >
            <input
              autoComplete={field.autoComplete}
              className={fieldClass}
              id={`contact-${field.name}`}
              readOnly={field.name === 'subject' && Boolean(subject)}
              type={field.type}
              {...register(field.name)}
              aria-invalid={Boolean(errors[field.name])}
            />
            <label className={labelClass} htmlFor={`contact-${field.name}`}>
              {field.label}
            </label>
            {errors[field.name] && (
              <p className="mt-1.5 text-rose-300 text-xs">{errors[field.name]?.message}</p>
            )}
          </div>
        ))}
      </div>
      <div className="relative">
        <textarea
          className={cn(fieldClass, 'min-h-36 resize-none')}
          id="contact-message"
          {...register('message')}
          aria-invalid={Boolean(errors.message)}
        />
        <label className={labelClass} htmlFor="contact-message">
          {t('messageLabel')}
        </label>
        {errors.message && <p className="mt-1.5 text-rose-300 text-xs">{errors.message.message}</p>}
      </div>
      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 text-sm text-white/55">
          <a
            className="ez-link inline-flex items-center gap-2"
            href={`mailto:${site.contact.email}`}
          >
            <Mail aria-hidden className="size-4" /> {site.contact.email}
          </a>
          {site.contact.phone && (
            <a className="ez-link inline-flex items-center gap-2" href={site.contact.phoneHref}>
              <Phone aria-hidden className="size-4" /> {site.contact.phone}
            </a>
          )}
        </div>
        <button className="ez-btn" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> {t('loadingButton')}
            </>
          ) : (
            t('sendButton')
          )}
        </button>
      </div>
    </form>
  )
}

export function ContactDialog() {
  const { isOpen, setIsOpen, subject } = useContactDialog()
  const site = useSiteSettings()
  const t = useTranslations('DialogContact')

  return (
    <Dialog
      description={site.description}
      onOpenChange={setIsOpen}
      open={isOpen}
      title={t('title')}
    >
      <div className="ez-theme ez-glass ez-glass-strong max-h-[92vh] overflow-y-auto rounded-[28px] bg-[#0b1024]/95 p-6 text-white sm:p-9">
        <div aria-hidden className="mb-2 flex flex-col gap-3 pr-10">
          <span className="ez-eyebrow">{site.name}</span>
          <p className="ez-display text-3xl text-white">{t('title')}</p>
          <p className="text-white/60">{site.description}</p>
        </div>
        <ContactForm onDone={() => setIsOpen(false)} subject={subject} />
      </div>
    </Dialog>
  )
}
