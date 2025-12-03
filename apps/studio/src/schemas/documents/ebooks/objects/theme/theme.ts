import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'theme',
  title: 'Theme',
  type: 'object',
  icon: ColorWheelIcon,
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
    defineField({
      name: 'tertiary',
      title: 'Tertiary Color',
      type: 'color',
    }),
    defineField({
      name: 'header_button',
      title: 'Header Button',
      type: 'theme_button_color',
    }),
    defineField({
      name: 'sticky_header_button',
      title: 'Sticky Header Button',
      type: 'theme_button_color',
    }),
  ],
})
