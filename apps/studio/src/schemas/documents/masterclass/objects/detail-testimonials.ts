import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailTestimonials',
  title: 'Masterclass Testimonials',
  icon: StarIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'portableText',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Testimonials' }
    },
  },
})
