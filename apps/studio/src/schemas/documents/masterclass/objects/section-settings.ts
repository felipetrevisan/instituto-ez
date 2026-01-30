import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclass.sectionSettings',
  title: 'Section Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Anchor ID',
      type: 'string',
      description: 'Used for #links and in-page navigation.',
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Alt', value: 'alt' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'color',
    }),
  ],
})
