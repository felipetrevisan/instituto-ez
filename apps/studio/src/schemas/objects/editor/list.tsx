import ListPreviewComponent from '@ez/studio/preview/list'
import { ListIcon } from '@sanity/icons'
import * as Icons from 'react-icons/fa'
import { defineType } from 'sanity'

export default defineType({
  name: 'list',
  type: 'object',
  title: 'List',
  icon: ListIcon,
  components: {
    block: ListPreviewComponent,
  },
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
      type: 'iconPicker',
      hidden: ({ parent }) => parent.bullet_type !== 'icon',
      options: {
        provider: 'fa',
        configurations: [
          {
            title: 'Font Awesome',
            provider: 'fa',
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            icons: (options: any) =>
              Object.entries(Icons).map(([name, Component]) => ({
                name,
                component: () => <Component width="1.5em" height="1em" />,
                tags: [name],
              })),
          },
        ],
        outputFormat: 'react',
      },
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
