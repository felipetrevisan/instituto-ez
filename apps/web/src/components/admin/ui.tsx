'use client'

import { cn } from '@ez/web/lib/utils'
import { Loader2 } from 'lucide-react'
import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
  useEffect,
  useId,
  useState,
} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
}

const buttonVariants = {
  primary:
    'bg-[#f2b544] text-[#1a1203] hover:bg-[#f6c566] shadow-[0_8px_24px_-10px_rgba(242,181,68,0.7)]',
  secondary: 'border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]',
  ghost: 'text-white/70 hover:bg-white/[0.06] hover:text-white',
  danger: 'border border-rose-400/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20',
}

/** Classes do botão — use também em <Link>/<a> para não aninhar elementos interativos. */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
} = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition focus-visible:outline-2 focus-visible:outline-[#f2b544] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-sm',
    buttonVariants[variant],
    className,
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClass({ variant, size, className })}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {children}
    </button>
  )
}

const control =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#f2b544]/70 focus:bg-white/[0.05] aria-[invalid=true]:border-rose-400/70'

export function Input({
  className,
  ref,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }) {
  return <input className={cn(control, 'h-11', className)} ref={ref} {...props} />
}

export function Textarea({
  className,
  ref,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: Ref<HTMLTextAreaElement> }) {
  return (
    <textarea
      className={cn(control, 'min-h-28 py-3 leading-relaxed', className)}
      ref={ref}
      {...props}
    />
  )
}

export function Select({
  className,
  ref,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { ref?: Ref<HTMLSelectElement> }) {
  return (
    <select
      className={cn(control, 'h-11 [&>option]:bg-[#0e1322]', className)}
      ref={ref}
      {...props}
    />
  )
}

/** Rótulo + controle + dica/erro. O controle recebe o id via render prop. */
export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string
  hint?: ReactNode
  error?: string
  children: (id: string) => ReactNode
  className?: string
}) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="font-medium text-sm text-white/85" htmlFor={id}>
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-rose-300 text-xs" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="text-white/40 text-xs leading-relaxed">{hint}</p>
      )}
    </div>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn('rounded-2xl border border-white/[0.07] bg-[#0c1120] p-5 sm:p-6', className)}
    >
      {children}
    </section>
  )
}

export function CardTitle({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <header className="mb-5">
      <h2 className="font-semibold text-base text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-white/50 leading-relaxed">{description}</p>}
    </header>
  )
}

export function Switch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description?: string
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block font-medium text-sm text-white">{label}</span>
        {description && <span className="mt-0.5 block text-white/45 text-xs">{description}</span>}
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          aria-checked={checked}
          checked={checked}
          className="peer sr-only"
          onChange={(event) => onChange(event.target.checked)}
          role="switch"
          type="checkbox"
        />
        <span className="h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-[#f2b544] peer-focus-visible:outline-2 peer-focus-visible:outline-[#f2b544] peer-focus-visible:outline-offset-2" />
        <span className="absolute top-1 left-1 size-4 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  )
}

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent'
}) {
  const tones = {
    neutral: 'bg-white/[0.07] text-white/70',
    success: 'bg-emerald-400/15 text-emerald-300',
    warning: 'bg-amber-400/15 text-amber-200',
    danger: 'bg-rose-400/15 text-rose-300',
    accent: 'bg-[#f2b544]/15 text-[#f6c566]',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium text-xs',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-semibold text-2xl text-white tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-white/50">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Spinner({ label = 'Carregando…' }: { label?: string }) {
  return (
    <output className="flex items-center justify-center gap-3 py-16 text-sm text-white/50">
      <Loader2 aria-hidden className="size-5 animate-spin text-[#f2b544]" />
      {label}
    </output>
  )
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 border-dashed px-6 py-16 text-center">
      {icon && <div className="mb-4 text-[#f2b544]">{icon}</div>}
      <p className="font-medium text-white">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-white/50">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/** Exclusão em dois cliques, sem modal: o segundo clique confirma. */
export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel = 'Confirmar exclusão',
  size = 'sm',
}: {
  onConfirm: () => Promise<void> | void
  children: ReactNode
  confirmLabel?: string
  size?: 'sm' | 'md'
}) {
  const [armed, setArmed] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!armed) return
    const timer = window.setTimeout(() => setArmed(false), 4000)
    return () => window.clearTimeout(timer)
  }, [armed])

  return (
    <Button
      loading={busy}
      onClick={async () => {
        if (!armed) return setArmed(true)
        setBusy(true)
        try {
          await onConfirm()
        } finally {
          setBusy(false)
          setArmed(false)
        }
      }}
      size={size}
      variant={armed ? 'danger' : 'ghost'}
    >
      {armed ? confirmLabel : children}
    </Button>
  )
}
