import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { FolderIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'quoteWidget',
  type: 'object',
  title: 'Quote',
  icon: FolderIcon,
  fields: [
    {
      name: 'rounded',
      title: 'Border Rounded',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Full', value: 'full' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
          { title: '2x Extra Large', value: '2xl' },
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
          { title: 'Coral', value: 'coral' },
          { title: 'Navy', value: 'navy' },
          { title: 'Cyan', value: 'cyan' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'text',
      title: 'Text',
      type: 'localizedArray',
    },
    {
      title: 'Icon',
      name: 'icon',
      type: 'lucide-icon',
    },
  ],
  preview: {
    select: {
      title: 'text',
    },
    prepare({ title }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      const blocks = localized?.value
      const text =
        Array.isArray(blocks)
          ? blocks
              .map((block) =>
                Array.isArray(block?.children)
                  ? block.children.map((child) => child?.text).join('')
                  : '',
              )
              .join(' ')
              .trim()
          : ''
      return {
        title: text || 'Sem texto',
      }
    },
  },
})
