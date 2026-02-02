import { defineField, defineType } from 'sanity'
import { i18n } from './locales'

const languageOptions = i18n.languages.map(({ id, title }) => ({
  title,
  value: id,
}))

export default defineType({
  name: 'localeImageValue',
  title: 'Localized Image Value',
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
      type: 'image',
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
        media: value,
      }
    },
  },
})
