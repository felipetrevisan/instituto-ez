import { useDeviceType } from '@ez/shared/hooks/use-media-query'
import { cn } from '@ez/shared/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ez/shared/ui/select'
import { localeOptions } from '@ez/web/config/locale'
import { useApp } from '@ez/web/hooks/use-app'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Menu, X } from 'lucide-react'
import { type HTMLMotionProps, motion } from 'motion/react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import type React from 'react'

const navbarVariants = cva('h-auto w-full p-2', {
  variants: {
    theme: {
      default:
        'md:*:data-[slot=header-container]:container md:*:data-[slot=header-container]:max-w-8xl',
      landing: 'md:*:data-[slot=header-container]:px-20',
    },
    sticky: {
      true: 'fixed start-0 top-0 z-90',
    },
    rounded: {
      none: 'rounded-none',
      full: 'rounded-full',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    theme: 'default',
    sticky: false,
    rounded: 'none',
  },
})

function Root({
  className,
  sticky,
  rounded,
  theme,
  children,
  ...props
}: HTMLMotionProps<'div'> & VariantProps<typeof navbarVariants> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={cn(navbarVariants({ theme, sticky, rounded, className }))}
      initial={false}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between" data-slot="header-container">
        {children}
      </div>
    </motion.div>
  )
}

const navbarBrandVariants = cva('flex items-center', {
  variants: {
    theme: {
      default: '[&_p]:text-primary',
      landing: '[&_p]:text-primary dark:[&_p]:text-accent',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

function Brand({
  className,
  asChild = false,
  theme,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof navbarBrandVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return <Comp className={cn(navbarBrandVariants({ theme }), className)} {...props} />
}

function Toggle({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleMenu, isMenuOpen } = useApp()

  return (
    <button
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-full text-sm xl:hidden',
        className,
      )}
      style={{ color: 'var(--header-button-default-text, var(--foreground))' }}
      {...props}
      onClick={() => toggleMenu()}
    >
      {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </button>
  )
}

function SelectLocale({ onChange }: { onChange: (value: string) => void }) {
  const locale = useLocale()
  const { isMobile } = useDeviceType()
  const t = useTranslations('Languages')

  if (localeOptions.length <= 1) return null

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger className="max-w-max cursor-pointer p-3">
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent className="relative z-150" side={isMobile ? 'left' : 'bottom'}>
        <SelectGroup>
          {localeOptions.map((option) => (
            <SelectItem className="group" key={option.id} value={option.id}>
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  className="size-8"
                  height={32}
                  priority
                  src={option.flag}
                  width={32}
                />
                <span className="group-hover:text-primary">{t(option.shortLabelKey)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { Root, Brand, Toggle, SelectLocale }
