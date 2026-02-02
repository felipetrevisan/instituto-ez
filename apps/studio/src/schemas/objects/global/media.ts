import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'icon',
      options: {
        list: [
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
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
  ],
})
