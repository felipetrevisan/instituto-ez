import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

export default defineType({
  name: 'localizedUrl',
  title: 'Localized URL',
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
      type: 'url',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) =>
        Rule.required()
          .warning('This field must not be empty.')
          .uri({
            scheme: ['http', 'https'],
          })
          .warning('This field must be a valid url.'),
    }),
  ),
})
