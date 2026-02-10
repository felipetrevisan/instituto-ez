import { useShared } from '@ez/shared/hooks/use-shared'
import { type Button as ButtonType, LinkType } from '@ez/shared/types'
import { Button, type buttonVariants } from '@ez/shared/ui'
import { Icon } from '@ez/web/components/ui/icon'
import type { VariantProps } from 'class-variance-authority'
import type { IconName } from 'lucide-react/dynamic'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type ButtonVariants = VariantProps<typeof buttonVariants>

type LocalizedLabel = { lang?: string; value?: string }

const resolveLabel = (label: unknown, locale: string) => {
  if (!label) return ''
  if (typeof label === 'string') return label

  if (Array.isArray(label)) {
    const match =
      label.find((item: LocalizedLabel) => item?.lang === locale) ??
      label.find((item: LocalizedLabel) => item?.lang === 'pt') ??
      label.find((item: LocalizedLabel) => item?.lang === 'en') ??
      label[0]
    return typeof match?.value === 'string' ? match.value : ''
  }

  if (typeof label === 'object') {
    const record = label as Record<string, unknown>
    const direct = record[locale]
    if (typeof direct === 'string') return direct
    if (direct && typeof direct === 'object') {
      const directRecord = direct as Record<string, unknown>
      if (typeof directRecord.value === 'string') return directRecord.value
      if (typeof directRecord.current === 'string') return directRecord.current
    }

    const pt = record.pt
    if (typeof pt === 'string') return pt
    if (pt && typeof pt === 'object') {
      const ptRecord = pt as Record<string, unknown>
      if (typeof ptRecord.value === 'string') return ptRecord.value
      if (typeof ptRecord.current === 'string') return ptRecord.current
    }

    const en = record.en
    if (typeof en === 'string') return en
    if (en && typeof en === 'object') {
      const enRecord = en as Record<string, unknown>
      if (typeof enRecord.value === 'string') return enRecord.value
      if (typeof enRecord.current === 'string') return enRecord.current
    }

    if (typeof record.value === 'string') return record.value
    if (typeof record.current === 'string') return record.current

    const anyValue = Object.values(record).find((value) => typeof value === 'string')
    return typeof anyValue === 'string' ? anyValue : ''
  }

  return ''
}

export type CallActionButtonProps = {
  className?: string
  base: ButtonVariants['base']
  link?: { current?: string }
  variant?: ButtonVariants['variant']
  theme?: ButtonVariants['theme']
  size?: ButtonVariants['size']
  fullWidth?: ButtonVariants['fullWidth']
  label: string
  action: 'link' | 'button'
  onClick?: () => void
  icon?: {
    prefix?: {
      name: IconName
      className?: string
    }
    suffix?: {
      name: IconName
      className?: string
    }
  }
}

export const CallActionButton = ({
  className,
  link,
  label,
  action,
  icon,
  variant,
  size,
  theme,
  base,
  onClick,
}: CallActionButtonProps) => {
  const locale = useLocale()
  const path = link?.current ? `/${locale}/${link.current}` : `/${locale}`

  const ButtonContent = (
    <motion.div
      className="inline-flex w-full md:w-auto"
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        base={base}
        className={className}
        onClick={action === 'button' ? onClick : undefined}
        size={size}
        theme={theme}
        variant={variant}
      >
        {icon?.prefix?.name && <Icon className={icon.prefix.className} name={icon.prefix.name} />}
        {label}
        {icon?.suffix?.name && <Icon className={icon.suffix.className} name={icon.suffix.name} />}
      </Button>
    </motion.div>
  )

  if (action === 'link') {
    return (
      <Link className="inline-block w-full md:w-auto" href={path}>
        {ButtonContent}
      </Link>
    )
  }

  return ButtonContent
}

export type CallActionProps = {
  className?: string
  base: ButtonVariants['base']
  button: ButtonType
}

export const CallAction = ({ className, base, button }: CallActionProps) => {
  const locale = useLocale()
  const { handleOpenContactDialog } = useShared()
  const isDialog = button.type === LinkType.DIALOG
  const isScroll = button.type === LinkType.HASH
  const label = resolveLabel(button.label, locale)
  const buttonTheme = button.theme ?? { size: 'default', theme: 'default', variant: 'default' }

  const handleScrollTo = (target?: string) => {
    const id = target?.replace(/^#/, '')
    if (!id) return
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <CallActionButton
      action={isDialog || isScroll ? 'button' : 'link'}
      base={base ?? 'default'}
      className={className}
      icon={{
        prefix: {
          className: 'size-5',
          name: button.iconPrefix as IconName,
        },
        suffix: {
          className: 'ml-2 size-5 transition-transform group-hover:translate-x-1',
          name: button.iconSuffix as IconName,
        },
      }}
      key={button._key}
      label={label}
      link={isDialog || isScroll ? undefined : button.link?.[locale]}
      onClick={
        isDialog && button.dialog?.type === 'CONTACT'
          ? () => handleOpenContactDialog(button.dialog?.subject)
          : isScroll
            ? () => handleScrollTo(button.scrollTo)
            : undefined
      }
      size={buttonTheme.size}
      theme={buttonTheme.theme}
      variant={buttonTheme.variant}
    />
  )
}
