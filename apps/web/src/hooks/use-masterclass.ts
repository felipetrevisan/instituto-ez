import { getMasterclassBySlug, getMasterclasses } from '@ez/web/server/get-masterclass'
import type { Masterclass } from '@ez/web/types/masterclass'
import { useQuery } from '@tanstack/react-query'

export function useMasterclasses() {
  const { data, isLoading, isPending } = useQuery<Masterclass[]>({
    queryKey: ['masterclasses'],
    queryFn: () => getMasterclasses(),
  })

  return { data, isLoading, isPending }
}

export function useMasterclass(slug: string, locale: string) {
  const { data, isLoading, isPending } = useQuery<Masterclass>({
    queryKey: ['masterclasses', locale, slug],
    queryFn: () => getMasterclassBySlug(slug, locale),
  })

  return { data, isLoading, isPending }
}
