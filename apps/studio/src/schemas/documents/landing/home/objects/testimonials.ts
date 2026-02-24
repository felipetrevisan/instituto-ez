import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'home.testimonials',
  title: 'Testimonials - Home',
  icon: StarIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'home',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'localizedString',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'maxItems',
      title: 'Maximum Testimonials',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12).warning('Use between 1 and 12 items.'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Testimonials' }
    },
  },
})
