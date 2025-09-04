import AlertPreviewComponent from '@ez/studio/preview/alert'
import { WarningFilledIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'alert',
  type: 'object',
  title: 'Alert',
  icon: WarningFilledIcon,
  components: {
    block: AlertPreviewComponent,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
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
    {
      title: 'Icon',
      name: 'icon',
      type: 'lucide-icon',
    },
  ],
  preview: {
    select: {
      title: 'title',
      message: 'message',
    },
    prepare({ title, message }) {
      return {
        title: `Título: ${title || 'Sem Título'}`,
        subtitle: `${message || 'Sem Mensagem'}`,
      }
    },
  },
})
