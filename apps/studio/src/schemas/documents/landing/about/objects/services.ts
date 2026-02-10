import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about.services',
  title: 'Services — About',
  icon: CogIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'about',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'about.services.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services' }
    },
  },
})
