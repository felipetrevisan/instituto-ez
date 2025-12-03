import { InfoFilledIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  icon: InfoFilledIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'string' },
          { title: 'Number', value: 'number' },
          { title: 'Star', value: 'star' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'prefix',
      title: 'Badge Prefix',
      type: 'localizedString',
      hidden: ({ parent }) => parent?.type === 'star',
    }),
    defineField({
      name: 'suffix',
      title: 'Badge Suffix',
      type: 'localizedString',
      hidden: ({ parent }) => parent?.type === 'star',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'localizedString',
      hidden: ({ parent }) => parent?.type !== 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      hidden: ({ parent }) => parent?.type === 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
      hidden: ({ parent }) => parent?.type === 'star',
    }),
  ],
})
