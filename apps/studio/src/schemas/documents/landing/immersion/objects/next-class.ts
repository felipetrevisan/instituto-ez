import { ListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.next-class',
  title: 'Next Class — Immersion',
  icon: ListIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{ type: 'immersion.next-class.item' }],
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
      return { title: 'Next Class' }
    },
  },
})
