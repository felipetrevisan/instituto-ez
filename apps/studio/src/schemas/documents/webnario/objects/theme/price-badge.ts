import { ColorWheelIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'price_badge_color',
  title: 'Price Badge Color',
  type: 'object',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'background_primary',
      title: 'Background Primary Color',
      type: 'color',
    }),
    defineField({
      name: 'background_secondary',
      title: 'Background Secondary Color',
      type: 'color',
    }),
    defineField({
      name: 'border',
      title: 'Border Color',
      type: 'color',
    }),
    defineField({
      name: 'text_stroke',
      title: 'Text Stroke Color',
      type: 'color',
    }),
    defineField({
      name: 'text_Fill',
      title: 'Text Fill Color',
      type: 'color',
    }),
  ],
})
