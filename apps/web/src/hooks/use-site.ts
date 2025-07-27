import { getSiteConfig } from '@ez/web/server/get-site-config'
import type { Site } from '@ez/web/types/site'
import { useQuery } from '@tanstack/react-query'

export function useSite() {
  const { data, isLoading, isPending, isFetching } = useQuery<Site>({
    queryKey: ['site'],
    queryFn: () => getSiteConfig(),
  })

  return { data, isLoading, isPending, isFetching }
}
