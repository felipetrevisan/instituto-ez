import { InfoFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mathematizer.benefits',
  title: 'Benefits — Mathematizer',
  icon: InfoFilledIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mathematizer',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'mathematizer.benefits.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Benefits' }
    },
  },
})
