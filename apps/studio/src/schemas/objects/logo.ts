import { MenuIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'logo',
  title: 'Logo',
  icon: MenuIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'background_image',
      title: 'Background Image',
      type: 'image',
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
  ],
})
