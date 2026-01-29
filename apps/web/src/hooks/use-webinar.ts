import { getWebinarBySlug, getWebinars } from '@ez/web/server/get-webinar'
import type { Webinar } from '@ez/web/types/webinar'
import { useQuery } from '@tanstack/react-query'

export function useWebinars() {
  const { data, isLoading, isPending } = useQuery<Webinar[]>({
    queryKey: ['webinars'],
    queryFn: () => getWebinars(),
  })

  return { data, isLoading, isPending }
}

export function useWebinar(slug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Webinar>({
    queryKey: ['webinars', locale, slug],
    queryFn: () => getWebinarBySlug(slug, locale),
  })

  return { data, isLoading, isPending }
}
