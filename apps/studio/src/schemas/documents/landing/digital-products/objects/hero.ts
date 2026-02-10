import { ImageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'digital-products.hero',
  title: 'Hero — Digital Products',
  icon: ImageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'digital-products',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({ name: 'footer', type: 'localizedArray' }),
    defineField({ name: 'image', type: 'image' }),
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
