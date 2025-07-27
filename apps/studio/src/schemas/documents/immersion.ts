import config from '@ez/studio/config/editor'
import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion',
  title: 'Imersão',
  icon: BlockContentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: config,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'ribbon',
      title: 'Ribbon',
      type: 'ribbon',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
