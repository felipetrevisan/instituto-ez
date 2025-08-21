'use client'

import { BorderRounded, Theme, Variant } from '@ez/shared/types/global'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import { TestimonialAnimated } from '@ez/web/components/testimonals/animated'
import { TestimonialMinimalist } from '@ez/web/components/testimonals/minimalist'
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

  const { type, theme, variant, rounded } = site?.testimonialsConfig ?? {
    type: 'MINIMALIST',
    theme: Theme.tertiary,
    variant: Variant.outline,
    rounded: BorderRounded['2xl'],
  }

  const TestimonialRender = type === 'MINIMALIST' ? TestimonialMinimalist : TestimonialAnimated

  return (
    <div className="flex h-full w-full flex-col space-y-14">
      <div className="flex flex-col justify-center">
        {isLoading && <Skeleton />}
        {!isLoading && (
          <Carousel plugins={[ClassNames()]} className="md:overflow-visible" theme={theme}>
            <CarouselContent rootClassName="md:overflow-visible!">
              {data?.map((testimonial, _index) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
                >
                  <TestimonialRender
                    key={`testimonial_${testimonial.id}`}
                    item={testimonial}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndexAction={setHoveredIndex}
                    theme={theme}
                    variant={variant}
                    rounded={rounded}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots rootClassName="mt-10" theme={theme} />
          </Carousel>
        )}
      </div>
    </div>
  )
}
