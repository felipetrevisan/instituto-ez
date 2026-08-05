import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  localeDetection: false,

  pathnames: {
    '/': {
      pt: '/home',
      en: '/home',
      es: '/home',
    },
    '/redesign': '/redesign',
    '/redesign/sobre': '/redesign/sobre',
    '/redesign/mentoria': '/redesign/mentoria',
    '/redesign/imersao': '/redesign/imersao',
    '/redesign/atendimento': '/redesign/atendimento',
    '/redesign/matematizador': '/redesign/matematizador',
    '/redesign/desenvolvimento-humano': '/redesign/desenvolvimento-humano',
  },
})
