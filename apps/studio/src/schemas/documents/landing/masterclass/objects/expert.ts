import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.expert',
  title: 'Expert — Masterclass',
  icon: UserIcon,
  type: 'object',
  hidden: ({ document }) => document?.key !== 'masterclass',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'localizedArray',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'emphasis',
      title: 'Emphasis',
      type: 'localizedString',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'credential',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'localizedString',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localizedArray',
    }),
    defineField({
      name: 'workAreas',
      title: 'Work Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'workArea',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'localizedString',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Expert' }
    },
  },
})
