import { getCompanyServices } from '@ez/web/server/get-company-service'
import type { CompanyService } from '@ez/web/types/company-service'
import { useQuery } from '@tanstack/react-query'

export function useCompanyService() {
  const { data, isLoading, isPending } = useQuery<CompanyService[]>({
    queryKey: ['company-services'],
    queryFn: () => getCompanyServices(),
  })

  return { data, isLoading, isPending }
}
