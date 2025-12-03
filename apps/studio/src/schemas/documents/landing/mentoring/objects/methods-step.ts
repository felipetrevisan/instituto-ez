import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mentoring.methodsstep',
  title: 'Methods Step — Mentoring',
  icon: PackageIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'mentoring',
  fields: [
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'subheading', type: 'localizedArray' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{ type: 'mentoring.methodsstep.items' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'button',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Methods Step' }
    },
  },
})
