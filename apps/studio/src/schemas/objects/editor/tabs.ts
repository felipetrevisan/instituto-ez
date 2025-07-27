import config from '@ez/studio/config/editor'
import { FolderIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'tabsWidget',
  type: 'object',
  title: 'Tabs',
  icon: FolderIcon,
  fields: [
    {
      name: 'tabs',
      type: 'array',
      title: 'Tabs',
      of: [
        {
          type: 'object',
          name: 'tab',
          title: 'Tab',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'id',
              type: 'slug',
              title: 'ID',
              options: {
                source: 'title',
                slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'prefix',
              title: 'Tab Prefix',
              type: 'media',
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
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
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
      tabs: 'tabs',
      theme: 'theme',
      variant: 'variant',
    },
    prepare({ tabs, theme, variant }) {
      return {
        title: 'Tabs',
        subtitle: `Tabs: ${tabs.length} → Tema: ${theme} → Variante: ${variant}`,
      }
    },
  },
})
