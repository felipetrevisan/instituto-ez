import type { IconName } from 'lucide-react/dynamic'

export type Button = {
  _key: string
  label: Record<string, string>
  iconPrefix?: IconName
  iconSuffix?: IconName
  type: LinkType
  link: Record<string, { current: string }>
  dialog: {
    type: 'CONTACT'
    subject?: string
  }
  theme: {
    variant: Variant
    theme: Theme
    size: Size
  }
  externalUrl?: string
  scrollTo?: string
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
  cyan = 'cyan',
  coral = 'coral',
  navy = 'navy',
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

export enum PageType {
  page = 'page',
  landing = 'landing',
  ebook = 'ebook',
}
