import { ListIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'list',
  type: 'object',
  title: 'List',
  icon: ListIcon,
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'listItemRichText' }],
    },
    {
      name: 'bullet_type',
      title: 'Bullet Type',
      initialValue: 'none',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Icon', value: 'icon' },
          { title: 'Emoji', value: 'emoji' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'lucide-icon',
      hidden: ({ parent }) => parent.bullet_type !== 'icon',
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      hidden: ({ parent }) => parent.bullet_type !== 'emoji',
    },
    {
      name: 'divider',
      title: 'Show Divider',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      items: 'items',
      type: 'bullet_type',
    },
    prepare({ items, type }) {
      return {
        title: `Lista personalizada (${items?.length ?? 0} itens)`,
        subtitle: type === 'icon' ? 'Com ícones' : type === 'emoji' ? 'Com emoji' : '',
      }
    },
  },
})
