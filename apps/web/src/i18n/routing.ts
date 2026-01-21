import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',

  pathnames: {
    '/': {
      pt: '/home',
      en: '/home',
      es: '/home',
    },
  },
})
