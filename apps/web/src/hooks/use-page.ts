import { getPageBySlug } from '@ez/web/server/get-page'
import type { Page } from '@ez/web/types/page'
import { useQuery } from '@tanstack/react-query'

export function usePage(slug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Page>({
    queryKey: ['page', locale, slug],
    queryFn: () => getPageBySlug(slug, locale),
  })

  return { data, isLoading, isPending }
}
