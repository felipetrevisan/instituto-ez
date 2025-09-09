import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

export default defineType({
  name: 'localizedImage',
  title: 'Localized Image',
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
      type: 'image',
      fieldset: lang.isDefault ? undefined : 'translations',
    }),
  ),
})
