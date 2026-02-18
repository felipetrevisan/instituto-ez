import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.digitalproducts.card',
  title: 'Digital Products — Card - Home',
  icon: ImageIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Badge Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'badgeIcon',
      title: 'Badge Icon',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      type: 'localizedText',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
        media,
      }
    },
  },
})
