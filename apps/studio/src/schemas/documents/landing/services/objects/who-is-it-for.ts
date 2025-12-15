import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'services.whoisitfor',
  title: 'Who is it for — services',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'services',
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
      return { title: 'Who is it for' }
    },
  },
})
