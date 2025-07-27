import { HighlightDecorator, TextAlignDecorator } from '@ez/studio/portable/decorators'
import { BulbOutlineIcon, LinkIcon } from '@sanity/icons'
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa'

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
  {
    title: 'Center',
    value: 'center',
    icon: <FaAlignCenter size={11} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    component: (props: any) => TextAlignDecorator(props, 'center'),
  },
  {
    title: 'Right',
    value: 'right',
    icon: <FaAlignRight size={11} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    component: (props: any) => TextAlignDecorator(props, 'right'),
  },
  {
    title: 'Left',
    value: 'left',
    icon: <FaAlignLeft size={11} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    component: (props: any) => TextAlignDecorator(props, 'left'),
  },
  {
    title: 'Justify',
    value: 'justify',
    icon: <FaAlignJustify size={11} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    component: (props: any) => TextAlignDecorator(props, 'justify'),
  },
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

export { decorators, annotations, basicDecorators }
