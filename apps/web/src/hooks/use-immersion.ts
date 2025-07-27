import { getImmersion } from '@ez/web/server/get-immersion'
import type { Immersion } from '@ez/web/types/immersion'
import { useQuery } from '@tanstack/react-query'

export function useImmersion() {
  const { data, isLoading, isPending } = useQuery<Immersion>({
    queryKey: ['immersion'],
    queryFn: () => getImmersion(),
  })

  return { data, isLoading, isPending }
}
