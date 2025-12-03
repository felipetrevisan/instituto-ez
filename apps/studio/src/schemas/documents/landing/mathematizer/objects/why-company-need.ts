import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mathematizer.whycompanyneed',
  title: 'Why Company Need — Mathematizer',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mathematizer',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Why Company Need' }
    },
  },
})
