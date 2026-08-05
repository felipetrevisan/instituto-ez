import { defineRouting } from 'next-intl/routing'

/**
 * Separate routing config for the /redesign subtree only. The main site
 * (`./routing.ts`) uses `localePrefix: 'as-needed'`, which hides the prefix
 * for the default locale (pt) — e.g. `/home` instead of `/pt/home`. That's
 * fine in production, but the bare (unprefixed) path is unreliable in dev
 * (Turbopack occasionally 404s it), which made every pt-locale link inside
 * /redesign flaky. Redesign links always carry an explicit locale prefix
 * instead, sidestepping that entirely — without changing the main site's
 * (already-live) URL scheme.
 */
export const redesignRouting = defineRouting({
  locales: ['pt', 'en', 'es'],
  defaultLocale: 'pt',
  localePrefix: 'always',
  localeDetection: false,

  pathnames: {
    '/redesign': '/redesign',
    '/redesign/sobre': '/redesign/sobre',
    '/redesign/mentoria': '/redesign/mentoria',
    '/redesign/imersao': '/redesign/imersao',
    '/redesign/atendimento': '/redesign/atendimento',
    '/redesign/matematizador': '/redesign/matematizador',
    '/redesign/desenvolvimento-humano': '/redesign/desenvolvimento-humano',
  },
})
