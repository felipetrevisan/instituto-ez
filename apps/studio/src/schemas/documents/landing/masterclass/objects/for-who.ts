import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.for-who',
  title: 'For Who — Masterclass',
  icon: UserIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'localizedArray',
    }),
    defineField({
      name: 'introSecondary',
      title: 'Intro Secondary',
      type: 'localizedArray',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'insights',
      title: 'Insights',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'insight',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'localizedString',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Closing',
      type: 'localizedArray',
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
      return { title: 'For Who' }
    },
  },
})
