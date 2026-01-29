import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario.transformation',
  title: 'Transformation',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'webnario.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'webnario.transformation.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Transformation' }
    },
  },
})
