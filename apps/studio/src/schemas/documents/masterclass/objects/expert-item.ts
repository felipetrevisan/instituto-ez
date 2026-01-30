import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.expert.item',
  title: 'Expert',
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
      type: 'localizedString',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localizedArray',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'masterclass.expert.social' }],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})
