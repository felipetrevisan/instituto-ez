import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/sobre': {
      'en': '/about',
    },
    '/atendimentos': {
      'en': '/services',
    },
    '/imersao': {
      'en': '/immersion',
    },
    '/workshops': {
      'en': '/workshops',
    },
    '/mentoria': {
      'en': '/advanced-mentory',
    },
    '/ebooks': {
      'en': '/ebooks',
    },
    '/contato': {
      'en': '/contact',
    },
  },
})
