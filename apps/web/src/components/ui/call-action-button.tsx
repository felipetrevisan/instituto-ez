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

  return (
    <CallActionButton
      action={button.type === LinkType.DIALOG ? 'button' : 'link'}
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
      label={button.label[locale]}
      link={button.type === LinkType.DIALOG ? undefined : button.link?.[locale]}
      onClick={
        button.type === LinkType.DIALOG && button.dialog.type === 'CONTACT'
          ? () => handleOpenContactDialog(button.dialog.subject)
          : undefined
      }
      size={button.theme.size}
      theme={button.theme.theme}
      variant={button.theme.variant}
    />
  )
}
