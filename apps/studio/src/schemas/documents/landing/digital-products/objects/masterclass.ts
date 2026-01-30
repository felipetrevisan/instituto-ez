import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'digital-products.masterclass',
  title: 'Catalog / Masterclass — Digital Products',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'digital-products',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Catalog Masterclass' }
    },
  },
})
