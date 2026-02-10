import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailOffer',
  title: 'Masterclass Offer',
  icon: TagIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        defineField({
          name: 'original',
          title: 'Original Price',
          type: 'string',
        }),
        defineField({
          name: 'prefix',
          title: 'Prefix',
          type: 'string',
        }),
        defineField({
          name: 'current',
          title: 'Current Price',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'button',
    }),
    defineField({
      name: 'sealsHeading',
      title: 'Seals Heading',
      type: 'string',
    }),
    defineField({
      name: 'seals',
      title: 'Seals',
      type: 'array',
      of: [
        {
          name: 'seal',
          title: 'Seal',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'label',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title ?? 'Seal',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Special Offer' }
    },
  },
})
