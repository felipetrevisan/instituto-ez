import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.courses',
  title: 'Courses — For Business',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'for-business',
  fields: [
    defineField({ name: 'heading', type: 'localizedString' }),
    defineField({ name: 'subheading', type: 'localizedText' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'forbusiness.courses.items' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Courses' }
    },
  },
})
