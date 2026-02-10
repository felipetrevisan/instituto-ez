import { InfoFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mathematizer.whatis',
  title: 'What Is — Mathematizer',
  icon: InfoFilledIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mathematizer',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({ name: 'subtext', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'What Is' }
    },
  },
})
