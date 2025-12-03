import { MenuIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'landing-page-section',
  title: 'Seção',
  icon: MenuIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'key_section',
      title: 'Section Key',
      type: 'string',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'show_section',
      title: 'Show Section',
      type: 'boolean',
    }),
  ],
})
