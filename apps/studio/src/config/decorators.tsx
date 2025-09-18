import { HighlightDecorator, TextAlignDecorator } from '@ez/studio/portable/decorators'
import { BulbOutlineIcon, LinkIcon } from '@sanity/icons'
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react'

const basicDecorators = [
  { title: 'Bold', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Code', value: 'code' },
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
  { title: 'Emphasis', value: 'em' },
  { title: 'Code', value: 'code' },
  { title: 'Underline', value: 'underline' },
  {
    title: 'Highlight',
    value: 'highlight',
    icon: BulbOutlineIcon,
    component: HighlightDecorator,
  },
  // {
  //   title: 'Center',
  //   value: 'center',
  //   icon: <AlignCenterIcon size={11} />,
  //   // biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
  //   component: (props: any) => TextAlignDecorator(props, 'center'),
  // },
  // {
  //   title: 'Right',
  //   value: 'right',
  //   icon: <AlignRightIcon size={11} />,
  //   // biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
  //   component: (props: any) => TextAlignDecorator(props, 'right'),
  // },
  // {
  //   title: 'Left',
  //   value: 'left',
  //   icon: <AlignLeftIcon size={11} />,
  //   // biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
  //   component: (props: any) => TextAlignDecorator(props, 'left'),
  // },
  // {
  //   title: 'Justify',
  //   value: 'justify',
  //   icon: <AlignJustifyIcon size={11} />,
  //   // biome-ignore lint/suspicious/noExplicitAny: using any for decorator props
  //   component: (props: any) => TextAlignDecorator(props, 'justify'),
  // },
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
