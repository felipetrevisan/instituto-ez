import { RocketIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailFinal',
  title: 'Masterclass Final Section',
  icon: RocketIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'button',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [
        {
          name: 'detail',
          title: 'Detail',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return { title: title ?? 'Detail' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Final Section' }
    },
  },
})
