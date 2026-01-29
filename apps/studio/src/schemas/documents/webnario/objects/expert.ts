import { PackageIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'webnario.expert',
  title: 'Expert',
  icon: PackageIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'webnario.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({
      name: 'experts',
      title: 'Experts',
      type: 'array',
      of: [{ type: 'webnario.expert.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Expert' }
    },
  },
})
