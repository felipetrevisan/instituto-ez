import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'masterclass.format.item',
  title: 'Format Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'localizedString',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
  ],
  preview: {
    select: {
      title: `label.${i18n.base}`,
    },
    prepare({ title }) {
      return { title }
    },
  },
})
