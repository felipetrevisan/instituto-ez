import type { IconName } from 'lucide-react/dynamic'

export type Button = {
  _key: string
  visible: boolean
  disabled: boolean
  label: Record<string, string>
  iconPrefix?: IconName
  iconSuffix?: IconName
  type: LinkType
  link: Record<string, { current: string }>
  theme: {
    variant: Variant
    theme: Theme
    rounded: BorderRounded
    size: Size
    effect: ButtonEffect
  }
  params?: string
  externalUrl?: string
}

export enum LinkType {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  DIALOG = 'DIALOG',
  HASH = 'HASH',
}

export enum Theme {
  default = 'default',
  secondary = 'secondary',
  tertiary = 'tertiary',
  accent = 'accent',
  custom = 'custom',
}

export enum Variant {
  default = 'default',
  outline = 'outline',
  ghost = 'ghost',
}

export enum BorderRounded {
  lg = 'lg',
  full = 'full',
  none = 'none',
  xl = 'xl',
  '2xl' = '2xl',
}

export enum Size {
  sm = 'sm',
  default = 'default',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

export enum ButtonEffect {
  none = 'none',
  pulse = 'pulse',
  gradient = 'gradient',
}

export enum PageType {
  page = 'page',
  landing = 'landing',
  ebook = 'ebook',
}
