import { QuoteComponent, type QuoteType } from '@ez/shared/sanity/components/quote'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { createPortableComponents } from '@ez/web/utils/create-portable-components'
import { useLocale } from 'next-intl'

export const QuoteWrapper = ({ value }: { value: QuoteType }) => {
  const locale = useLocale()

  return (
    <FadeIn>
      <QuoteComponent
        locale={locale}
        portableComponentsOverrides={createPortableComponents()}
        value={value}
      />
    </FadeIn>
  )
}
