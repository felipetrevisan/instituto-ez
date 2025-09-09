import { type Button, LinkType } from '@ez/shared/types/global'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLink(button: Button, locale: string) {
  if (!button.link?.[locale].current) return false

  return !isExternalLink(button)
    ? `/${button.link?.[locale].current}${button.params ?? ''}`
    : button.externalUrl
}

export function isExternalLink(button: Button) {
  return button.type === LinkType.EXTERNAL
}
