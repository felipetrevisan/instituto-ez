import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'cover',
      title: 'Chapter Cover',
      type: 'image',
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [{ type: 'chapters' }],
    }),
  ],
})
