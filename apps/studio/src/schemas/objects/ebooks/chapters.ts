import config from '@ez/studio/config/editor'
import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'chapters',
  title: 'Chapters',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: config,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
