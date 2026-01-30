import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'theme_footer_color',
  title: 'Footer',
  type: 'object',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'color',
    }),
  ],
})
