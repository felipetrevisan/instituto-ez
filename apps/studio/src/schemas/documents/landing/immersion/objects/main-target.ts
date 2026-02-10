import { EyeOpenIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.main-target',
  title: 'Main Target — Immersion',
  icon: EyeOpenIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({
      name: 'profile',
      type: 'array',
      of: [{ type: 'immersion.main-target.item' }],
    }),
    defineField({ name: 'footer', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Main Target' }
    },
  },
})
