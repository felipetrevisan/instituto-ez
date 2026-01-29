import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'digital-products.webinar',
  title: 'Catalog / Webinar — Digital Products',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'ebodigital-productsoks',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
  ],
  preview: {
    prepare() {
      return { title: 'Catalog Webinar' }
    },
  },
})
