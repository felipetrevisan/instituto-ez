import { BlockContentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Author Name',
      type: 'string',
    }),
    defineField({
      name: 'background',
      title: 'Background Image',
      type: 'image',
    }),
    defineField({
      name: 'photo',
      title: 'Photo Image',
      type: 'image',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedArray',
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      return {
        title: name,
      }
    },
  },
})
