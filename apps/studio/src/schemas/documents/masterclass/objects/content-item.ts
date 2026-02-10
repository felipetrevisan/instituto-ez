import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'masterclass.content.item',
  title: 'Content Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedArray',
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      description: 'Optional info like duration or format.',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return { title: localized?.value || title || 'Sem título' }
    },
  },
})
