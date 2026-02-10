import { TagsIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebooks.category',
  title: 'Ebooks Category',
  icon: TagsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
