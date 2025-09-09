import config from '@ez/studio/config/editor'
import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

export default defineType({
  name: 'localizedArray',
  title: 'Localized Array',
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
      type: 'array',
      fieldset: lang.isDefault ? undefined : 'translations',
      of: config,
    }),
  ),
})
