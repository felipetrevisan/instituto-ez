export type Button = {
  visible: boolean
  disabled: boolean
  label: {
    [key: string]: string
  }
  type: LinkType
  link: {
    [key: string]: {
      current: string
    }
  }
  params?: string
  externalUrl?: string
}

export enum LinkType {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
  HASH = 'HASH',
}

export enum Theme {
  default = 'default',
  secondary = 'secondary',
  tertiary = 'tertiary',
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

export enum PageType {
  page = 'page',
  landing = 'landing',
  ebook = 'ebook',
}
