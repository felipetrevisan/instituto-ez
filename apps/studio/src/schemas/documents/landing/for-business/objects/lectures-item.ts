import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'forbusiness.lectures.items',
  title: 'Lectures — Items - For Business',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'localizedString' }),
    defineField({ name: 'description', type: 'localizedString' }),
    defineField({ name: 'tag', type: 'localizedString' }),
    defineField({ name: 'text', type: 'localizedText' }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'classname',
      title: 'CSS Class',
      type: 'string',
    }),
    defineField({
      name: 'cta',
      title: 'Call Action',
      type: 'button',
    }),
  ],
  preview: {
    select: {
      title: 'title.pt',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
