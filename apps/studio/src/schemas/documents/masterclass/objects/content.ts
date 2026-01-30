import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.content',
  title: 'Content',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'masterclass.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'masterclass.content.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Content' }
    },
  },
})
