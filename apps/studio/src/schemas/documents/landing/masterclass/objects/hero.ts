import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.hero',
  title: 'Hero — Masterclass',
  icon: PlayIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
  fields: [
    defineField({
      name: 'headingPrimary',
      title: 'Heading Line 1',
      type: 'localizedArray',
    }),
    defineField({
      name: 'headingSecondary',
      title: 'Heading Line 2',
      type: 'localizedArray',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'localizedString',
        }),
        defineField({
          name: 'duration',
          title: 'Duration',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'localizedString',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return { title: title ?? 'Badge' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3).warning('Ideally keep a maximum of 3 CTAs'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Hero' }
    },
  },
})
