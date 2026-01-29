import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebooksOverview',
  title: 'Overview',
  icon: BlockContentIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
