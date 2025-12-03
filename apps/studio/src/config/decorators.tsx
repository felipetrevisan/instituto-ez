import { HighlightDecorator } from '@ez/studio/portable/decorators'
import { BoldIcon, BulbOutlineIcon, ColorWheelIcon, LinkIcon } from '@sanity/icons'

const basicDecorators = [
  { title: 'Bold', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Underline', value: 'underline' },
  {
    title: 'Highlight',
    value: 'highlight',
    icon: BulbOutlineIcon,
    component: HighlightDecorator,
  },
]

const styles = [
  { title: 'Normal', value: 'normal' },
  { title: 'Heading 1', value: 'h1' },
  { title: 'Heading 2', value: 'h2' },
  { title: 'Heading 3', value: 'h3' },
  { title: 'Heading 4', value: 'h4' },
  { title: 'Heading 5', value: 'h5' },
  { title: 'Normal Center', value: 'normal-center' },
  { title: 'Heading 1 Center', value: 'h1-center' },
  { title: 'Heading 2 Center', value: 'h2-center' },
  { title: 'Heading 3 Center', value: 'h3-center' },
  { title: 'Heading 4 Center', value: 'h4-center' },
  { title: 'Heading 5 Center', value: 'h5-center' },
  { title: 'Normal Left', value: 'normal-left' },
  { title: 'Heading 1 Left', value: 'h1-left' },
  { title: 'Heading 2 Left', value: 'h2-left' },
  { title: 'Heading 3 Left', value: 'h3-left' },
  { title: 'Heading 4 Left', value: 'h4-left' },
  { title: 'Heading 5 Left', value: 'h5-left' },
  { title: 'Normal Right', value: 'normal-right' },
  { title: 'Heading 1 Right', value: 'h1-right' },
  { title: 'Heading 2 Right', value: 'h2-right' },
  { title: 'Heading 3 Right', value: 'h3-right' },
  { title: 'Heading 4 Right', value: 'h4-right' },
  { title: 'Heading 5 Right', value: 'h5-right' },
  { title: 'Normal Justify', value: 'normal-justify' },
  { title: 'Heading 1 Justify', value: 'h1-justify' },
  { title: 'Heading 2 Justify', value: 'h2-justify' },
  { title: 'Heading 3 Justify', value: 'h3-justify' },
  { title: 'Heading 4 Justify', value: 'h4-justify' },
  { title: 'Heading 5 Justify', value: 'h5-justify' },
]

const decorators = [
  { title: 'Bold', value: 'strong' },
  { title: 'Medium Bold', value: 'medium', icon: BoldIcon },
  { title: 'Semi Bold', value: 'semibold', icon: BoldIcon },
  { title: 'Extra Bold', value: 'extrabold', icon: BoldIcon },
  { title: 'Emphasis', value: 'em' },
  { title: 'Underline', value: 'underline' },
  {
    title: 'Highlight',
    value: 'highlight',
    icon: BulbOutlineIcon,
    component: HighlightDecorator,
  },
  { title: 'Primary Color', value: 'primary', icon: ColorWheelIcon },
  { title: 'Secondary Color', value: 'secondary', icon: ColorWheelIcon },
  { title: 'Tertiary Color', value: 'tertiary', icon: ColorWheelIcon },
  { title: 'Accent Color', value: 'accent', icon: ColorWheelIcon },
  { title: 'Navy Color', value: 'navy', icon: ColorWheelIcon },
  { title: 'Cyan Color', value: 'cyan', icon: ColorWheelIcon },
  { title: 'Coral Color', value: 'coral', icon: ColorWheelIcon },
  { title: 'White Color', value: 'white', icon: ColorWheelIcon },
  { title: 'Gradient Primary Color', value: 'gradient-primary', icon: ColorWheelIcon },
]

const annotations = [
  {
    name: 'link',
    type: 'object',
    title: 'Link',
    fields: [
      {
        name: 'url',
        type: 'url',
      },
    ],
  },
  {
    name: 'internalLink',
    type: 'object',
    title: 'Internal Link',
    icon: LinkIcon,
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [{ type: 'page' }],
      },
    ],
  },
]

export { decorators, styles, annotations, basicDecorators }
