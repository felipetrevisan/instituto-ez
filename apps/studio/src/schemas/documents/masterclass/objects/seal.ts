import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { i18n } from '../../../objects/locale/locales'

export default defineType({
  name: 'seal',
  title: 'Seals',
  icon: ImageIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'seals',
      title: 'Seals',
      type: 'localizedImage',
    }),
  ],
  preview: {
    select: {
      image: `seals.${i18n.base}`,
    },
    prepare({ image }) {
      return {
        media: image,
        title: 'Seal',
      }
    },
  },
})
