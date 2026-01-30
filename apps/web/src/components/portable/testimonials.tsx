'use client'

import {
  TestimonialComponent,
  type TestimonialType,
} from '@ez/shared/sanity/components/testimonial'
import { Skeleton } from '@ez/web/components/sections/testimonials/skeleton'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { useTestimonials } from '@ez/web/hooks/use-testimonials'

export const TestimonialsWrapper = ({
  value,
}: {
  value: Omit<TestimonialType, 'testimonials'>
}) => {
  const { data, isLoading } = useTestimonials(value.category)

  if (isLoading) {
    return (
      <FadeIn>
        <Skeleton />
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <TestimonialComponent value={{ ...value, testimonials: data }} />
    </FadeIn>
  )
}
