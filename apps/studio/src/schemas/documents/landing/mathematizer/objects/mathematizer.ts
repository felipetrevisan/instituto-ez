import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mathematizer.mathematizer',
  title: 'Mathematizer — Mathematizer',
  icon: BlockContentIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mathematizer',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'mathematizer.mathematizer.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mathematizer' }
    },
  },
})
