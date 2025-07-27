import { CommentIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'ebooksWidget',
  type: 'object',
  title: 'Ebooks Collection',
  icon: CommentIcon,
  fields: [
    {
      name: 'type',
      title: 'Collection Type',
      type: 'string',
      initialValue: 'grid',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: { type: 'ebooks-collection' },
    },
    {
      name: 'appareance',
      title: 'Appareance',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          { title: 'Only Image Card', value: 'small' },
          { title: 'Full Card', value: 'full' },
        ],
        layout: 'radio',
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
      type: 'type',
      appareance: 'appareance',
      theme: 'theme',
    },
    prepare({ type, theme, appareance }) {
      return {
        title: 'Ebooks',
        subtitle: `Tipo: ${type} → Tema: ${theme} → Estilo Visual: ${appareance}`,
      }
    },
  },
})
