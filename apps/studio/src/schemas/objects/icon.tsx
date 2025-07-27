import { LeaveIcon } from '@sanity/icons'
import * as Icons from 'react-icons/fa'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  icon: LeaveIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      initialValue: 'none',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Icon', value: 'icon' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      hidden: ({ parent }) => parent?.type !== 'icon',
      options: {
        provider: '',
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
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
  ],
})
