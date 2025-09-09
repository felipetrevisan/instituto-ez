// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
const supportedLanguages = [
  { id: 'pt', title: 'Portuguese', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Spanish' },
]

export const baseLanguage = supportedLanguages.find((l) => l.isDefault)

const i18n = {
  languages: supportedLanguages,
  base: baseLanguage?.id,
}

const googleTranslateLanguages = supportedLanguages.map(({ id, title }) => ({ id, title }))

export { i18n, googleTranslateLanguages }
