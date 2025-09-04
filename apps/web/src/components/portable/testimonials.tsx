'use client'

import {
  TestimonialComponent,
  type TestimonialType,
} from '@ez/shared/sanity/components/testimonial'
import { Skeleton } from '@ez/web/components/sections/testimonials/skeleton'
import { useTestimonials } from '@ez/web/hooks/use-testimonials'

export const TestimonialsWrapper = ({
  value,
}: {
  value: Omit<TestimonialType, 'testimonials'>
}) => {
  const { data, isLoading } = useTestimonials(value.category)

  if (isLoading) return <Skeleton />

  return <TestimonialComponent value={{ ...value, testimonials: data }} />
}
