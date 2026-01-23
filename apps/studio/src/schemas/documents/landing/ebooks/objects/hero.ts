import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ebooks.hero',
  title: 'Hero — Ebooks',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'ebooks',
  fields: [defineField({ name: 'image', type: 'image' })],
  preview: {
    prepare() {
      return { title: 'Hero' }
    },
  },
})
