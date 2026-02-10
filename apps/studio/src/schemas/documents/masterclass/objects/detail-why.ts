import { BulbOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailWhy',
  title: 'Masterclass Why',
  icon: BulbOutlineIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'portableText',
    }),
    defineField({
      name: 'items',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          name: 'highlight',
          title: 'Highlight',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return { title: title ?? 'Highlight' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'closing',
      title: 'Closing',
      type: 'portableText',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Why This Class' }
    },
  },
})
