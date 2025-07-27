'use client'

import {
  TestimonialComponent,
  type TestimonialType,
} from '@ez/shared/sanity/components/testimonial'
import { useTestimonials } from '@ez/web/hooks/use-testimonials'
import { Skeleton } from '../sections/testimonials/skeleton'

export const TestimonialsWrapper = ({
  value,
}: { value: Omit<TestimonialType, 'testimonials'> }) => {
  const { data, isLoading } = useTestimonials(value.category)

  if (isLoading) return <Skeleton />

  return <TestimonialComponent value={{ ...value, testimonials: data }} />
}
