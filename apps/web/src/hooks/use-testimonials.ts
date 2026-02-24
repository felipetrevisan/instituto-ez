import {
  getTestimonials,
  getTestimonialsByEbook,
  getTestimonialsByEbookId,
  getTestimonialsByHome,
  getTestimonialsByMasterclass,
} from '@ez/web/server/get-testimonials'
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

export function useTestimonialsByHome(limit = 6) {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ['testimonials', 'home', limit],
    queryFn: () => getTestimonialsByHome(limit),
  })

  return { data, isLoading, isPending }
}

export function useTestimonialsByMasterclass(masterclassId?: string) {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ['testimonials', 'masterclass', masterclassId],
    queryFn: () => getTestimonialsByMasterclass(masterclassId ?? ''),
    enabled: Boolean(masterclassId),
  })

  return { data, isLoading, isPending }
}

export function useTestimonialsByEbookId(ebookId?: string) {
  const { data, isLoading, isPending } = useQuery<Testimonial[]>({
    queryKey: ['testimonials', 'ebook', ebookId],
    queryFn: () => getTestimonialsByEbookId(ebookId ?? ''),
    enabled: Boolean(ebookId),
  })

  return { data, isLoading, isPending }
}
