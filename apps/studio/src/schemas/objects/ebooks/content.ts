import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebooksIndex',
  title: 'Index',
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
      type: 'localizedArray',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'video_title',
      title: 'Video Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'localizedUrl',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
