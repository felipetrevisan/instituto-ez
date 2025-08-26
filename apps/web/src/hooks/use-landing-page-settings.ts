import { useQuery } from '@tanstack/react-query'
import { getLandingPageSettings } from '../server/get-landing-page-settings'
import type { LandingPageSetting } from '../types/landing-page-setting'

export function useLandingPageSettings() {
  const { data, isLoading, isPending, isFetching } = useQuery<LandingPageSetting>({
    queryKey: ['landing-page-settings'],
    queryFn: () => getLandingPageSettings(),
  })

  return { data, isLoading, isPending, isFetching }
}
