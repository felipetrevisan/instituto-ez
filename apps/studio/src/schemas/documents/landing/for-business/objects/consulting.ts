import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.consulting',
  title: 'Consulting — For Business',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'for-business',
  fields: [
    defineField({ name: 'heading', type: 'localizedString' }),
    defineField({ name: 'subheading', type: 'localizedText' }),
    defineField({ name: 'footer', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'forbusiness.consulting.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'Call Action',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Consulting' }
    },
  },
})
