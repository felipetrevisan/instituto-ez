import { i18n } from '@ez/studio/schemas/objects/locale/locales'
import { ColorWheelIcon, LinkIcon, PlugIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: PlugIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'link',
      title: 'Link',
      icon: LinkIcon,
    },
    {
      name: 'theme',
      title: 'Theme',
      icon: ColorWheelIcon,
    },
  ],
  fields: [
    defineField({
      name: 'button_label',
      title: 'Button Label',
      group: 'general',
      type: 'localizedString',
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (!field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'button_icon_prefix',
      title: 'Button Prefix Icon',
      group: 'general',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'button_icon_suffix',
      title: 'Button Suffix Icon',
      group: 'general',
      type: 'lucide-icon',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      group: 'theme',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      group: 'theme',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Tertiary', value: 'tertiary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Background', value: 'background' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      group: 'theme',
      initialValue: 'sm',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Small', value: 'sm' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
          { title: '2x Extra Large', value: '2xl' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'button_link_type',
      title: 'Button Link Type',
      type: 'string',
      group: 'link',
      initialValue: 'INTERNAL',
      options: {
        list: [
          { title: 'Page', value: 'INTERNAL' },
          { title: 'External Link', value: 'EXTERNAL' },
          { title: 'Dialog', value: 'DIALOG' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'dialog_type',
      title: 'Dialog Type',
      type: 'string',
      group: 'link',
      initialValue: 'CONTACT',
      options: {
        list: [{ title: 'Contato', value: 'CONTACT' }],
        layout: 'radio',
      },
      hidden: ({ parent }) => parent?.button_link_type !== 'DIALOG',
    }),
    defineField({
      name: 'dialog_contact_subject',
      title: 'Dialog Contact Subject',
      type: 'string',
      group: 'link',
      hidden: ({ parent }) =>
        parent?.button_link_type !== 'DIALOG' ||
        parent?.dialog_type !== 'CONTACT',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            button_link_type?: string
            dialog_type?: string
          }

          const isContactDialog =
            parent?.button_link_type === 'DIALOG' &&
            parent?.dialog_type === 'CONTACT'

          if (isContactDialog && !value) {
            return 'Contact subject is required when dialog type is Contact.'
          }

          return true
        }),
    }),
    defineField({
      name: 'button_internal_link',
      title: 'Button Link',
      description: 'Select a page',
      type: 'reference',
      group: 'link',
      to: [{ type: 'landingPage' }],
      hidden: ({ parent }) => parent?.button_link_type !== 'INTERNAL',
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context?.document?.button_link_type === 'INTERNAL' &&
          !field
            ? 'This field must not be empty.'
            : true,
        ).warning(),
    }),
    defineField({
      name: 'button_external_url',
      title: 'Button Link',
      description: 'Enter the button URL',
      type: 'url',
      group: 'link',
      hidden: ({ parent }) => parent?.button_link_type !== 'EXTERNAL',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).warning('This field must be a valid url.'),
    }),
  ],
  preview: {
    select: {
      title: `button_label`,
      type: 'button_link_type',
    },
    prepare({ title, type }) {
      const localized = Array.isArray(title) ? title.find((item) => item?.lang === i18n.base) : null
      return {
        title: localized?.value || title || 'Sem título',
        subtitle: type,
      }
    },
  },
})
