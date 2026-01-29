import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

export default defineType({
  name: 'localizedSlug',
  title: 'Localized Slug',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'slug',
      fieldset: lang.isDefault ? undefined : 'translations',
      options: {
        // biome-ignore lint/suspicious/noExplicitAny: false positive
        source: (doc: any) => {
          return doc?.page?.title?.[lang.id] || doc?.title?.[lang.id]
        },
      },
    }),
  ),
})
