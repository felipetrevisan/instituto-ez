import { getTestimonials, getTestimonialsByEbook } from '@ez/web/server/get-testimonials'
import type { Testimonial } from '@ez/web/types/testimonial'
import { useQuery } from '@tanstack/react-query'

export function useTestimonials(category: string) {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ['testimonials', category],
    queryFn: () => getTestimonials(category),
  })

  return { data, isLoading, isPending }
}

export function useTestimonialsByEbook(category: string, ebookSlug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ['testimonials', locale, category, ebookSlug],
    queryFn: () => getTestimonialsByEbook(locale, category, ebookSlug),
  })

  return { data, isLoading, isPending }
}
