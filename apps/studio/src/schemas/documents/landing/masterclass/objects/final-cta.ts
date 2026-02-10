import { SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.final-cta',
  title: 'Final CTA — Masterclass',
  icon: SparklesIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'ctaOptions',
      title: 'CTA Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'option',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localizedString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedString',
            }),
            defineField({
              name: 'badgeLabel',
              title: 'Badge Label',
              type: 'localizedString',
            }),
            defineField({
              name: 'benefits',
              title: 'Benefits',
              type: 'array',
              of: [{ type: 'localizedString' }],
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'featured',
              title: 'Featured',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'cta',
              title: 'CTA',
              type: 'button',
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
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [
        {
          name: 'trustBadge',
          title: 'Trust Badge',
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
              type: 'localizedString',
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return { title: title ?? 'Trust Badge' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Final CTA' }
    },
  },
})
