import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'immersion.experience',
  title: 'Experience — Immersion',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'immersion',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({ name: 'footer', type: 'localizedArray' }),
    defineField({
      name: 'elements',
      type: 'array',
      of: [{ type: 'immersion.experience.elements' }],
    }),
    defineField({
      name: 'featuredElement',
      type: 'immersion.experience.featuredElement',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3).warning('Ideally keep a maximum of 3 CTAs'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Experience' }
    },
  },
})
