import { Quote, quoteVariants } from '@ez/shared/ui'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
  type PortableTextTypeComponentProps,
} from '@portabletext/react'
import type { VariantProps } from 'class-variance-authority'
import type { IconName } from 'lucide-react/dynamic'

type QuoteVariants = VariantProps<typeof quoteVariants>

export type QuoteType = {
  title: string
  theme: QuoteVariants['theme']
  rounded: QuoteVariants['rounded']
  text: Record<string, PortableTextBlock[]>
  icon?: IconName
}

type QuoteComponentBaseProps = {
  value: QuoteType
  locale?: string
  portableComponentsOverrides?: Partial<PortableTextComponents>
}

type QuoteComponentProps = QuoteComponentBaseProps &
  Partial<PortableTextTypeComponentProps<QuoteType>>

const QuoteComponent = ({ value, locale, portableComponentsOverrides }: QuoteComponentProps) => {
  if (!value.text) return null

  const { text, rounded, theme } = value
  const resolvedLocale = locale ?? Object.keys(text)[0]
  const localizedText = resolvedLocale ? text[resolvedLocale] : undefined

  if (!localizedText) return null

  return (
    <Quote rounded={rounded} theme={theme}>
      <PortableText components={portableComponentsOverrides} value={localizedText} />
    </Quote>
  )
}

export { QuoteComponent }
