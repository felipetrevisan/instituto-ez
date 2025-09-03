'use client'

import { TestimonialComponent } from '@ez/shared/sanity/components/testimonial'
import { Title } from '@ez/shared/ui/title'
import { useTestimonialsByEbook } from '@ez/web/hooks/use-testimonials'
import type { Ebook } from '@ez/web/types/ebook'

export function Testimonial({ data }: { data: Ebook }) {
  const { data: testimonials, isLoading } = useTestimonialsByEbook('ebook', data.slug)

  if (isLoading) return null

  return (
    <section className='mt-20 flex w-screen flex-col items-center justify-center gap-8'>
      <Title
        size="2xl"
        className="after:-bottom-1 after:-translate-x-1/2 relative text-center font-questrial font-semibold text-[var(--primary-c)] after:absolute after:left-1/2 after:h-[2px] after:w-[40%] after:rounded-xl after:bg-[var(--primary-c)]/60 after:transition-all"
      >
        Depoimentos
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
