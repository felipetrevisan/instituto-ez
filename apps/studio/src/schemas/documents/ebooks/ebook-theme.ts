import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebookTheme',
  title: 'Ebook Theme',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'color',
    }),
    defineField({
      name: 'primary',
      title: 'Primary Color',
      type: 'color',
    }),
    defineField({
      name: 'secondary',
      title: 'Secondary Color',
      type: 'color',
    }),
  ],
  preview: {
    select: {
      id: '_id',
    },
    prepare({ id }) {
      return {
        title: id,
      }
    },
  },
})
