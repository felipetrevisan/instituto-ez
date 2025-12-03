import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.lectures',
  title: 'Lectures — For Business',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'for-business',
  fields: [
    defineField({ name: 'heading', type: 'localizedString' }),
    defineField({ name: 'subheading', type: 'localizedText' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'forbusiness.lectures.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Lectures' }
    },
  },
})
