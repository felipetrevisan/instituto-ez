import { getServices } from '@ez/web/server/get-services'
import type { Service } from '@ez/web/types/service'
import { useQuery } from '@tanstack/react-query'

export function useServices() {
  const { data, isLoading, isPending } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: () => getServices(),
  })

  return { data, isLoading, isPending }
}
