import { LeaveIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: LeaveIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      initialValue: 'none',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Icon', value: 'icon' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
      hidden: ({ parent }) => parent?.type !== 'icon',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
  ],
})
