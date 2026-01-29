import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'webnario.forWho.item',
  title: 'For Who Item',
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
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
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
