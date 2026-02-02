'use client'

import { BorderRounded, Theme, Variant } from '@ez/shared/types/global'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import { TestimonialAnimated } from '@ez/web/components/testimonals/animated'
import { TestimonialMinimalist } from '@ez/web/components/testimonals/minimalist'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useSite } from '@ez/web/hooks/use-site'
import { useTestimonials } from '@ez/web/hooks/use-testimonials'
import ClassNames from 'embla-carousel-class-names'
import { useState } from 'react'
import { Skeleton } from './skeleton'

import './styles.css'

export function Testimonials() {
  const { data: site } = useSite()
  const { data, isLoading } = useTestimonials('service')
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)

  const { type, theme, variant, rounded } = {
    type: 'MINIMALIST',
    theme: Theme.tertiary,
    variant: Variant.outline,
    rounded: BorderRounded['2xl'],
  }

  const TestimonialRender = type === 'MINIMALIST' ? TestimonialMinimalist : TestimonialAnimated

  return (
    <FadeIn className="flex h-full w-full flex-col space-y-14">
      <div className="flex flex-col justify-center">
        {isLoading && <Skeleton />}
        {!isLoading && (
          <Carousel className="xl:overflow-visible" plugins={[ClassNames()]} theme={theme}>
            <CarouselContent rootClassName="xl:overflow-visible!">
              {data?.map((testimonial, _index) => (
                <CarouselItem
                  className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
                  key={testimonial.id}
                >
                  <TestimonialRender
                    hoveredIndex={hoveredIndex}
                    item={testimonial}
                    key={`testimonial_${testimonial.id}`}
                    rounded={rounded}
                    setHoveredIndexAction={setHoveredIndex}
                    theme={theme}
                    variant={variant}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots rootClassName="mt-10" theme={theme} />
          </Carousel>
        )}
      </div>
    </FadeIn>
  )
}
