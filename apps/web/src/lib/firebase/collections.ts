/** Nomes das coleções/documentos no Firestore — compartilhados entre painel e servidor. */
export const collections = {
  ebooks: 'ebooks',
  testimonials: 'testimonials',
  settings: 'settings',
} as const

export const settingsDocs = {
  payments: 'payments',
  site: 'site',
} as const
