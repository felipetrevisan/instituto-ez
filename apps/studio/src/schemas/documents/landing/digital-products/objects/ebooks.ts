import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'digital-products.ebooks',
  title: 'Catalog / Ebooks — Digital Products',
  icon: ImagesIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'digital-products',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Catalog Ebooks' }
    },
  },
})
