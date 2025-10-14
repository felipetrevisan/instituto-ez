import { SplitVerticalIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'divider',
  type: 'object',
  title: 'Divider',
  icon: SplitVerticalIcon,
  fields: [
    {
      name: 'shape',
      title: 'Shape',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Triangle', value: 'triangle' },
          { title: 'Wave', value: 'wave' },
          { title: 'Arrow', value: 'arrow' },
        ],
        layout: 'dropdown',
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Divider',
      }
    },
  },
})
