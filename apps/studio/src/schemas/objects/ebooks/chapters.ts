import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'chapters',
  title: 'Chapters',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'media',
      title: 'Media Type',
      type: 'media',
    }),
  ],
})
