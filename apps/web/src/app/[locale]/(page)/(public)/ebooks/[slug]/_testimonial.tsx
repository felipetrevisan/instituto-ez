'use client'

import { TestimonialComponent } from '@ez/shared/sanity/components/testimonial'
import { Title } from '@ez/shared/ui/title'
import { useTestimonialsByEbook } from '@ez/web/hooks/use-testimonials'
import type { Ebook } from '@ez/web/types/ebook'
import { useLocale, useTranslations } from 'next-intl'

export function Testimonial({ data }: { data: Ebook }) {
  const locale = useLocale()
  const t = useTranslations('Ebooks')

  const { data: testimonials, isLoading } = useTestimonialsByEbook(
    'ebook',
    data.slug?.[locale].current,
    locale,
  )

  if (isLoading) return null

  return (
    <section className="flex w-screen flex-col items-center justify-center gap-8">
      <Title
        className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
        size="2xl"
      >
        {t('testimonial')}
      </Title>
      <TestimonialComponent
        value={{
          category: 'ebook',
          type: 'MINIMALIST',
          variant: 'outline',
          theme: 'custom',
          rounded: '2xl',
          testimonials,
        }}
      />
    </section>
  )
}
