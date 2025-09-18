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
  { title: 'Justify', value: 'justify' },
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
