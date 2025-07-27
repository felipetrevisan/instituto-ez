import { getMathematizers } from '@ez/web/server/get-mathematizer'
import type { Mathematizer } from '@ez/web/types/mathematizer'
import { useQuery } from '@tanstack/react-query'

export function useMathematizer() {
  const { data, isLoading, isPending } = useQuery<Mathematizer[]>({
    queryKey: ['mathematizers'],
    queryFn: () => getMathematizers(),
  })

  return { data, isLoading, isPending }
}
