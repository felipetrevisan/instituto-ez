import { getBanner } from '@ez/web/server/get-banner'
import type { Banner } from '@ez/web/types/banner'
import { useQuery } from '@tanstack/react-query'

export function useBanner() {
  const { data, isLoading, isPending } = useQuery<Banner[]>({
    queryKey: ['banner'],
    queryFn: () => getBanner(),
  })

  return { data, isLoading, isPending }
}
