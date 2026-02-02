export const locales = ['pt'] as const
export const defaultLocale = 'pt' as const
export type Language = (typeof locales)[number]

export const localeOptions = [
  {
    id: 'pt',
    shortLabelKey: 'ptShort',
    flag: '/assets/images/flags/brazil.png',
  },
] as const
