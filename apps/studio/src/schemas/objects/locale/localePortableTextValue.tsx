import config from '@ez/studio/config/editor'
import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

const languageOptions = i18n.languages.map(({ id, title }) => ({
  title,
  value: id,
}))

export default defineType({
  name: 'localePortableTextValue',
  title: 'Localized Portable Text Value',
  type: 'object',
  fields: [
    defineField({
      name: 'lang',
      title: 'Language',
      type: 'string',
      options: { list: languageOptions },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'array',
      of: config,
    }),
  ],
  preview: {
    select: {
      lang: 'lang',
    },
    prepare({ lang }) {
      return {
        title: lang ?? 'Unknown',
      }
    },
  },
})
