import { EyeOpenIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mentoring.expectedresults',
  title: 'Expected Results — Mentoring',
  icon: EyeOpenIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mentoring',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'mentoring.expectedresults.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Expected Results' }
    },
  },
})
