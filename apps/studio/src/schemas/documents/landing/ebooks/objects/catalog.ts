import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebooks.catalog',
  title: 'Catalog — Ebooks',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'ebooks',
  fields: [defineField({ name: 'content', type: 'localizedArray' })],
  preview: {
    prepare() {
      return { title: 'Catalog' }
    },
  },
})
