import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Value Type',
      initialValue: 'string',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'string' },
          { title: 'Number', value: 'number' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'prefix',
      title: 'Text Prefix',
      type: 'string',
    }),
    defineField({
      name: 'suffix',
      title: 'Text Suffix',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      hidden: ({ parent }) => parent?.type !== 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      hidden: ({ parent }) => parent?.type !== 'number',
    }),
    defineField({
      name: 'media',
      title: 'Media Type',
      type: 'media',
    }),
  ],
})
