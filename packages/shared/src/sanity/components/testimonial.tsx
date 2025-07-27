import type { BorderRounded, Theme, Variant } from '@ez/shared/types/global'
import type { Testimonial } from '@ez/shared/types/testimonial'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@ez/shared/ui/carousel'
import ClassNames from 'embla-carousel-class-names'
import { useState } from 'react'
import { TestimonialAnimated } from './testimonals/animated'
import { TestimonialMinimalist } from './testimonals/minimalist'

export type TestimonialType = {
  type: 'ANIMATED' | 'MINIMALIST'
  theme: keyof typeof Theme
  variant: keyof typeof Variant
  rounded: keyof typeof BorderRounded
  category: string
  testimonials?: Testimonial[]
}

const TestimonialComponent = ({ value }: { value: TestimonialType }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
  const { type, theme, variant, rounded, testimonials: data, category } = value

  return (
    <div className="flex flex-col w-full md:w-[80vw]! lg:w-[80vw]! xl:w-full h-full space-y-14">
      <div className="flex flex-col justify-center">
        <Carousel plugins={[ClassNames()]} className="overflow-visible" theme={theme}>
          <CarouselContent rootClassName="overflow-visible!">
            {data?.map((testimonial, _index) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
              >
                {type === 'MINIMALIST' ? (
                  <TestimonialMinimalist
                    key={`testimonial_${category}_${testimonial.id}`}
                    item={testimonial}
                    theme={theme}
                    variant={variant}
                    rounded={rounded}
                  />
                ) : (
                  <TestimonialAnimated
                    key={`testimonial_${category}_${testimonial.id}`}
                    item={testimonial}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndexAction={setHoveredIndex}
                    theme={theme}
                    variant={variant}
                    rounded={rounded}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots rootClassName="mt-10" theme={theme} />
        </Carousel>
      </div>
    </div>
  )
}

export { TestimonialComponent }
