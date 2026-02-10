import { InfoFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.faq',
  title: 'FAQ — Immersion',
  icon: InfoFilledIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({
      name: 'questions',
      type: 'array',
      of: [{ type: 'immersion.faq.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ' }
    },
  },
})
