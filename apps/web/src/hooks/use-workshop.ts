import { getWorkshops } from '@ez/web/server/get-workshop'
import type { Workshop } from '@ez/web/types/workshop'
import { useQuery } from '@tanstack/react-query'

export function useWorkshop() {
  const { data, isLoading, isPending } = useQuery<Workshop[]>({
    queryKey: ['workshops'],
    queryFn: () => getWorkshops(),
  })

  return { data, isLoading, isPending }
}
