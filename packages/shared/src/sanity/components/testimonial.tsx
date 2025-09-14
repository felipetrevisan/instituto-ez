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
    <div className="flex h-full w-full flex-col space-y-14 md:w-[80vw]! lg:w-[80vw]! xl:w-full">
      <div className="flex flex-col justify-center">
        <Carousel className="overflow-visible" plugins={[ClassNames()]} theme={theme}>
          <CarouselContent rootClassName="p-5">
            {data?.map((testimonial, _index) => (
              <CarouselItem
                className="basis-full md:basis-full lg:basis-full xl:basis-1/2"
                key={testimonial.id}
              >
                {type === 'MINIMALIST' ? (
                  <TestimonialMinimalist
                    className="shadow-sm"
                    item={testimonial}
                    key={`testimonial_${category}_${testimonial.id}`}
                    rounded={rounded}
                    theme={theme}
                    variant={variant}
                  />
                ) : (
                  <TestimonialAnimated
                    hoveredIndex={hoveredIndex}
                    item={testimonial}
                    key={`testimonial_${category}_${testimonial.id}`}
                    rounded={rounded}
                    setHoveredIndexAction={setHoveredIndex}
                    theme={theme}
                    variant={variant}
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
