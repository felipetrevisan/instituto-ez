import { getAdvancedMentory } from '@ez/web/server/get-advanced-mentory'
import type { AdvancedMentory } from '@ez/web/types/advanced-mentory'
import { useQuery } from '@tanstack/react-query'

export function useAdvancedMentory() {
  const { data, isLoading, isPending } = useQuery<AdvancedMentory>({
    queryKey: ['advanced-mentory'],
    queryFn: () => getAdvancedMentory(),
  })

  return { data, isLoading, isPending }
}
