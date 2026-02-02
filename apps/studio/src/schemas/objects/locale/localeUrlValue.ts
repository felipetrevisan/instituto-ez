import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

const languageOptions = i18n.languages.map(({ id, title }) => ({
  title,
  value: id,
}))

export default defineType({
  name: 'localeUrlValue',
  title: 'Localized URL Value',
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
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .warning('This field must not be empty.')
          .uri({
            scheme: ['http', 'https'],
          })
          .warning('This field must be a valid url.'),
    }),
  ],
  preview: {
    select: {
      lang: 'lang',
      value: 'value',
    },
    prepare({ lang, value }) {
      return {
        title: lang ?? 'Unknown',
        subtitle: value,
      }
    },
  },
})
