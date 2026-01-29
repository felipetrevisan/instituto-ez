import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'webnario.content.item',
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
      title: `title.${i18n.base}`,
    },
    prepare({ title }) {
      return { title }
    },
  },
})
