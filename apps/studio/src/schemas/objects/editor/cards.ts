import config from '@ez/studio/config/editor'
import { FolderIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'cardsWidget',
  type: 'object',
  title: 'Cards',
  icon: FolderIcon,
  fields: [
    {
      name: 'cards',
      type: 'array',
      title: 'Cards',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: config,
            },
          ],
        },
      ],
    },
    {
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      initialValue: 'horizontal',
      options: {
        list: [
          { title: 'Vertical', value: 'vertical' },
          { title: 'Horizontal', value: 'horizontal' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Tertiary', value: 'tertiary' },
        ],
        layout: 'dropdown',
      },
    },
  ],
  preview: {
    select: {
      cards: 'cards',
      orientation: 'orientation',
    },
    prepare({ cards, orientation }) {
      return {
        title: 'Cards',
        subtitle: `Cards: ${cards.length} → Orientacao: ${orientation}`,
      }
    },
  },
})
