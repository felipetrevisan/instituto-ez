import { ColorWheelIcon, EyeOpenIcon, LinkIcon, PlugIcon } from '@sanity/icons'
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
    {
      name: 'visibility',
      title: 'Visibility',
      icon: EyeOpenIcon,
    },
  ],
  fields: [
    defineField({
      name: 'show_button',
      title: 'Show Button?',
      type: 'boolean',
      group: 'visibility',
      initialValue: false,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'disable_button',
      title: 'Is Disabled?',
      type: 'boolean',
      group: 'visibility',
      initialValue: false,
      hidden: ({ parent }) => !parent?.show_button,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_button && !field) {
            return 'This field must not be empty.'
          }
          return true
        }).warning(),
    }),
    defineField({
      name: 'button_label',
      title: 'Button Label',
      group: 'general',
      type: 'localizedString',
      hidden: ({ parent }) => !parent?.show_button,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context?.document?.show_button && !field) {
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
      hidden: ({ parent }) => !parent?.show_button,
    }),
    defineField({
      name: 'button_icon_suffix',
      title: 'Button Suffix Icon',
      group: 'general',
      type: 'lucide-icon',
      hidden: ({ parent }) => !parent?.show_button,
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      group: 'theme',
      initialValue: 'default',
      hidden: ({ parent }) => !parent?.show_button,
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
      hidden: ({ parent }) => !parent?.show_button,
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
      name: 'rounded',
      title: 'Border Rounded',
      type: 'string',
      group: 'theme',
      initialValue: 'full',
      hidden: ({ parent }) => !parent?.show_button,
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
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      group: 'theme',
      initialValue: 'sm',
      hidden: ({ parent }) => !parent?.show_button,
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
      name: 'effect',
      title: 'Effect',
      type: 'string',
      group: 'theme',
      initialValue: 'none',
      hidden: ({ parent }) => !parent?.show_button,
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Pulse', value: 'pulse' },
          { title: 'Gradient', value: 'gradient' },
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
      hidden: ({ parent }) => !parent?.show_button || parent?.disable_button,
      validation: (Rule) => Rule.required().warning('This field must not be empty.'),
    }),
    defineField({
      name: 'dialog_type',
      title: 'Dialog Type',
      type: 'string',
      group: 'link',
      initialValue: 'CONTACT',
      options: {
        list: [
          { title: 'Contato', value: 'CONTACT' },
        ],
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
        !parent?.show_button ||
        parent?.disable_button ||
        parent?.button_link_type !== 'DIALOG' ||
        parent?.dialog_type !== 'CONTACT',
    
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            show_button?: boolean
            disable_button?: boolean
            button_link_type?: string
            dialog_type?: string
          }
    
          const isContactDialog =
            parent?.show_button &&
            !parent?.disable_button &&
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
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'INTERNAL') ||
        parent?.disable_button,
      validation: (Rule) =>
        Rule.custom((field, context) =>
          context?.document?.show_button &&
          context?.document?.button_link_type === 'INTERNAL' &&
          !field
            ? 'This field must not be empty.'
            : true,
        ).warning(),
    }),
    defineField({
      name: 'button_internal_params',
      title: 'Button Link Params',
      type: 'string',
      group: 'link',
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'INTERNAL') ||
        parent?.disable_button,
    }),
    defineField({
      name: 'button_external_url',
      title: 'Button Link',
      description: 'Enter the button URL',
      type: 'url',
      group: 'link',
      hidden: ({ parent }) =>
        !parent?.show_button ||
        (parent?.show_button && parent?.button_link_type !== 'EXTERNAL') ||
        parent?.disable_button,
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).warning('This field must be a valid url.'),
    }),
  ],
  preview: {
    select: {
      title: 'button_label.pt',
      type: 'button_link_type',
    },
    prepare({ title, type }) {
      return {
        title,
        subtitle: type,
      }
    },
  },
})
