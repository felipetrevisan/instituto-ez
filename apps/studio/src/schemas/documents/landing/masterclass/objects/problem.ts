import { WarningOutlineIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.problem',
  title: 'Problem — Masterclass',
  icon: WarningOutlineIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'image',
      title: 'Center Image',
      type: 'image',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'problemCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'localizedString',
            }),
            defineField({
              name: 'highlight',
              title: 'Highlight',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer Note',
      type: 'localizedString',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(2).warning('Ideally keep a maximum of 2 CTAs'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Problem' }
    },
  },
})
