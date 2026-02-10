import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.intro',
  title: 'Intro — Immersion',
  icon: BlockContentIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({ name: 'image', type: 'image' }),
  ],
  preview: {
    prepare() {
      return { title: 'Intro' }
    },
  },
})
