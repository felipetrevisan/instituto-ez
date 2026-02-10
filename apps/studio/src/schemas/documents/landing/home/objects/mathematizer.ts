import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.mathematizer',
  title: 'Mathematizer — Home',
  icon: BlockContentIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'home',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({ name: 'image', type: 'image' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'home.mathematizer.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3).warning('Ideally keep a maximum of 3 CTAs'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mathematizer' }
    },
  },
})
