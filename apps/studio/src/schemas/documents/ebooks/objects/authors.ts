import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'authors',
  title: 'Ebook Authors',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'author' }],
    }),
  ],
})
