import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.catalog',
  title: 'Catalog — Masterclass',
  icon: ImagesIcon,
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
      name: 'featured',
      title: 'Featured Masterclass',
      type: 'object',
      fields: [
        defineField({
          name: 'number',
          title: 'Number',
          type: 'localizedString',
        }),
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
          name: 'pain',
          title: 'Pain',
          type: 'localizedString',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
        defineField({
          name: 'masterclass',
          title: 'Masterclass',
          type: 'reference',
          to: [{ type: 'masterclass' }],
        }),
      ],
    }),
    defineField({
      name: 'items',
      title: 'Masterclasses',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'catalogItem',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'localizedString',
            }),
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
              name: 'pain',
              title: 'Pain',
              type: 'localizedString',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'masterclass',
              title: 'Masterclass',
              type: 'reference',
              to: [{ type: 'masterclass' }],
            }),
            defineField({
              name: 'exclusive',
              title: 'Exclusive',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'exclusiveLabel',
              title: 'Exclusive Label',
              type: 'localizedString',
              hidden: ({ parent }) => !parent?.exclusive,
            }),
            defineField({
              name: 'exclusiveBonus',
              title: 'Exclusive Bonus',
              type: 'localizedText',
              hidden: ({ parent }) => !parent?.exclusive,
            }),
          ],
        },
      ],
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
  ],
  preview: {
    prepare() {
      return { title: 'Catalog' }
    },
  },
})
