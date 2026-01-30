import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'theme_button_color',
  title: 'Button',
  type: 'object',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'default',
      title: 'Button Default Color',
      type: 'color',
    }),
    defineField({
      name: 'hover',
      title: 'Button Hover Color',
      type: 'color',
    }),
    defineField({
      name: 'text_default',
      title: 'Button Text Default Color',
      type: 'color',
    }),
    defineField({
      name: 'text_hover',
      title: 'Button Text Hover Color',
      type: 'color',
    }),
  ],
})
