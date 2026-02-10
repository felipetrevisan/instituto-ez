import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.instructor',
  title: 'Instructor — Immersion',
  icon: UserIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({ name: 'footer', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'immersion.instructor.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Instructor' }
    },
  },
})
