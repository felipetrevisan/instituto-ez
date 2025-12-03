import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.testimonial',
  title: 'Testimonial — For Business',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'for-business',
  fields: [
    defineField({ name: 'heading', type: 'localizedString' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'forbusiness.testimonial.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'Call Action',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Testimonial' }
    },
  },
})
