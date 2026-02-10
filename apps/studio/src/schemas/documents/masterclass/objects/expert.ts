import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.expert',
  title: 'Expert',
  icon: UserIcon,
  type: 'object',
  fields: [
    defineField({ name: 'settings', title: 'Settings', type: 'masterclass.sectionSettings' }),
    defineField({ name: 'heading', type: 'localizedArray' }),
    defineField({ name: 'text', type: 'localizedArray' }),
    defineField({
      name: 'experts',
      title: 'Experts',
      type: 'array',
      of: [{ type: 'masterclass.expert.item' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Expert' }
    },
  },
})
