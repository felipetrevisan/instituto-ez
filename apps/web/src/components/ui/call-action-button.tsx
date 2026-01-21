import { Button, type buttonVariants } from '@ez/shared/ui'
import { Icon } from '@ez/web/components/ui/icon'
import type { VariantProps } from 'class-variance-authority'
import type { IconName } from 'lucide-react/dynamic'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type ButtonVariants = VariantProps<typeof buttonVariants>

export type CallActionProps = {
  className?: string
  base: ButtonVariants['base']
  link?: { current?: string }
  variant?: ButtonVariants['variant']
  theme?: ButtonVariants['theme']
  size?: ButtonVariants['size']
  rounded?: ButtonVariants['rounded']
  fullWidth?: ButtonVariants['fullWidth']
  effect?: ButtonVariants['effect']
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

export const CallAction = ({
  className,
  link,
  label,
  action,
  icon,
  rounded,
  variant,
  size,
  theme,
  effect,
  base,
  onClick,
}: CallActionProps) => {
  const locale = useLocale()
  const path = link?.current ? `/${locale}/${link.current}` : `/${locale}`

  const ButtonContent = (
    <Button
      base={base}
      className={className}
      effect={effect}
      onClick={action === 'button' ? onClick : undefined}
      rounded={rounded}
      size={size}
      theme={theme}
      variant={variant}
    >
      {icon?.prefix?.name && <Icon className={icon.prefix.className} name={icon.prefix.name} />}
      {label}
      {icon?.suffix?.name && <Icon className={icon.suffix.className} name={icon.suffix.name} />}
    </Button>
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
