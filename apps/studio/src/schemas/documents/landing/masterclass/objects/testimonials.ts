import { StarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.testimonials',
  title: 'Testimonials - Masterclass',
  icon: StarIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'testimonial' }],
          options: {
            filter: '"masterclass" in display_areas',
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).warning('Select at least one testimonial'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Testimonials' }
    },
  },
})
