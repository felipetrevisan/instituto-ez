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
      label: 'label',
    },
    prepare({ label }) {
      const localized = Array.isArray(label) ? label.find((item) => item?.lang === i18n.base) : null
      return { title: localized?.value || label || 'Sem título' }
    },
  },
})
