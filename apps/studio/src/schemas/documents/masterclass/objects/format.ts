import { ListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.format',
  title: 'Format',
  icon: ListIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'masterclass.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'masterclass.format.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Format' }
    },
  },
})
