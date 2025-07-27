import { EditIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'theme',
  title: 'Theme',
  type: 'object',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'color',
    }),
    defineField({
      name: 'primary',
      title: 'Primary Color',
      type: 'color',
    }),
    defineField({
      name: 'secondary',
      title: 'Secondary Color',
      type: 'color',
    }),
  ],
})
