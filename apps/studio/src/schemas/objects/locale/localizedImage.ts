import { defineType } from 'sanity'

export default defineType({
  name: 'localizedImage',
  title: 'Localized Image',
  type: 'array',
  of: [{ type: 'localeImageValue' }],
  validation: (Rule) =>
    Rule.custom((items) => {
      if (!items) return true
      const langs = items
        .map((item) => (item && typeof item === 'object' ? (item as { lang?: string }).lang : null))
        .filter(Boolean) as string[]
      const seen = new Set<string>()
      for (const lang of langs) {
        if (seen.has(lang)) return `Language "${lang}" is duplicated.`
        seen.add(lang)
      }
      return true
    }),
})
