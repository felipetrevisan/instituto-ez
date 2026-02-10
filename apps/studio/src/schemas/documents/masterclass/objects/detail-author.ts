import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassDetailAuthor',
  title: 'Masterclass Author',
  icon: UserIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'portableText',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Role',
          type: 'string',
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          name: 'highlight',
          title: 'Highlight',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'lucide-icon',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
            prepare({ title }) {
              return { title: title ?? 'Highlight' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Author' }
    },
  },
})
