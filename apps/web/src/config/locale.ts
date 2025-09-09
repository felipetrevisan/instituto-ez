export const locales = ['pt', 'en', 'en'] as const
export const defaultLocale = 'pt' as const
export type Language = (typeof locales)[number]
